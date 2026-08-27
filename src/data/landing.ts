// Configuração central de conteúdo da landing de mussarela (3G Foods).
// Regra do briefing: não inventar preço, gramagem, marca, rendimento,
// certificação, stock ou prazo. Dado não confirmado => "Consulte preço e disponibilidade".

export const CAMPAIGN_NAME = "3G Foods - Queijo Mussarela Atacado (SP + Campinas)";
export const PAGE_VARIANT = "control";
export const GA4_MEASUREMENT_ID = "G-7CQV85CBHN";

export const STORE_URL = "https://loja.3gfoods.com.br/";
export const CATEGORY_URL = "https://loja.3gfoods.com.br/busca/1?termo=mussarela";
export const SIGNUP_URL = "https://loja.3gfoods.com.br/";

export const CANONICAL_URL = "https://loja.3gfoods.com.br/ads/mussarela-atacado-sp-campinas";

export const hero = {
  eyebrow: "Mussarela para food service",
  headline: "Mussarela para manter o seu negócio sempre abastecido",
  subheadline:
    "Encontre opções para pizzarias, restaurantes, lanchonetes, padarias, mercados e cozinhas profissionais. Compre online ou fale com a equipe da 3G Foods para consultar disponibilidade e atendimento na sua região.",
  ctaPrimary: "Ver mussarelas disponíveis",
  ctaSecondary: "Comprar agora",
  microcopy: "Atendimento para empresas | Consulte regiões e condições de entrega",
};

export type Product = {
  product_id: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  priceLabel: string;
  destinationUrl: string;
  trackingLabel: string;
};

const IMG = "https://api.conge.digital/FILES/PROJETO/C3G/IMAGENS/IA";

// Vitrine alimentada pela busca "mussarela" na loja oficial da 3G Foods.
export const products: Product[] = [
  {
    product_id: "60008",
    slug: "qj-mussarela-apolo-60008",
    name: "QJ Mussarela APOLO",
    brand: "Apolo",
    image: `${IMG}/60008.webp`,
    priceLabel: "R$ 37,27/kg",
    destinationUrl: "https://loja.3gfoods.com.br/produto/qj-mussarela-apolo-60008",
    trackingLabel: "card_mussarela_apolo",
  },
  {
    product_id: "330699",
    slug: "qj-mussarela-bonissimo-330699",
    name: "QJ Mussarela BONISSIMO",
    brand: "Bonissimo",
    image: `${IMG}/330699.webp`,
    priceLabel: "R$ 37,88/kg",
    destinationUrl: "https://loja.3gfoods.com.br/produto/qj-mussarela-bonissimo-330699",
    trackingLabel: "card_mussarela_bonissimo",
  },
  {
    product_id: "330768",
    slug: "qj-mussarela-gran-filata-330768",
    name: "Queijo Mussarela GRAN FILATA",
    brand: "Gran Filata",
    image: `${IMG}/330768330768_695d2dffbe36d.webp`,
    priceLabel: "R$ 35,25/kg",
    destinationUrl: "https://loja.3gfoods.com.br/produto/qj-mussarela-gran-filata-330768",
    trackingLabel: "card_mussarela_gran_filata",
  },
  {
    product_id: "60009",
    slug: "queijo-mussarela-latelli-60009",
    name: "Queijo Mussarela LATELLI",
    brand: "Latelli",
    image: `${IMG}/60009.webp`,
    priceLabel: "R$ 37,88/kg",
    destinationUrl: "https://loja.3gfoods.com.br/produto/queijo-mussarela-latelli-60009",
    trackingLabel: "card_mussarela_latelli",
  },
  {
    product_id: "330991",
    slug: "qj-mussarela-moomlac-330991",
    name: "Queijo Mussarela MOOMLAC",
    brand: "Moomlac",
    image: `${IMG}/330991330991_699f3ba60977e.webp`,
    priceLabel: "R$ 37,88/kg",
    destinationUrl: "https://loja.3gfoods.com.br/produto/qj-mussarela-moomlac-330991",
    trackingLabel: "card_mussarela_moomlac",
  },
  {
    product_id: "331160",
    slug: "qj-mussarela-processada-minasa-331160",
    name: "Queijo Mussarela Processada MINASA",
    brand: "Minasa",
    image: `${IMG}/331160331160_6a6a425792a7e.webp`,
    priceLabel: "R$ 34,24/kg",
    destinationUrl: "https://loja.3gfoods.com.br/produto/qj-mussarela-processada-minasa-331160",
    trackingLabel: "card_mussarela_minasa",
  },
];

export const applications = [
  {
    title: "Pizzarias",
    copy: "Para operações que precisam de consistência no preparo e reposição organizada.",
  },
  {
    title: "Restaurantes e lanchonetes",
    copy: "Para acompanhar a rotina do serviço sem deixar o ingrediente principal faltar.",
  },
  {
    title: "Padarias e mercados",
    copy: "Para produção, revenda e composição de um mix de frios e laticínios.",
  },
  {
    title: "Cozinhas profissionais",
    copy: "Para comprar com previsibilidade e integrar a mussarela ao abastecimento do negócio.",
  },
];

export const reasons = [
  {
    title: "Portfólio",
    copy: "Opções para diferentes momentos da operação food service.",
  },
  {
    title: "Abastecimento",
    copy: "Organize a reposição e evite depender de uma única compra de emergência.",
  },
  {
    title: "Distribuição",
    copy: "Conte com uma distribuidora que atende negócios de alimentação em São Paulo.",
  },
  {
    title: "Atendimento",
    copy: "Se tiver dúvida sobre produto ou disponibilidade, fale com a nossa equipe.",
  },
  {
    title: "Compra online",
    copy: "Consulte os produtos e avance para a compra online.",
  },
  {
    title: "Qualidade",
    copy: "Produtos selecionados e processo de distribuição orientado à segurança alimentar.",
  },
];

export const steps = [
  {
    label: "Escolha",
    copy: "Veja as opções de mussarela e selecione o produto adequado ao seu negócio.",
  },
  {
    label: "Confirme",
    copy: "Informe ou confirme o seu CEP para consultar atendimento e condições.",
  },
  {
    label: "Finalize",
    copy: "Entre ou crie a sua conta e conclua o pedido online.",
  },
];

export const stats = [
  { value: "+300", label: "produtos na loja" },
  { value: "+15.000", label: "clientes ativos" },
  { value: "+200", label: "municípios atendidos" },
  { value: "+1.400", label: "pontos de entrega por dia" },
  { value: "+10 anos", label: "de operação" },
  { value: "6 mil m²", label: "de espaço logístico" },
  { value: "2 mil t", label: "distribuídas por mês" },
];

export const faq = [
  {
    q: "A 3G Foods vende mussarela no atacado?",
    a: "Sim. Esta página apresenta as opções de mussarela disponíveis para clientes B2B e conduz para a compra online ou para o atendimento, conforme o produto e a região.",
  },
  {
    q: "Para quais negócios a mussarela é indicada?",
    a: "As opções podem ser exploradas por pizzarias, restaurantes, lanchonetes, hamburguerias, padarias, mercados, cozinhas profissionais e outros negócios de alimentação. A indicação exata respeita a ficha de cada produto.",
  },
  {
    q: "A 3G Foods atende a minha cidade?",
    a: "A operação informa atendimento em mais de 200 municípios do Estado de São Paulo, mas a disponibilidade deve ser confirmada pelo CEP antes da compra.",
  },
  {
    q: "Como consultar preço e disponibilidade?",
    a: "Escolha um produto e avance para o destino correspondente. Quando preço ou disponibilidade depender de login, CNPJ, região ou estoque, a informação exibida é “Consulte preço e disponibilidade”.",
  },
  {
    q: "Posso comprar para o meu restaurante ou pizzaria?",
    a: "Sim, desde que o negócio esteja elegível para o fluxo comercial da 3G Foods. Você pode iniciar o cadastro, validar a região ou falar com o atendimento.",
  },
  {
    q: "A página mostra todas as mussarelas disponíveis?",
    a: "Esta é uma vitrine de campanha. A lista é alimentada por dados reais e pode encaminhar para uma categoria mais completa ou para páginas individuais de produto.",
  },
];
