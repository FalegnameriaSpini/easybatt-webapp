# Materiali visivi delle pagine EasyBatt

## Fotografie originali inserite il 16 ottobre 2026

Le pagine usano ora copie delle fotografie fornite dal titolare nella cartella
privata `Pictures/Immagini_per_webapp`. Gli originali non sono stati modificati
ne' copiati nella cartella pubblica. La prova AI con i battiscopa bianchi e le
varianti ritoccate presenti nella cartella sorgente non sono state utilizzate.

| File pubblico in `public/marketing/originali` | Sorgente | Uso |
| --- | --- | --- |
| `pezzi-codificati-apertura.webp` | `20261016_191511.jpg` | Apertura di Home, Per i professionisti, Chi siamo e Prova EasyBatt (ritaglio largo) |
| `kit-codificato-v2.webp` | `20261016_191511.jpg` | Cosa ricevi in Come funziona |
| `consegna-cantiere.webp` | `20251209_102446.jpg` | Blocco verde della Home e passaggio "Pronti da posare": lavoro EasyBatt arrivato in cantiere |
| `rilievo-laser.webp` | `20261001_150246(3).jpg` | Apertura di Come funziona e Il sistema |
| `rilievo-stanza.webp` | `20261001_150421.jpg` | Fase del rilievo in Il sistema (laser da solo nella stanza vuota) |
| `rilievo-ingresso.webp` | `20251129_104046.jpg` | Passaggio "Rilievo" in Come funziona: ingresso con pareti verdi, ritaglio 4:3 con laser e treppiede interi |
| `software-calcolo-stanza-f.webp` | `Screenshot 2026-10-14 092843.png` | Passaggio "Calcolo" in Come funziona: stanza irregolare con codici F01-F15, ritaglio 4:3 completo |
| `software-planimetria-v2.webp` | `Screenshot 2026-10-14 090311.png` | Fase software in Il sistema: pianta con codici C |
| `software-dettaglio-codici-v2.webp` | `Screenshot 2026-10-14 102145.png` | Relazione codice-posizione |
| `lavorazione-battiscopa-v2.webp` | `20261016_163433.jpg` | Passaggio "Taglio" in Come funziona |
| `troncatrice-angolo.webp` | `20261016_193130.jpg` | Blocco sugli angoli e fase del taglio in Il sistema: etichetta e display a 42,5° |
| `etichetta-pezzo-v2.webp` | `20261016_114835.jpg` | Dettaglio del codice D02, ruotato per la lettura |
| `ambiente-battiscopa-bianco-v2.webp` | `20251215_165216.jpg` | Fascia "Il taglio resta fuori" della Home (ritaglio in basso a sinistra) |

I riferimenti al cliente sulle sette etichette e sul cartiglio della foto del
kit (anche nel ritaglio d'apertura che ne deriva), sull'etichetta D02, sull'etichetta
della macchina e sull'etichetta del pezzo F07 sono coperti da maschere opache
incorporate nei pixel. Ogni maschera ha il colore della superficie che copre
(etichetta o carta), cosi' la riga coperta appare vuota invece che come una
barra grigia; resta comunque piena e non ricostruibile. Non si usano sfocature,
coperture CSS o immagini originali nascoste: anche aprendo il file pubblico si
vede la copia oscurata. Le fotografie della stampante di etichette e le altre
foto delle etichette nella cartella sorgente mostrano il nome del cliente: non
vanno pubblicate senza aggiungere le relative maschere.

Il 16 ottobre, dopo la prima pubblicazione locale, sono state riviste le scelte:

- la vecchia apertura (`20251215_165113.jpg`) e' stata tolta perche' sfocata gia'
  nello scatto originale; il battiscopa curvo (`20251217_180600.jpg`) non si usa
  perche' EasyBatt per ora non gestisce i tratti curvi;
- il ritaglio del corridoio esclude la porta aperta, la scatola, il cartone a
  terra e il campione di carta da parati;
- le schermate partono sotto la scheda "Pianta" del programma di disegno;
- nella Home i pezzi codificati restano solo in apertura; nel blocco verde c'e'
  la consegna in cantiere, confermata dal titolare come lavoro EasyBatt;
- nella foto della consegna le etichette dei pacchi non sono leggibili nemmeno
  nell'originale (verificato ingrandendo la piu' vicina), quindi non servono
  maschere; il ritaglio esclude una scatola con il marchio di un altro
  produttore, il tappetino grigio e l'isola della cucina.

Quando cambia il contenuto di un file gia' pubblicato, l'immagine prende un nome
nuovo (per esempio `-v2`): l'ottimizzatore di Next.js e i browser conservano le
immagini per indirizzo e continuerebbero a mostrare la versione precedente.
Codici dei pezzi, misure, disegni e finiture non vengono ricostruiti con AI.
I WebP esportati non conservano EXIF, GPS, XMP o IPTC della sorgente.

La preparazione e' riproducibile, separata dalla build del sito:

```powershell
node scripts/prepare-marketing-photos.mjs "C:\Users\giasp\Pictures\Immagini_per_webapp"
```

Le maschere sono specifiche dei file sorgente indicati: se cambia una fotografia
occorre ricontrollare visivamente tutte le zone, non riusare automaticamente le
coordinate. Lo script verifica l'hash SHA-256 delle quattro sorgenti da
oscurare e si ferma se non corrispondono alle fotografie controllate. I test verificano
dimensioni, assenza dei metadati e coperture campione;
non sostituiscono il controllo dell'intera immagine.

Le fotografie tecniche sono apribili a piena risoluzione in una nuova scheda.
I testi e l'ordine editoriale dell'agenzia restano invariati. Le immagini degli
ambienti non vengono presentate come casi studio documentati o testimonianze.
Restano da aggiungere le foto delle persone in laboratorio e della consultazione
della planimetria durante la posa. Nessun video e' stato aggiunto.

## Ambientazione provvisoria precedente (non piu' utilizzata)

File precedente: `public/marketing/battiscopa-ambientazione.webp` (1672 x 941 pixel). Conservato per tracciabilita', ma non piu' referenziato dalle pagine. La didascalia precedente lo identificava come ambientazione illustrativa generata con AI, non come cantiere o dimostrazione EasyBatt.

Generata con lo strumento integrato image_gen, non tramite API o script CLI. L'originale PNG resta nella cartella delle immagini generate di Codex; la copia WebP ottimizzata e' inclusa nel progetto. Non sono stati utilizzati video di terzi.

Prompt di generazione:

> Create a single wide 16:9 high resolution photorealistic architectural product illustration for EasyBatt skirting board service website. NOT a documented real installation: generic illustrative interior only. Low camera 20cm above pale neutral oak parquet, looking along a crisp matte white straight skirting board approx 8cm tall, professionally flush installed along a quiet light warm-grey plaster wall with a visible precise 90 degree internal corner on the right. The actual white skirting board and precise joint are the subject and must be sharply and clearly inspectable, with natural material texture, natural daylight from the right, no blur, no furniture covering the skirting. Composition: upper left two thirds empty grey plaster wall available for dark headline overlay, skirting and floor occupy bottom third, corner and brighter wall on right. Refined architectural editorial photograph, neutral white/grey with restrained pale wood, not beige overall. No people, no machines, no lettering, no logo, no tools, no plants, no watermarks. Avoid exaggerated tall molding, ornamental molding, shadows obscuring board.

## Sostituzione con materiale originale

Prima di sostituire l'immagine, verificare che il file sia utilizzabile sul sito e che non contenga dati personali o elementi non autorizzati. Aggiornare anche testo alternativo e didascalia. Conservare uno spazio leggibile per il testo a sinistra e il battiscopa visibile nella parte inferiore; verificare l'inquadratura su desktop e telefono.

Lo spazio iniziale puo' ospitare in seguito un video con copertina. Non esiste ancora un caricamento video nell'admin e non vengono effettuate richieste a servizi video esterni.
