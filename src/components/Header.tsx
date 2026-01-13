import { ShoppingCart, LogIn, MessageCircle, Menu, LogOut, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  cartCount?: number;
  onCartClick?: () => void;
}

export const Header = ({ cartCount = 0, onCartClick }: HeaderProps) => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* Coupon Banner */}
      <div className="bg-primary/20 border-b border-primary/30 py-2 text-center">
        <p className="text-sm">
          🏷️ Cupom: <span className="bg-primary/30 px-2 py-0.5 rounded font-semibold">BLOXSTORE10</span> – Descontos Exclusivos!
        </p>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-display font-bold text-primary">B</span>
            </div>
            <span className="font-display font-bold text-xl">
              BloxStoreBrasil
              <span className="ml-1 text-primary">✓</span>
            </span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#categorias" className="text-muted-foreground hover:text-foreground transition-colors">
              Categorias
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
            <a href="#avaliacoes" className="text-muted-foreground hover:text-foreground transition-colors">
              Avaliações
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-foreground">
              <MessageCircle className="h-5 w-5" />
            </Button>

            {!user ? (
              <Button
                variant="ghost"
                className="hidden sm:flex items-center gap-2"
                onClick={() => navigate("/login")}
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden sm:flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Conta
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glass-card">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5 text-xs text-muted-foreground truncate">
                    {user.email}
                  </div>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Painel Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button
              variant="outline"
              className="flex items-center gap-2 border-primary/50 hover:bg-primary/10"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Carrinho</span>
              {cartCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-6 mt-6">
                  <span className="font-display font-bold text-xl mb-4">
                    BloxStoreBrasil
                  </span>
                  <nav className="flex flex-col gap-4">
                    <a href="#categorias" className="text-lg text-muted-foreground hover:text-foreground transition-colors">
                      Categorias
                    </a>
                    <a href="#faq" className="text-lg text-muted-foreground hover:text-foreground transition-colors">
                      FAQ
                    </a>
                    <a href="#avaliacoes" className="text-lg text-muted-foreground hover:text-foreground transition-colors">
                      Avaliações
                    </a>
                  </nav>

                  {!user ? (
                    <Button
                      variant="ghost"
                      className="justify-start px-0 text-lg gap-2 text-muted-foreground hover:text-foreground"
                      onClick={() => navigate("/login")}
                    >
                      <LogIn className="h-5 w-5" />
                      Entrar
                    </Button>
                  ) : (
                    <>
                      {isAdmin && (
                        <Button
                          variant="ghost"
                          className="justify-start px-0 text-lg gap-2 text-muted-foreground hover:text-foreground"
                          onClick={() => navigate("/admin")}
                        >
                          <ShieldCheck className="h-5 w-5" />
                          Painel Admin
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        className="justify-start px-0 text-lg gap-2 text-destructive hover:text-destructive"
                        onClick={() => signOut()}
                      >
                        <LogOut className="h-5 w-5" />
                        Sair
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};
