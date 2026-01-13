import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/store";
import { getProductsByCategory } from "@/data/products";

import categoryBrainrot from "@/assets/category-brainrot.png";
import categoryBloxfruits from "@/assets/category-bloxfruits.png";
import category99noites from "@/assets/category-99noites.png";
import categoryPlantas from "@/assets/category-plantas.png";

interface ProductListProps {
  categoryId: string;
  categoryName: string;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

const categoryImages: Record<string, string> = {
  "roube-um-brainrot": categoryBrainrot,
  "blox-fruits": categoryBloxfruits,
  "99-noites": category99noites,
  "plantas-vs-brainrots": categoryPlantas,
};

export const ProductList = ({
  categoryId,
  categoryName,
  onBack,
  onAddToCart,
}: ProductListProps) => {
  const products = getProductsByCategory(categoryId);
  const categoryImage = categoryImages[categoryId];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h2 className="font-display text-2xl font-bold">{categoryName}</h2>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Nenhum produto disponível nesta categoria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryImage={categoryImage}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
