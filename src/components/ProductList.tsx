import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/store";
import { getProductsByCategory } from "@/data/products";

interface ProductListProps {
  categoryId: string;
  categoryName: string;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductList = ({
  categoryId,
  categoryName,
  onBack,
  onAddToCart,
}: ProductListProps) => {
  const products = getProductsByCategory(categoryId);

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
