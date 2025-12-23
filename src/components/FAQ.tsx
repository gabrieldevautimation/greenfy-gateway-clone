import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como posso fazer um pedido?",
    answer: "Para fazer um pedido, basta selecionar os produtos desejados e seguir para o checkout. Aceitamos pagamento via PIX.",
  },
  {
    question: "Como funciona o suporte?",
    answer: "Nosso suporte está disponível 24/7 através de diversos canais de atendimento como Discord e Instagram.",
  },
  {
    question: "Como recebo minha conta após a compra?",
    answer: "A entrega é automática logo após o pagamento ser confirmado, enviada por e-mail e exibida na tela.",
  },
  {
    question: "Posso pedir reembolso?",
    answer: "Reembolsos só serão aceitos se a conta não corresponder ao que foi descrito no anúncio. Arrependimento ou insatisfação não são motivos válidos.",
  },
  {
    question: "As contas são seguras?",
    answer: "Sim! Todas as contas são verificadas, sem banimentos ou riscos de punição.",
  },
  {
    question: "Posso mudar a senha da conta?",
    answer: "Sim, após o recebimento você deve alterar os dados de acesso.",
  },
  {
    question: 'Em "Roube um Brainrot", como recebo meu item?',
    answer: "Você receberá uma conta em seu email ou diretamente na página após o pagamento e nela terá o brainrot ou o item que foi realizada a compra.",
  },
  {
    question: "Quais jogos vocês vendem?",
    answer: "Vendemos contas de Blox Fruits, Roube um Brainrot, Plants vs Brainrot e 99 Noites — todas com entrega rápida, segura e qualidade garantida.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="font-display text-3xl font-bold text-center mb-12">
          Perguntas frequentes
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
