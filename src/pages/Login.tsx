import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn, UserPlus } from "lucide-react";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                toast({ title: "Bem-vindo de volta!", description: "Login realizado com sucesso." });
                navigate("/");
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                toast({ title: "Conta criada!", description: "Verifique seu e-mail para confirmar o cadastro." });
                setIsLogin(true);
            }
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message || "Ocorreu um erro na autenticação.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md p-8 glass-card">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        {isLogin ? <LogIn className="h-8 w-8 text-primary" /> : <UserPlus className="h-8 w-8 text-primary" />}
                    </div>
                    <h1 className="text-3xl font-display font-bold">
                        {isLogin ? "Bem-vindo" : "Criar Conta"}
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        {isLogin ? "Acesse sua conta para continuar" : "Junte-se a nós e comece agora"}
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">E-mail</label>
                        <Input
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-input/50 border-white/10"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Senha</label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-input/50 border-white/10"
                        />
                    </div>

                    <Button type="submit" className="w-full gradient-primary py-6" disabled={loading}>
                        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        {isLogin ? "Entrar" : "Cadastrar"}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm text-primary hover:underline transition-all"
                    >
                        {isLogin ? "Não tem uma conta? Cadastre-se" : "Já tem uma conta? Entre agora"}
                    </button>
                </div>
            </Card>
        </div>
    );
}
