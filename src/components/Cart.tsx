import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartItem } from "@/types/store";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const Cart = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-card border-border w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-display">Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Seu carrinho está vazio
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg"
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎮</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                    <p className="text-primary font-bold">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span>Total:</span>
                <span className="font-display font-bold text-primary">
                  {formatPrice(total)}
                </span>
              </div>
              <Button
                className="w-full gradient-primary font-semibold py-6"
                onClick={onCheckout}
              >
                Finalizar Compra via PIX
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
