import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(rootDir, "src", "data", "landing.config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const errors = [];
const required = (value, name) => {
  if (typeof value !== "string" || value.trim() === "") errors.push(`${name} está vazio.`);
};

required(config.campaignName, "campaignName");
required(config.pageVariant, "pageVariant");
required(config.viewEvent, "viewEvent");
required(config.gtmContainerId, "gtmContainerId");
required(config.canonicalUrl, "canonicalUrl");
for (const [key, value] of Object.entries(config.seo ?? {})) required(value, `seo.${key}`);
for (const [key, value] of Object.entries(config.hero ?? {})) required(value, `hero.${key}`);

if (!Array.isArray(config.products) || config.products.length === 0) {
  errors.push("products precisa conter pelo menos um produto.");
} else {
  const ids = new Set();
  for (const [index, product] of config.products.entries()) {
    for (const key of [
      "productId",
      "slug",
      "name",
      "brand",
      "image",
      "priceLabel",
      "destinationUrl",
      "trackingLabel",
    ]) {
      required(product[key], `products[${index}].${key}`);
    }
    if (ids.has(product.productId)) errors.push(`productId duplicado: ${product.productId}.`);
    ids.add(product.productId);
    if (!/^https:\/\//.test(product.destinationUrl ?? ""))
      errors.push(`Destino não HTTPS: ${product.destinationUrl}`);
    if (!/^https:\/\//.test(product.image ?? "")) errors.push(`Imagem não HTTPS: ${product.image}`);
  }
}

if (!Array.isArray(config.sections) || config.sections.length === 0) {
  errors.push("sections precisa conter pelo menos uma secção.");
} else {
  const sectionIds = new Set();
  const allowedTypes = new Set([
    "hero",
    "products",
    "applications",
    "howToBuy",
    "stats",
    "reasons",
    "faq",
    "finalCta",
  ]);
  for (const [index, section] of config.sections.entries()) {
    required(section.id, `sections[${index}].id`);
    required(section.type, `sections[${index}].type`);
    if (sectionIds.has(section.id)) errors.push(`id de secção duplicado: ${section.id}.`);
    if (!allowedTypes.has(section.type)) errors.push(`tipo de secção inválido: ${section.type}.`);
    sectionIds.add(section.id);
  }
}

const serialised = JSON.stringify(config);
for (const stale of [
  "mussarela-atacado-sp-campinas",
  "__LANDING_",
  "5511999999999",
  "lorem ipsum",
]) {
  if (stale !== config.canonicalUrl && serialised.toLowerCase().includes(stale.toLowerCase())) {
    if (stale === "mussarela-atacado-sp-campinas" && config.canonicalUrl.includes(stale)) continue;
    if (stale.startsWith("__") || stale === "5511999999999" || stale === "lorem ipsum")
      errors.push(`Placeholder ou dado de teste detectado: ${stale}`);
  }
}

if (errors.length) {
  console.error("Validação da campanha falhou:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Campanha válida: ${config.campaignName} (${config.products.length} produtos).`);
