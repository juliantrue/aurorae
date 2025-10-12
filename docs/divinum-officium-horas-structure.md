# Divinum Officium `www/horas` Data Overview

This note summarizes the structure and formatting conventions of the `vendor/divinum-officium/web/www` data set. It is intended to support building an importer that maps the historical breviary texts into Prisma models.

## Repository Layout Highlights

- `vendor/divinum-officium/` holds application code plus liturgical data. The textual databases that drive the Horas UI live under `web/www`.
- `web/www` contains:
  - `horas/` - canonical hours data in multiple languages, plus configuration assets.
  - `Tabulae/` - calendar tables describing how the engine picks the proper office per day.
  - `missa/` - analogous structure for Mass propers (not covered in detail here).
  - `style/` - CSS, JS, and image assets for the legacy web front end.

## `horas/` Directory Structure

Top-level entries inside `web/www/horas` fall into three buckets:

1. **Configuration and help**: `horas.setup`, `horas.dialog`, `horasbg.jpg`, `psaltery.ind`, `ruler.txt`, `Help/` (HTML documentation, images, CSS).
2. **Shared liturgical building blocks**:
   - `Ordinarium/` - per-hour skeleton scripts (`Matutinum.txt`, `Laudes.txt`, etc.).
   - `Psalterium/` - psalm schedules, hymns, prayers, doxologies, and seasonal variants.
3. **Language-specific content**: one folder per language (`Latin`, `English`, `Deutsch`, etc.). Each language directory typically contains:
   - `Tempora`, `Sancti`, `Commune`, `Psalterium`, `Martyrologium`, and optional `Regula`.
   - Rubrical variants: suffix `M` (Monastic), `OP` (Dominican), `Cist` (Cistercian), `Bea` (Bea translation), `Newer` (alternate modern edition). Where a variant subfolder is missing, code falls back to the base folder for that language, or to English as the global fallback (`horas/Help/technical.html:47-48`).
   - Occasional `Appendix` directories with supplemental texts.

## Naming Conventions

- **Tempora** (`Proprium de Tempore`): filenames follow `SeasonCodew-d.txt`, where `SeasonCode` is e.g. `Adv`, `Quad`, `Pasc`, `Pent`, or a three-digit month-week code (e.g. `085-0` for the 5th Sunday of August) (`horas/Help/technical.html:112`).
- **Sancti** (`Proprium Sanctorum`): filenames use `MM-DD*.txt`. Optional suffixes indicate rubrical scope (`t`, `o`, `r`, `da`, `n`), season overrides (`p`, `q`, `t`), or perpetual commemorations (`cc`) (`horas/Help/technical.html:118-128`).
- **Commune**: alphanumeric IDs (`C1`, `C1a`, `C2-1`, etc.) correspond to the Common of Saints sets (`horas/Help/technical.html:250-269`).
- **Martyrologium**: same `MM-DD.txt` scheme, with parallel directories per rubric (`Martyrologium1955R`, `Martyrologium1960`, etc.).
- **Psalterium/Psalmi**: grouped by usage (`Psalmi matutinum.txt`, `Psalmi major.txt`) with section headers like `[Day0]` for each ferial psalm schema (`horas/English/Psalterium/Psalmi/Psalmi matutinum.txt:1-32`).

## File Structure and Keys

Each `.txt` file is parsed as a hash map keyed by lines enclosed in square brackets (`[Key]`), followed by the content for that element (`horas/Help/technical.html:44-52`). Typical keys include `Rank`, `Rule`, `Ant 1`, `Lectio1`, `Hymnus Vespera`, etc.

Example (`horas/Latin/Sancti/01-06.txt:1-49`):

```
[Rank]
In Epiphania Domini;;Duplex I classis;;6.5

[Rule]
Psalmi Dominica
Antiphonas horas
...

[Hymnus Vespera]
{:H-CrudelisHerodes:}v. Crudel...
```

### Rank Blocks

`[Rank]` lines combine up to three data points separated by `;;`: internal office name, human-readable classification, and a numeric precedence (only the Latin file is authoritative for ranks; translations ignore everything after the first `;;`) (`horas/Help/technical.html:132-152`).

### Rule Blocks

`[Rule]` sections list directive lines that override the default Ordinarium behavior. Common instructions include `ex <source>`, `vide <source>`, `Psalmi Dominica`, `Antiphonas horas`, `Doxology=<season>`, and `9 lectiones` (`horas/Help/technical.html:281-333`). These directives reference other files and determine psalm sets, hymn variants, and which Commons to reuse.

## Inline Markup and Macros

The parsing engine recognizes several leading tokens (`horas/Help/technical.html:210-249`):

- `#`: structural markers inside `Ordinarium` files.
- `[Key]`: start of a hash entry.
- `$Name`: inject a named prayer from `Psalterium/Prayers.txt`.
- `&MacroName`: call a Perl subroutine that expands stock text (e.g., `&Gloria` in `horas/Latin/Tempora/111-0.txt:30`).
- `@Reference`: reuse another hash entry, optionally with inline transformations. Patterns observed:
  - `@LangFolder/File:Key` pulls the exact content (`horas/Latin/Tempora/111-0.txt:7-24`).
  - `@:Key` targets another element within the same file (`horas/Latin/Sancti/01-06.txt:55-58`).
  - `@...:s/old/new/flags` applies search/replace before insertion (`horas/Latin/Sancti/01-06.txt:49`).
- `!` at line start prints rubric text in red (`horas/Latin/Tempora/111-0.txt:34-36`).
- `V.` / `R.` mark versicle/response; `v.` and `r.` (lowercase) tweak typography.
- `_` stands for a blank spacer line; a double newline ends a table cell.
- `~` at line end forces a tight layout.
- `()` within psalm lines render small red verses; numeric prefixes (or `chapter:verse`) print verse numbers in red (`horas/English/Psalterium/Psalmi/Psalmi matutinum.txt:2-47`).
- `{:ID:}` tags identify chant/hymn references shared across languages (e.g., `{:H-CrudelisHerodes:}` in `horas/Latin/Sancti/01-06.txt:21-46`).

Conditionals wrapped in parentheses use keywords such as `si`, `vero`, `attamen`, combined with rubrical predicates (e.g., `rubrica tridentina`, `tempore nativitatis`) to control inclusion or omission at runtime (`horas/Help/technical.html:339-360`).

## `Psalterium` Content Patterns

- Psalm schema files (`Psalmi *.txt`) group antiphons and verses under headers `[Day0]` through `[Day31]`. Each line pairs the sung text with a `;;PsalmNumber(verse-range)` token that identifies the canonical source (`horas/English/Psalterium/Psalmi/Psalmi matutinum.txt:1-47`).
- Other supporting files include `Doxologies.txt`, `Invitatorium.txt`, `Mariaant.txt`, and `Special/` variants for seasons and offices.

## Calendar Tables (`Tabulae/`)

- `Tabulae/Kalendaria/*.txt` enumerate sanctoral assignments per calendar version. Lines use `=` to map a civil date to one or more office files, with `~` delimiting commemorations. Comments begin with `*` or `#-` (`Tabulae/Kalendaria/1888.txt:1-18`).
- `Tabulae/Tempora/*.txt` map season-day identifiers to alternate files when rubrics demand it (`Tabulae/Tempora/1570.txt:1-18`).
- `Tabulae/Transfer/*.txt` and `Tabulae/Stransfer/*.txt` handle movable solemnities and Matins lesson transfers keyed by Dominical letter or Easter week (`horas/Help/technical.html:69-104`).

Importers must combine these tables with the primary `Tempora`/`Sancti` data to resolve the correct office for any given calendar date and rubric.

## Other Notable Assets

- `horas.setup` stores default UI parameters and version selections as Perl-style assignment lines grouped under `[parameters]`, `[general]`, etc.
- `horas.dialog` shapes the configuration dialog (field labels, dropdown options, etc.), providing canonical lists of languages, rubrical versions, and votive options.

## Guidance for Prisma Modeling

- **Entities**: anticipate separate models for `Language`, `Office` (distinguishing Tempora/Sancti/Commune), `Section` (keyed by `[Key]`), `Rule`, `Rank`, and `Reference`. `Tabulae` entries can drive a `CalendarAssignment` or `TransferRule` model.
- **Content storage**: preserve raw text plus parsed metadata (e.g., macro tags, verse refs) so the rendering engine can faithfully reconstruct typography and conditional logic. Consider keeping both the literal body and a structured representation of inline directives.
- **Cross-language fallback**: mirror the runtime fallback chain (language -> base language -> English) when resolving missing keys.
- **Rules and conditionals**: parse `[Rule]` into normalized instructions, and detect inline conditional parentheses to capture rubric-dependent variants.
- **References**: resolve `@` links to their target sections with a join table to enable graph traversal when assembling an office.
- **Versioning**: tie every office to the rubrical versions listed in `horas.dialog` and `Tabulae/data.txt` so the application can serve multiple calendars.

Documenting these conventions before building ingestion code will minimize surprises and help ensure the Prisma schema captures the implicit relationships already encoded in the Divinum Officium data set.
