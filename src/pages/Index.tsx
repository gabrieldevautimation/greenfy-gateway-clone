import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { ProductList } from "@/components/ProductList";
import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { Reviews } from "@/components/Reviews";
import { Footer } from "@/components/Footer";
import { Cart } from "@/components/Cart";
import { Checkout } from "@/components/Checkout";
import { N8nConfig } from "@/components/N8nConfig";
import { useToast } from "@/hooks/use-toast";
import { Product, CartItem } from "@/types/store";

type View = "home" | "category" | "checkout";

const categoryNames: Record<string, string> = {
  "roube-um-brainrot": "ROUBE UM BRAINROT",
  "blox-fruits": "BLOX FRUITS",
  "99-noites": "99 NOITES",
  "plantas-vs-brainrots": "PLANTAS VS BRAINROTS",
};

const Index = () => {
  const { toast } = useToast();
  const [view, setView] = useState<View>("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [n8nWebhookUrl, setN8nWebhookUrl] = useState(() => {
    // Check localStorage first
    const stored = localStorage.getItem("n8n_webhook_url");
    // If stored value is the old wrong one, force update to the new one
    if (stored && stored.includes("quHQosWlqJDLVm0C")) {
      return "https://n8n.srv1218600.hstgr.cloud/webhook/gerarpix";
    }
    // Otherwise return stored or default
    return stored || "https://n8n.srv1218600.hstgr.cloud/webhook/gerarpix";
  });

  useEffect(() => {
    localStorage.setItem("n8n_webhook_url", n8nWebhookUrl);
  }, [n8nWebhookUrl]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setView("category");
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast({ title: "Adicionado ao carrinho!", description: product.name });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setView("checkout");
  };

  const handlePaymentSuccess = () => {
    setCartItems([]);
    setView("home");
    toast({ title: "Pagamento confirmado!", description: "Você receberá os dados por e-mail." });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      {view === "home" && (
        <>
          <Hero />
          <Categories onSelectCategory={handleSelectCategory} />
          <Features />
          <FAQ />
          <Reviews />
        </>
      )}

      {view === "category" && (
        <ProductList
          categoryId={selectedCategory}
          categoryName={categoryNames[selectedCategory] || selectedCategory}
          onBack={() => setView("home")}
          onAddToCart={handleAddToCart}
        />
      )}

      {view === "checkout" && (
        <Checkout
          items={cartItems}
          onBack={() => setView("home")}
          onPaymentSuccess={handlePaymentSuccess}
          n8nWebhookUrl={n8nWebhookUrl}
        />
      )}

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <N8nConfig webhookUrl={n8nWebhookUrl} onSave={setN8nWebhookUrl} />
    </div>
  );
};

export default Index;
