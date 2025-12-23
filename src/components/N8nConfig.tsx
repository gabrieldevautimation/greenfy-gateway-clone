import { useState } from "react";
import { Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface N8nConfigProps {
  webhookUrl: string;
  onSave: (url: string) => void;
}

export const N8nConfig = ({ webhookUrl, onSave }: N8nConfigProps) => {
  const { toast } = useToast();
  const [url, setUrl] = useState(webhookUrl);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    if (!url.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, informe a URL do webhook.",
        variant: "destructive",
      });
      return;
    }

    onSave(url.trim());
    setIsOpen(false);
    toast({
      title: "Salvo!",
      description: "Webhook do n8n configurado com sucesso.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-4 right-4 bg-card border border-border shadow-lg hover:bg-secondary"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display">Configurar n8n Webhook</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">URL do Webhook</label>
            <Input
              placeholder="https://seu-n8n.com/webhook/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-input border-border"
            />
            <p className="text-xs text-muted-foreground">
              Cole aqui a URL do webhook do seu fluxo n8n que gera o QR Code PIX via Greenfy.
            </p>
          </div>
          <div className="bg-secondary/50 p-4 rounded-lg text-sm space-y-2">
            <p className="font-semibold">O webhook receberá:</p>
            <pre className="text-xs bg-background p-2 rounded overflow-x-auto">
{`{
  "email": "cliente@email.com",
  "products": [...],
  "total": 99.90,
  "timestamp": "..."
}`}
            </pre>
            <p className="font-semibold mt-2">E deve retornar:</p>
            <pre className="text-xs bg-background p-2 rounded overflow-x-auto">
{`{
  "qrCodeBase64": "...",
  "pixCopyPaste": "...",
  "transactionId": "..."
}`}
            </pre>
          </div>
          <Button className="w-full gradient-primary" onClick={handleSave}>
            Salvar Configuração
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
