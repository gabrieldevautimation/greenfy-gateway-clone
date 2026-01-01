import { ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/store";

interface ProductCardProps {
  product: Product;
  categoryImage?: string;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, categoryImage, onAddToCart }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 group">
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : categoryImage ? (
          <img 
            src={categoryImage} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <span className="text-4xl">🎮</span>
        )}
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-display font-semibold text-lg line-clamp-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
            {product.stock > 0 ? (
              <p className="text-xs text-success">Em estoque ({product.stock})</p>
            ) : (
              <p className="text-xs text-destructive">Esgotado</p>
            )}
          </div>
          <Button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="gradient-primary"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </div>
    </Card>
  );
};
