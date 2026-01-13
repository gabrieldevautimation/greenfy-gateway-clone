import { ShoppingBag, Crown, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import luxuryHero from "@/assets/luxury-hero.png";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-36 bg-black text-white px-2">
      {/* Background Effects - God Mode Style */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent_70%)]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium animate-fade-in">
              <Crown className="w-4 h-4" />
              <span>Experiência God Mode Ativa</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600 drop-shadow-sm">
                Greenfy Gateway
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              A infraestrutura definitiva para pagamentos de alta conversão.
              Segurança nível militar, integração instantânea e estética de elite.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 py-7 text-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105"
              >
                <ShoppingBag className="mr-3 h-6 w-6" />
                Explorar Ecossistema
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-gray-400">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium">100% Seguro</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Zap className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium">Entrega Flash</span>
              </div>
            </div>
          </div>

          {/* Hero Image - Luxury Architecture */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-full max-w-[500px] aspect-square rounded-2xl overflow-hidden glass-morphism border border-white/10 shadow-2xl transition-transform hover:scale-[1.02]">
                <img
                  src={luxuryHero}
                  alt="Greenfy Premium"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
