import { Star, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const reviews = [
  { name: "Maria F.", comment: "Produto incrível! Chegou rápido e em perfeito estado." },
  { name: "João P.", comment: "Atendimento excelente e entrega super eficiente!" },
  { name: "Larissa M.", comment: "Muito melhor do que eu esperava. Recomendo demais!" },
  { name: "Carlos T.", comment: "Fiquei impressionado com a qualidade. Vale cada centavo!" },
  { name: "Ana L.", comment: "Simplesmente perfeito! Já virei cliente fiel." },
  { name: "Pedro A.", comment: "Voltarei a comprar, experiência muito boa do começo ao fim." },
  { name: "Beatriz S.", comment: "Entrega rápida e suporte atencioso, recomendo!" },
  { name: "Gabriel R.", comment: "Qualidade excelente e preço justo." },
];

export const Reviews = () => {
  return (
    <section id="avaliacoes" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-2">1500+ Avaliações</h2>
          <p className="text-muted-foreground">Clientes satisfeitos em todo o Brasil</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-foreground mb-4">"{review.comment}"</p>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm text-muted-foreground">Cliente verificado</span>
              </div>
              <p className="font-semibold mt-2">{review.name}</p>
              <p className="text-xs text-muted-foreground">— avaliação pública</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
