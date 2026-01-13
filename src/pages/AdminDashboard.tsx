import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, Users, ShoppingBag, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
    const { user, signOut } = useAuth();

    return (
        <div className="min-h-screen bg-background">
            <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                        <span className="font-display font-bold text-xl">Admin Dashboard</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground hidden sm:block">
                            Olá, <strong>{user?.email}</strong>
                        </span>
                        <Button variant="ghost" size="sm" onClick={() => signOut()}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Sair
                        </Button>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6 glass-card border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Users className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground uppercase font-semibold">Total Clientes</p>
                                <p className="text-2xl font-bold">124</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 glass-card border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                <ShoppingBag className="h-6 w-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground uppercase font-semibold">Total Vendas</p>
                                <p className="text-2xl font-bold">R$ 12.450,00</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 glass-card border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <ShieldCheck className="h-6 w-6 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground uppercase font-semibold">Status Sistema</p>
                                <p className="text-2xl font-bold text-success text-green-400">Online</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <Card className="p-8 glass-card border-white/5 min-h-[400px] flex items-center justify-center text-center">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Bem-vindo ao Painel de Controle</h2>
                        <p className="text-muted-foreground">Aqui você poderá gerenciar usuários, produtos e visualizar estatísticas do sistema.</p>
                    </div>
                </Card>
            </main>
        </div>
    );
}
