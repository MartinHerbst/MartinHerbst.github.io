# Aplikace pro převod počasí
Jednoduchá webová aplikaci, pro zobrazení předpověďi počasí na následujících pět dní.

Aplikace je vytvořena pomocí technologií **HTML5**, **CSS3** (s využitím preprocesoru **SCSS**) a **JavaScriptu**.  
JavaScriptová část aplikace je implementována s důrazem na objektově orientované programování (OOP).

Jednotlivé části aplikace jsou rozděleny do samostatných tříd a modulů s jasně definovanou odpovědností.


## Princip fungování aplikace

Po otevření stránky s aplikací je automaticky zobrazeno aktuální počasí pro přednastavené (výchozí) město. 
Tato data jsou načtena ihned po inicializaci aplikace.

Pro zobrazení počasí pro jiné město má uživatel k dispozici vyhledávací pole s našeptávačem. 
Našeptávač průběžně nabízí dostupná města na základě zadaného textu.

Po výběru města a potvrzení vyhledávání dojde k načtení a zobrazení aktuálního počasí pro zvolené město.

Uživatelské rozhraní aplikace je rozděleno do tří hlavních částí:
- hlavní informace o aktuálním počasí,
- časová osa (časová linka) s vývojem počasí,
- přepínače mezi jednotlivými dny pětidenní předpovědi počasí.


## Souborová struktura aplikace

### `index.html`
Hlavní HTML soubor aplikace.
- definuje základní strukturu stránky
- obsahuje vstupní body pro styly a JavaScript
- poskytuje cílové prvky pro dynamické vykreslování obsahu


### `/styles`
Adresář obsahující styly aplikace.
- `main.scss`  
  Hlavní SCSS soubor, který importuje dílčí styly aplikace.

- `_layout.scss`  
  Styly rozložení stránky a základní struktury rozhraní.

- `_visual.scss`  
  Vizuální styly aplikace.

- `_variables.scss`  
  Proměnné používané napříč styly (barvy, fonty).

- `main.css`  
  Výsledný CSS soubor vytvořený kompilací ze `main.scss`, který je načítán do aplikace.


### `/javascript`
Adresář obsahující aplikační logiku napsanou v JavaScriptu.

#### `main.js`
Hlavní inicializační soubor aplikace.
- spouští aplikaci po načtení stránky
- propojuje jednotlivé moduly
- nastavuje výchozí atributy

#### `cities-loader.js`
- zajišťuje načítání dat o městech z JSON souboru

#### `autocomplete.js`
- obsahuje logiku našeptávače měst
- pracuje s vybraným vstupním (input) elementem
- reaguje na uživatelský vstup a filtruje dostupná města

#### `weather-searcher.js`
- zajišťuje získávání dat o počasí pro zadané město
- komunikuje s API služby OpenWeatherMap
- vrací získaná data dalším částem aplikace

#### `weather-renderer.js`
- dynamicky vytváří strukturu widgetu počasí
- zodpovídá za vykreslení dat do uživatelského rozhraní
- využívá pomocné třídy `weather.js` a `dom-builder.js`

#### `weather.js`
- třída sloužící k přehledné práci s daty o počasí
- poskytuje metody pro získání detailních informací o počasí

#### `dom-builder.js`
- pomocná třída pro vytváření a správu DOM stromu
- zjednodušuje práci s dynamickým vytvářením HTML prvků


### `/city_data`
Adresář obsahující statická data o městech.
#### `*.json`
JSON soubor s daty o městech.


## Podporované prohlížeče

Aplikace byla vyvíjena a testována v prohlížeči **Google Chrome**, kde se chová v souladu s očekávanou funkcionalitou.

Dále byla ověřena funkčnost v následujících prohlížečích:
- **Safari**
- **Microsoft Edge**

Funkčnost aplikace v ostatních prohlížečích nebyla testována.


## Možnosti dalšího vylepšení aplikace

Aplikace je navržena modulárně, což umožňuje její další rozšiřování a úpravy. 
Mezi možné směry budoucího vylepšení patří zejména:

- **Dynamické určení výchozího města**
  V současné době je při spuštění aplikace pevně nastaveno výchozí město Olomouc.  
  Do budoucna by bylo možné automaticky zvolit výchozí město na základě geolokace uživatele.

- **Načítání dat o městech z online zdroje**  
  Data o městech jsou aktuálně načítána ze statického JSON souboru.  
  Alternativním řešením by bylo jejich dynamické načítání z externího online zdroje.

- **Rozšíření časové osy počasí**  
  Časová osa je v současné podobě zobrazena jako jednoduchá linie s časovými a odpovídajícími záznamy o počasí.  
  Do budoucna by bylo možné tuto osu rozšířit o grafické znázornění vývoje teploty v průběhu dne.
