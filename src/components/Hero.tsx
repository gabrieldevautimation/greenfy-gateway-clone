import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroLogo from "@/assets/hero-logo.png";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/5 rounded-full blur-3xl" />

      {/* Decorative Lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-glow">BloxStoreBrasil</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Especializada em contas de Blox Fruits, Roube um Brainrot e 99 Noites!
              Tudo com segurança, rapidez e as melhores promoções garantidas.
            </p>
            <Button
              size="lg"
              className="gradient-primary text-primary-foreground font-semibold px-8 py-6 text-lg animate-pulse-glow w-full sm:w-auto"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Acessar produtos
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative animate-float">
              <div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={heroLogo}
                  alt="BloxStoreBrasil"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Stars */}
              <div className="absolute -top-4 right-8 text-warning text-2xl animate-pulse">★</div>
              <div className="absolute top-1/4 -right-4 text-warning text-xl animate-pulse" style={{ animationDelay: "0.5s" }}>★</div>
              <div className="absolute bottom-1/4 -left-4 text-warning text-lg animate-pulse" style={{ animationDelay: "1s" }}>★</div>
              <div className="absolute -bottom-4 right-1/4 text-warning text-xl animate-pulse" style={{ animationDelay: "0.3s" }}>★</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
