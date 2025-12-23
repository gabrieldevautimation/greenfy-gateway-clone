import { MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-display font-bold text-primary">B</span>
            </div>
            <span className="font-display font-bold text-xl">
              BloxStoreBrasil
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-foreground transition-colors">Contato</a>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 BloxStoreBrasil. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
