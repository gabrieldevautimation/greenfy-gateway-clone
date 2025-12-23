import { Zap, Headphones, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Envio imediato",
    description: "Receba o que comprou em poucos segundos após a confirmação do pagamento.",
  },
  {
    icon: Headphones,
    title: "Suporte eficiente",
    description: "Em caso de dúvidas, entre em contato com o nosso suporte clicando em Suporte no topo da página.",
  },
  {
    icon: Shield,
    title: "Compra segura",
    description: "Seus dados são criptografados de ponta-à-ponta e processados com total segurança.",
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 text-center bg-card border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
