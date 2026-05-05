# Shopify-integration — ny development store

## Vad vi gör
1. **Aktivera Shopify** och skapa en ny development store (gratis under bygg).
2. **Erbjuda "Claim Store"** direkt efter — då startar 30 dagars gratis trial. Du kan vänta med detta tills du vill gå live.
3. **Byta ut hårdkodad katalog** (`src/data/catalog.ts`) mot riktig data från Shopify.
4. **Skapa dina startprodukter i Shopify** (badges, rattar, skärmar, door lights, ambient, detailing) så du kan redigera titel/bild/pris/varianter direkt i Shopify admin.
5. **Koppla shop-, kategori-, märke- och produktsidor** till Shopify-data istället för mock.
6. **Riktig checkout** via Shopify (kort, Klarna, Swish när du aktiverar dem i Shopify admin).
7. **Cart** uppdateras till att skapa en Shopify checkout istället för bara lokal state.

## Vad du får i Shopify admin
- Lägga till/ändra produkter, bilder, priser, beskrivningar
- Varianter (storlek/färg/bilmodell)
- Lager och frakt
- Moms och rabattkoder
- Orderhantering

## Vad som händer på sajten
- Hero, intro-video, header, brand-logos och layout är **oförändrade**
- Produktkort, kategori-/märkesidor och produktdetaljsidor läser från Shopify
- "Lägg i kundvagn" → Shopify checkout
- i18n (sv/en) behålls för UI-text; produkt-text kommer från Shopify

## Kostnad — vad du behöver veta
- Development store är **gratis** medan du bygger
- När du klickar "Claim Store" får du **30 dagars gratis trial** på Shopify-prenumeration
- Efter trialen krävs en betald Shopify-plan för att kunna sälja på riktigt
- Lovable lägger inte till någon extra avgift på transaktioner

## Steg-för-steg
1. Aktivera Shopify (`shopify--enable` med ny store)
2. Erbjuda claim direkt (du kan skippa)
3. Skapa initial produktkatalog i Shopify utifrån dina nuvarande mock-produkter
4. Ersätta `src/data/catalog.ts` med Shopify-API-anrop (Storefront API)
5. Uppdatera produktkort, Shop, CategoryPage, BrandPage, ProductPage
6. Uppdatera Cart + Checkout till Shopify checkout
7. Verifiera att allt funkar i preview

## Vad jag behöver från dig sen
- Bekräfta att jag får skapa initiala produkter åt dig (jag använder dina nuvarande mock-produkter som utgångspunkt — du redigerar fritt i Shopify efteråt)
- Senare: ladda upp riktiga produktbilder i Shopify admin
