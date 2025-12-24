import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import categoryBrainrot from "@/assets/category-brainrot.png";
import categoryBloxfruits from "@/assets/category-bloxfruits.png";
import category99noites from "@/assets/category-99noites.png";
import categoryPlantas from "@/assets/category-plantas.png";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
}

const categories: Category[] = [
  {
    id: "roube-um-brainrot",
    name: "ROUBE UM BRAINROT",
    description: "Veja os itens disponíveis desta categoria.",
    image: categoryBrainrot,
    color: "from-orange-500/20 to-yellow-500/20",
  },
  {
    id: "blox-fruits",
    name: "BLOX FRUITS",
    description: "Veja os itens disponíveis desta categoria.",
    image: categoryBloxfruits,
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "99-noites",
    name: "99 NOITES",
    description: "Veja os itens disponíveis desta categoria.",
    image: category99noites,
    color: "from-purple-500/20 to-indigo-500/20",
  },
  {
    id: "plantas-vs-brainrots",
    name: "PLANTAS VS BRAINROTS",
    description: "Veja os itens disponíveis desta categoria.",
    image: categoryPlantas,
    color: "from-red-500/20 to-pink-500/20",
  },
];

interface CategoriesProps {
  onSelectCategory?: (categoryId: string) => void;
}

export const Categories = ({ onSelectCategory }: CategoriesProps) => {
  return (
    <section id="categorias" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <Card
              key={category.id}
              className={`group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onSelectCategory?.(category.id)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative p-6 flex items-center gap-6">
                <img src={category.image} alt={category.name} className="w-16 h-16 object-contain rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg mb-1">{category.name}</h3>
                  <p className="text-muted-foreground text-sm">{category.description}</p>
                </div>
                <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Ver produtos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
