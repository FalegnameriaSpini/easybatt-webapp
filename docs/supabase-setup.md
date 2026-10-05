# EasyBatt: attivazione Supabase

## Prima fase: catalogo e immagini

Questa integrazione salva catalogo e impostazioni in PostgreSQL e le immagini
caricate dall'admin in Supabase Storage. Non attiva abbonamenti e non pubblica
automaticamente su Vercel. L'admin gestisce ora bozze e listini dedicati;
registrazione clienti, ruoli B2B e assegnazione dei listini restano una fase
successiva e non sono ancora implementati.

Il preventivatore resta pubblico. L'API pubblica espone solo prezzi di vendita,
non costi di acquisto o margini. Il preventivo resta una stima lato browser:
prima di introdurre ordini o listini riservati servira' un calcolo autorizzato
sul server, senza fidarsi degli importi inviati dal cliente.

## Configurazione iniziale

1. Crea un progetto Supabase Free, preferibilmente in una regione UE.
2. Conserva la password del database in un gestore di password.
3. Nel SQL Editor del progetto esegui il file
   `supabase/migrations/202610050001_catalog_storage.sql`.
   Crea una tabella protetta e un bucket pubblico per sole immagini di prodotto.
4. Nelle impostazioni del progetto recupera Project URL e una chiave server
   secret (`sb_secret_...`; e' accettata anche la chiave legacy `service_role`).
5. Inserisci in `.env.local`, mantenendo le variabili Google Maps esistenti:

   ```dotenv
   SUPABASE_URL=https://PROJECT.supabase.co
   SUPABASE_SECRET_KEY=CHIAVE_SERVER
   EASYBATT_ADMIN_PASSWORD=PASSWORD_LUNGA_CASUALE
   ```

   Non inserire segreti in chat, screenshot, GitHub o variabili `NEXT_PUBLIC_*`.
   La chiave anon/publishable non va usata al posto della chiave server.

6. Esegui `npm run supabase:migrate` per controllare prodotti e immagini locali.
   Questa verifica non scrive online e non richiede chiavi.
7. Esegui `npm run supabase:migrate -- --apply` per il primo trasferimento.
   Il comando carica le immagini locali referenziate e inserisce il catalogo;
   rifiuta di sovrascrivere un catalogo gia' presente. I nomi delle immagini
   derivano dal contenuto, per poter riprendere un trasferimento interrotto.
   Il file `data/easybatt-config.json` non viene modificato.
8. Riavvia il server locale; prova accesso admin, modifica, salvataggio e refresh.

## Vercel

1. Prima del deploy, configura `EASYBATT_ADMIN_PASSWORD` su Vercel.
   Senza password esplicita l'admin in produzione rifiuta l'accesso.
2. Solo dopo il trasferimento iniziale imposta `SUPABASE_URL` e
   `SUPABASE_SECRET_KEY` nelle variabili dell'ambiente Production.
3. Pubblica il codice con il normale flusso GitHub e verifica il deployment.
4. In `/admin`, dopo l'accesso deve comparire `Database e immagini: Supabase`.
5. Verifica il salvataggio da una seconda sessione e dopo un nuovo deployment.

Non collegare Preview e prove locali al database reale se non vuoi che possano
modificare il catalogo pubblico. Per lo sviluppo continuativo usa un progetto
Supabase separato, oppure mantieni entrambe le variabili Supabase assenti in locale.

## Ambiente locale di prova

`npm run dev:sandbox` avvia http://127.0.0.1:3001/admin senza usare Supabase,
anche quando `.env.local` contiene le credenziali reali. Usa la stessa password
admin locale, ma legge e scrive solo `.local/easybatt/easybatt-config.json`.
Al primo avvio il catalogo viene copiato da `data/easybatt-config.json`; ai
successivi avvii le prove sono conservate. Non e' una copia automatica aggiornata
del database online. Le immagini nuove vanno in `public/uploads/easybatt-sandbox`.
Questi file e la build `.next-sandbox` sono esclusi da Git. La modalita' sandbox
viene rifiutata su Vercel e in produzione. Non impostare `EASYBATT_SANDBOX` su Vercel.

`npm run dev` mantiene invece il comportamento precedente: con le credenziali
Supabase presenti, i suoi salvataggi modificano il database online.

## Listini dedicati

- I listini sono salvati nel campo privato `priceLists` della configurazione,
  con la stessa protezione e lo stesso controllo di revisione del catalogo.
  Non serve un'altra migrazione SQL.
- Per configurazioni precedenti viene predisposto `Professionisti` in bozza,
  senza sconti o tariffe decisi. Il primo salvataggio ne registra i valori.
- Lo sconto battiscopa e' una percentuale 0-100 sul prezzo pubblico di fornitura
  (costo base con margine). Non si estende a servizi, spedizione o aliquota IVA.
- Tariffe vuote/null ereditano il prezzo pubblico corrente; zero significa
  gratuito. Non vengono salvate copie fisse delle tariffe pubbliche ereditate.
- Pubblicare richiede un nome univoco e uno sconto esplicito, anche 0%.
  `Salva e pubblica` non promuove automaticamente le bozze. Duplicare un listino
  crea sempre una nuova bozza con identificativo distinto.
- I listini dedicati, anche pubblicati, non modificano il preventivatore pubblico
  e non sono esposti dall'API anonima. L'anteprima nell'admin non e' un preventivo
  autorizzato per un cliente; assegnazione e calcolo server arriveranno con Auth.
- L'importazione del catalogo non rimuove i listini dedicati. Vecchi client admin
  che omettono `priceLists` vengono respinti al salvataggio: ricaricare la pagina.
- Non salvare listini di prova nel database condiviso. Prima di attivare questa
  versione online, aggiornare il server pubblico: la versione precedente non
  conosce `priceLists` e puo' scartarli durante i propri salvataggi.

## Comportamento e limiti

- Con entrambe le variabili Supabase assenti, il sito legge il catalogo locale.
  In locale puo' salvarlo; su Vercel le scritture su file sono bloccate.
- Con una sola variabile configurata l'app segnala errore, senza ripiegare sui file.
- Con Supabase attivo, un database in pausa o non raggiungibile produce un errore
  visibile: non vengono mostrati prezzi di esempio o un listino locale obsoleto.
- In sviluppo (`npm run dev`), senza password configurata, resta disponibile
  `easybatt-admin`. Non e' ammessa come password implicita in produzione.
- La password admin e' mantenuta solo in memoria fino a refresh o uscita.
  Questo accesso transitorio non e' ancora Supabase Auth. Prima dell'apertura
  degli account clienti andranno implementati sessioni, ruoli, limitazione dei
  tentativi, recupero password e invio email.
- Le immagini accettate sono JPG, PNG e WEBP, massimo 3 MB per rimanere sotto
  il limite del corpo delle richieste delle funzioni Vercel.
- Le immagini vengono caricate subito; il collegamento al prodotto diventa
  pubblico quando premi `Salva e pubblica`. Immagini abbandonate o sostituite
  non vengono eliminate automaticamente; va prevista una pulizia verificata.
- Importare un JSON dall'admin sostituisce il catalogo e richiede poi `Salva e
  pubblica`. Le immagini HTTPS o `/uploads/` dei codici gia' presenti vengono
  conservate. Per cambiarle usa i campi immagine del prodotto.
- `npm run catalog:import` continua ad aggiornare SOLO il catalogo locale;
  non pubblica aggiornamenti nel database. Dopo il passaggio a Supabase usa
  l'importazione dell'admin per i prezzi online.
- Le scritture controllano la revisione caricata: se un'altra sessione ha
  aggiornato il listino, il salvataggio viene rifiutato per evitare sovrascritture.

## Verifiche prima dell'uso pubblico

- API pubblica senza `supplyBaseCostPerMl`, `sourceVatPricePerMl`, `supplyMargin`.
- API admin e upload rifiutati senza password.
- Tabella non leggibile ne' modificabile con anon o utenti autenticati ordinari.
- Immagini di prodotto pubbliche; nessuna policy di scrittura per i visitatori.
- Caricamento, refresh, nuovo deploy e conflitto tra due sessioni admin.
- Backup separati di database e file e prova di ripristino: persistenza non
  significa backup. Conserva il catalogo sorgente e le immagini originali.

Riferimenti: https://supabase.com/docs/guides/database/postgres/row-level-security
e https://supabase.com/docs/guides/storage/uploads/standard-uploads
