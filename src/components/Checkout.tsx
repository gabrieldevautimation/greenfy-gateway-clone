import { useState } from "react";
import { Loader2, Copy, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CartItem } from "@/types/store";
import QRCode from "react-qr-code";

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onPaymentSuccess: () => void;
  n8nWebhookUrl: string;
}

export const Checkout = ({
  items,
  onBack,
  onPaymentSuccess,
  n8nWebhookUrl,
}: CheckoutProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<{
    pixPayload: string;
    pixImage?: string;
    transactionId?: string;
    checkoutUrl?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);


  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleGeneratePix = async () => {


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast({
        title: "Erro",
        description: "Por favor, informe um e-mail válido.",
        variant: "destructive",
      });
      return;
    }

    if (total <= 0) {
      toast({
        title: "Erro",
        description: "O carrinho está vazio ou com valor zero.",
        variant: "destructive",
      });
      return;
    }

    if (!n8nWebhookUrl) {
      toast({
        title: "Erro",
        description: "Webhook do n8n não configurado. Configure nas configurações.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Generate a unique ID for the transaction
      const externalId = `ped_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const customerName = email.split("@")[0];

      // Construct payload matching the API schema hints from the error
      const payload = {
        external_id: externalId,
        // Hydra API expects amount in cents (integer)
        amount: Math.round(total * 100),
        total_amount: Math.round(total * 100), // Keep for legacy/n8n compatibility
        payment_method: "pix", // Lowercase as per docs example
        pix: {
          expiresInDays: 1
        },
        customer: { // Nested structure for robust API integration
          name: customerName,
          email: email,
          document: {
            number: "07254882774", // CPF Válido de teste
            type: "cpf" // Lowercase to pass enum validation ('d' vs 'D')
          }
        },
        // Flat fields exactly as n8n variables expect them
        nome: customerName,
        email,
        document: "07254882774",
        document_type: "cpf", // IMPORTANT: Legacy field for {{ $json.document_type }}
        products: items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        timestamp: new Date().toISOString(),
      };

      console.log("Enviando para n8n:", payload);

      const response = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors",
        body: JSON.stringify(payload),
      });

      const rawText = await response.text();
      console.log("Resposta bruta do n8n (status " + response.status + "):", rawText);

      // Always check for error status, but now we have the body to show to user
      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}: ${rawText.slice(0, 200)}...`);
      }

      // Allow empty response if status is 204, but warn if we expected data
      if (!rawText?.trim()) {
        console.warn("Resposta vazia com status " + response.status);
        throw new Error(`O n8n respondeu com sucesso (Status ${response.status}) mas não enviou dados.`);
      }

      let data: any;
      let isBase64String = false;

      // Check if raw text looks like a base64 string directly
      // Base64 regex for simple validation (alphanumeric, +, /, =)
      const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
      // Very loose check: if it has no spaces/brackets/braces and is long, treat as possible base64
      if (!rawText.trim().startsWith("{") && !rawText.trim().startsWith("[") && rawText.length > 20) {
        isBase64String = true;
        data = { pixPayload: rawText.trim() }; // Treat the whole text as the payload
      } else {
        try {
          data = JSON.parse(rawText);
        } catch {
          // If parse fails and it wasn't obviously base64, assume it might be a weird string response
          // or invalid JSON. Let's try to treat it as a string payload if it's not HTML.
          if (!rawText.trim().startsWith("<")) {
            data = { pixPayload: rawText.trim() };
          } else {
            throw new Error("Webhook retornou resposta inválida (não é JSON nem texto simples/base64).");
          }
        }
      }

      // Handle n8n's default structure where data might be wrapped in a "json" property
      const responseData = Array.isArray(data) ? data[0] : data;
      const actualData = responseData?.json || responseData;

      const findPixPayload = (obj: any): string | null => {
        if (!obj) return null;

        // Direct string check
        if (typeof obj === "string") {
          const trimmed = obj.trim();
          // Standard PIX
          if (trimmed.startsWith("000201")) return trimmed;
          // Base64 image
          if (trimmed.startsWith("data:image")) return trimmed;
          // Possible raw base64 without prefix (length check to avoid short strings)
          if (trimmed.length > 100 && !trimmed.includes("{")) return trimmed;
          return null;
        }

        if (typeof obj === "object") {
          // Check common keys
          // Added 'qr_code_base64', 'base64', 'imagem'
          const keysToCheck = ["qrcode", "pixCopyPaste", "copia_e_cola", "brcode", "payload", "qr_code_base64", "base64", "imagem", "img"];
          for (const key of keysToCheck) {
            if (obj[key] && typeof obj[key] === "string") {
              const val = obj[key].trim();
              if (val.startsWith("000201") || val.startsWith("data:image") || val.length > 50) {
                return val;
              }
            }
          }

          // Recursive search
          for (const key in obj) {
            if (typeof obj[key] === "object") {
              const found = findPixPayload(obj[key]);
              if (found) return found;
            }
          }
        }
        return null;
      };

      let pixText: string | null = null;
      let pixImage: string | null = null;

      // Extract text (EMV) - Loose check to match original behavior (accepts anything in these keys)
      if (actualData?.copia_e_cola) pixText = actualData.copia_e_cola;
      else if (actualData?.pixCopyPaste) pixText = actualData.pixCopyPaste;
      else if (actualData?.brcode) pixText = actualData.brcode;
      else if (actualData?.qrcode && actualData.qrcode.startsWith("000201")) pixText = actualData.qrcode; // Keep qrcode strict-ish as it might be image
      else if (actualData?.payload) pixText = actualData.payload;

      // If we still don't have text, try to find it recursively (Strict search)
      if (!pixText) {
        const foundText = findPixPayload(data);
        if (foundText && foundText.startsWith("000201")) {
          pixText = foundText;
        }
      }

      // Extract image (Base64)
      if (actualData?.qr_code_base64) pixImage = actualData.qr_code_base64;
      else if (actualData?.base64) pixImage = actualData.base64;
      else if (actualData?.imagem) pixImage = actualData.imagem;
      else if (actualData?.qrcode && !actualData.qrcode.startsWith("000201")) pixImage = actualData.qrcode; // Assuming if not EMV, it might be the image string

      // If we have text but no image, we can generate index.
      // If we have image by no text, we display image but can't copy text (unless we want to copy the huge base64 which is wrong).

      // Fallback: if we only found *something* via findPixPayload that wasn't EMV (starts with 000201), maybe it's the image
      if (!pixImage && !pixText) {
        const found = findPixPayload(data);
        if (found) {
          if (found.startsWith("000201")) pixText = found;
          else pixImage = found;
        }
      }

      // Special case: raw response logic from before
      if (isBase64String) {
        pixImage = data.pixPayload;
      }



      const transactionId = actualData?.id || actualData?.data?.id?.toString() || actualData?.transactionId;
      const checkoutUrl = actualData?.checkoutUrl || actualData?.data?.secureUrl || actualData?.secureUrl;

      if (!pixText && !pixImage) {
        console.error("Payload recebido que falhou:", data);
        throw new Error("Resposta não contém o código PIX nem imagem QR Code.");
      }

      setPaymentData({
        pixPayload: pixText || "", // Prefer text for the main "payload" concept if available
        pixImage: pixImage || undefined,
        transactionId,
        checkoutUrl,
      });

      toast({
        title: "QR Code gerado!",
        description: "Escaneie o QR Code ou copie o código PIX.",
      });
    } catch (error) {
      console.error("Erro ao gerar PIX:", error);
      const message = error instanceof Error ? error.message : "Tente novamente.";
      toast({
        title: "Erro ao gerar PIX",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPix = () => {
    if (paymentData?.pixPayload) {
      navigator.clipboard.writeText(paymentData.pixPayload);
      setCopied(true);
      toast({
        title: "Copiado!",
        description: "Código PIX copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h2 className="font-display text-2xl font-bold">Checkout</h2>
        </div>

        <Card className="p-6 space-y-6">
          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resumo do Pedido</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>
          </div>

          {!paymentData ? (
            <>
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">E-mail para entrega</label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input border-border"
                />
                <p className="text-xs text-muted-foreground">
                  Você receberá os dados da conta neste e-mail após confirmação do pagamento.
                </p>
              </div>

              {/* Generate PIX Button */}
              <Button
                className="w-full gradient-primary font-semibold py-6"
                onClick={handleGeneratePix}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Gerando PIX...
                  </>
                ) : (
                  "Gerar QR Code PIX"
                )}
              </Button>
            </>
          ) : (
            <>
              {/* QR Code Display */}
              <div className="text-center space-y-4">
                <h3 className="font-semibold text-lg text-success">
                  <CheckCircle className="inline h-5 w-5 mr-2" />
                  PIX Gerado com Sucesso!
                </h3>

                {/* QR Code gerado a partir do payload PIX */}
                <div className="bg-white p-4 rounded-lg inline-block">
                  {paymentData.pixImage ? (
                    <img
                      src={paymentData.pixImage.startsWith("data:") ? paymentData.pixImage : `data:image/png;base64,${paymentData.pixImage}`}
                      alt="QR Code PIX"
                      className="mx-auto max-w-[256px]"
                    />
                  ) : (
                    <QRCode
                      value={paymentData.pixPayload}
                      size={256}
                      level="M"
                      className="mx-auto"
                    />
                  )}
                </div>

                {/* Código PIX copia e cola */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {paymentData.pixPayload ? "Ou copie o código PIX:" : "Código para copiar indisponível, use o QR Code acima."}
                  </p>

                  {paymentData.pixPayload && (
                    <div className="flex gap-2">
                      <Input
                        value={paymentData.pixPayload}
                        readOnly
                        className="bg-input border-border text-xs"
                      />
                      <Button
                        variant="outline"
                        onClick={handleCopyPix}
                        className="shrink-0"
                      >
                        {copied ? (
                          <CheckCircle className="h-4 w-4 text-success" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">
                  Após o pagamento, você receberá os dados em{" "}
                  <strong>{email}</strong>
                </p>
              </div>
            </>
          )}




        </Card>
      </div>
    </section>
  );
};
