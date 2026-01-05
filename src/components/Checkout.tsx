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
    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, informe seu e-mail.",
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
      const payload = {
        email,
        products: items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total,
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawText = await response.text();
      console.log("Resposta bruta do n8n:", rawText);

      if (!rawText?.trim()) {
        throw new Error("Webhook retornou resposta vazia (sem JSON). Verifique o último nó do n8n.");
      }

      let data: any;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error("Webhook retornou JSON inválido. Veja o console para a resposta bruta.");
      }

      // Suporta resposta como array ou objeto direto
      const responseData = Array.isArray(data) ? data[0] : data;
      
      // Extrai o payload PIX do campo data.pix.qrcode
      const pixPayload = responseData?.data?.pix?.qrcode;
      const transactionId = responseData?.data?.id?.toString();
      const checkoutUrl = responseData?.data?.secureUrl;

      if (!pixPayload) {
        throw new Error("Resposta não contém o payload PIX (data.pix.qrcode)");
      }

      setPaymentData({
        pixPayload,
        transactionId,
        checkoutUrl,
      });

      toast({
        title: "QR Code gerado!",
        description: "Escaneie o QR Code ou copie o código PIX.",
      });
    } catch (error) {
      console.error("Erro ao gerar PIX:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Tente novamente. Verifique se o webhook está correto.";
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
                  <QRCode
                    value={paymentData.pixPayload}
                    size={256}
                    level="M"
                    className="mx-auto"
                  />
                </div>

                {/* Código PIX copia e cola */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Ou copie o código PIX:
                  </p>
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
