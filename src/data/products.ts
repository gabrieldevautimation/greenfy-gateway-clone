import { Product } from "@/types/store";

export const products: Product[] = [
  // ROUBE UM BRAINROT
  {
    id: "brainrot-1",
    name: "Conta Brainrot Premium",
    description: "Conta com itens raros e exclusivos do Roube um Brainrot",
    price: 29.90,
    category: "roube-um-brainrot",
    stock: 15,
  },
  {
    id: "brainrot-2",
    name: "Conta Brainrot Básica",
    description: "Conta iniciante com itens básicos para começar",
    price: 14.90,
    category: "roube-um-brainrot",
    stock: 25,
  },
  // BLOX FRUITS
  {
    id: "blox-1",
    name: "Conta Blox Fruits MAX",
    description: "Conta nível máximo com todas as frutas desbloqueadas",
    price: 99.90,
    category: "blox-fruits",
    stock: 8,
  },
  {
    id: "blox-2",
    name: "Conta Blox Fruits Intermediária",
    description: "Conta com bom progresso e várias frutas raras",
    price: 59.90,
    category: "blox-fruits",
    stock: 12,
  },
  {
    id: "blox-3",
    name: "Conta Blox Fruits Iniciante",
    description: "Conta para quem quer começar com vantagem",
    price: 24.90,
    category: "blox-fruits",
    stock: 30,
  },
  // 99 NOITES
  {
    id: "noites-1",
    name: "Conta 99 Noites Completa",
    description: "Conta com todas as noites completadas",
    price: 79.90,
    category: "99-noites",
    stock: 6,
  },
  {
    id: "noites-2",
    name: "Conta 99 Noites Parcial",
    description: "Conta com 50+ noites completadas",
    price: 39.90,
    category: "99-noites",
    stock: 10,
  },
  // PLANTAS VS BRAINROTS
  {
    id: "plantas-1",
    name: "Conta Plantas Premium",
    description: "Conta com plantas raras e recursos abundantes",
    price: 49.90,
    category: "plantas-vs-brainrots",
    stock: 9,
  },
  {
    id: "plantas-2",
    name: "Conta Plantas Starter",
    description: "Conta com bom início e plantas básicas",
    price: 19.90,
    category: "plantas-vs-brainrots",
    stock: 20,
  },
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((p) => p.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};
