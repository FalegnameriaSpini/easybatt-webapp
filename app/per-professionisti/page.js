import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  PackageCheck,
  Tag,
  Map,
  ScanLine,
  Workflow,
  Settings2,
} from "lucide-react";
import {
  MarketingShell,
  MarketingHero,
  SectionHeading,
  Comparison,
  FaqSection,
  ProjectContact,
} from "@/components/marketing/site-sections";
import styles from "@/components/marketing/marketing.module.css";

export const metadata = {
  title: "EasyBatt per professionisti | Battiscopa pronti da posare",
  description:
    "Per posatori, parquetisti, falegnami, imprese e rivenditori di Brescia e provincia. Rilievo e preparazione del battiscopa prima del cantiere, con fornitura opzionale.",
};

const professions = [
  {
    id: "posatori",
    title: "Posatori e parquetisti",
    benefit: "Più tempo dedicato alla posa.",
    text: "Quando il battiscopa arriva già tagliato, codificato e organizzato, diminuiscono le attività di preparazione da svolgere sul posto. Puoi concentrare tempo e competenza nella fase in cui il tuo lavoro crea più valore: la posa.",
  },
  {
    id: "falegnami",
    title: "Falegnami",
    benefit: "Il lavoro arriva già organizzato.",
    text: "EasyBatt prepara i battiscopa sulla base del rilievo dell'ambiente, gestendo prima lavorazione e codifica. Meno operazioni sul posto e un processo più ordinato fino al montaggio, anche quando il battiscopa è soltanto una parte del tuo lavoro.",
  },
  {
    id: "imprese",
    title: "Imprese e ristrutturatori",
    benefit: "Una finitura più semplice da gestire.",
    text: "In una ristrutturazione ogni lavorazione deve inserirsi tra tempi, persone e attività diverse. Ricevere battiscopa già preparati significa ridurre una parte delle lavorazioni nell'immobile e rendere più organizzata la fase di posa.",
  },
  {
    id: "rivenditori",
    title: "Rivenditori e showroom",
    benefit: "Un servizio da affiancare al prodotto.",
    text: "Alla vendita del battiscopa puoi affiancare la preparazione su misura dell'ambiente. Un modo per ampliare la proposta a professionisti e clienti: non soltanto materiale, ma un lavoro organizzato per la posa. Le modalità di collaborazione si definiscono insieme.",
  },
];
const faqs = [
  {
    question: "EasyBatt è rivolto solo ai posatori?",
    answer:
      "No. Il servizio è pensato anche per parquetisti, falegnami, imprese di ristrutturazione, rivenditori e showroom che gestiscono la fornitura o la posa del battiscopa.",
  },
  {
    question: "Devo cambiare il mio modo di posare?",
    answer:
      "EasyBatt interviene soprattutto prima della posa: rilievo, preparazione, taglio, codifica e organizzazione. Il montaggio rimane affidato alla competenza del professionista.",
  },
  {
    question: "Qual è il vantaggio economico?",
    answer:
      "Il valore va considerato insieme alle attività che normalmente precedono la posa. Con EasyBatt parte del tempo dedicato a misurare, tagliare e organizzare viene spostato prima del cantiere. Quanto incide dipende dal lavoro: ne parliamo sul tuo progetto.",
  },
  {
    question: "Posso fornire io il battiscopa?",
    answer:
      "La fornitura è opzionale. Se hai già il materiale, ne valutiamo la compatibilità con la lavorazione e concordiamo ritiro, consegna ed eventuali costi di trasporto.",
  },
  {
    question: "Un rivenditore può proporre EasyBatt ai propri clienti?",
    answer:
      "Sì, come servizio complementare alla fornitura del battiscopa. Le modalità di collaborazione vanno definite in base al rivenditore e al progetto.",
  },
  {
    question: "In quali zone è disponibile?",
    answer:
      "Nella fase di lancio il servizio è rivolto prioritariamente ai professionisti con lavori a Brescia e provincia.",
  },
  {
    question: "Posso partire da un singolo lavoro?",
    answer:
      "Sì. Raccontaci il lavoro in programma e verifichiamo insieme se presenta le condizioni adatte. Il primo contatto non ti impegna ad acquistare e non richiede la registrazione di un account.",
  },
];

export default function ProfessionalsPage() {
  return (
    <MarketingShell mobileContact>
      <MarketingHero
        content={{
          eyebrow: "Posatori / Falegnami / Imprese / Rivenditori",
          title:
            "Battiscopa su misura per professionisti, già pronti da posare.",
          description:
            "Rileviamo l'ambiente, prepariamo ogni elemento su misura e ti consegniamo battiscopa già tagliati, codificati e con la planimetria di posa. Meno lavoro di preparazione sul posto. Più tempo per ciò che sai fare meglio.",
          href: "#benefici",
          action: "Scopri cosa cambia",
          ctaLabel: "Prova EasyBatt sul tuo prossimo lavoro",
          ctaFirst: true,
        }}
      />

      <section id="benefici" className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Non cambiamo il tuo mestiere"
            title="Il tuo lavoro resta il tuo. Prepariamo quello che viene prima."
          >
            La competenza nella posa, l&apos;esperienza e la qualità del lavoro
            restano nelle tue mani. EasyBatt interviene prima: rilievo,
            elaborazione delle misure, taglio, codifica e organizzazione.
          </SectionHeading>
          <p className={styles.keyLine}>
            Non sostituiamo il professionista. Gli togliamo lavoro prima del
            lavoro.
          </p>
          <h3>Per ogni pezzo, quante cose devi fare prima di montarlo?</h3>
          <Comparison />
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Per il tuo mestiere"
            title="Lo stesso sistema. Un vantaggio concreto per ogni professionista."
          />
          <nav
            aria-label="Categorie professionali"
            className={styles.sectionIndex}
          >
            {professions.map((item) => (
              <Link key={item.id} href={`#${item.id}`}>
                {item.title}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <div className={styles.professionGrid}>
            {professions.map((item) => (
              <article key={item.id} id={item.id}>
                <h3>{item.title}</h3>
                <p>
                  <strong>{item.benefit}</strong>
                </p>
                <p>{item.text}</p>
                <Link href="#prova">
                  Parliamo del tuo prossimo lavoro{" "}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.container} ${styles.sectionIntro}`}>
          <SectionHeading
            eyebrow="Il valore del tempo"
            title="Il costo non è solo quello del battiscopa."
          />
          <div className={styles.storyBody}>
            <Clock3 size={30} aria-hidden="true" />
            <p className={styles.lead}>
              Misurare, tagliare e organizzare richiede tempo. Anche quello è
              una parte del costo del lavoro.
            </p>
            <p>
              EasyBatt permette di valutare la preparazione non soltanto in base
              al prezzo del materiale, ma anche in relazione alle attività che
              non dovrai più svolgere sul posto.
            </p>
            <Link href="/quanto-mi-costa" className={styles.sectionLink}>
              Calcola una stima per il tuo progetto{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Un vantaggio anche per il tuo cliente"
            title="Niente taglio sul posto. Niente polvere e rumore generati dal taglio."
          >
            Quando i battiscopa arrivano già preparati, nell&apos;immobile non
            serve la postazione di taglio. Un vantaggio per chi posa e un
            beneficio evidente in case abitate, uffici, negozi e immobili in
            ristrutturazione.
          </SectionHeading>
          <p>
            Meno lavorazioni invasive. Un&apos;esperienza migliore anche per il
            tuo cliente.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Cosa ricevi"
            title="Tutto organizzato per arrivare alla posa."
          />
          <div className={styles.benefits}>
            <div>
              <PackageCheck size={28} aria-hidden="true" />
              <h3>Battiscopa preparati</h3>
              <p>Tagliati sulla base del rilievo dello specifico ambiente.</p>
            </div>
            <div>
              <Tag size={28} aria-hidden="true" />
              <h3>Pezzi codificati</h3>
              <p>Riferimenti per identificare i singoli elementi.</p>
            </div>
            <div>
              <Map size={28} aria-hidden="true" />
              <h3>Planimetria di posa</h3>
              <p>Una guida per collegare ogni codice alla sua posizione.</p>
            </div>
          </div>
          <p className={styles.supplyNote}>
            Il servizio viene prima del materiale. Puoi richiedere anche la
            fornitura del battiscopa oppure proporre il tuo materiale, da
            valutare prima della lavorazione.
          </p>
          <Link href="/come-funziona" className={styles.sectionLink}>
            Scopri come funziona <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.container} ${styles.systemLayout}`}>
          <div>
            <SectionHeading
              eyebrow="Perché EasyBatt può farlo"
              title="Dietro un battiscopa pronto c'è un sistema."
            >
              Un processo sviluppato a partire dall&apos;esperienza nelle
              lavorazioni su misura. Ogni fase prepara quella successiva.
            </SectionHeading>
            <Link href="/il-sistema" className={styles.sectionLink}>
              Entra nel sistema EasyBatt{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ul className={styles.systemList}>
            {[
              [ScanLine, "Rilievo laser", "Le informazioni dell'ambiente."],
              [
                Workflow,
                "Software proprietario",
                "Elaborazione e organizzazione dei dati.",
              ],
              [
                Settings2,
                "Lavorazione CNC",
                "Preparazione dei singoli elementi.",
              ],
              [
                Map,
                "Codifica e planimetria",
                "Riferimenti per organizzare la posa.",
              ],
            ].map(([Icon, title, text]) => (
              <li key={title}>
                <Icon aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FaqSection items={faqs} title="Le domande dei professionisti." />
      <ProjectContact
        title="Il modo migliore per capire EasyBatt? Provarlo sul tuo lavoro."
        lead="Posatori, parquetisti, falegnami, imprese, ristrutturatori, rivenditori e showroom di Brescia e provincia: se hai un lavoro in programma, raccontacelo."
        text="Valutiamo insieme il progetto e capiamo se EasyBatt può semplificare la gestione del battiscopa."
        action="Prova EasyBatt sul tuo prossimo lavoro"
      />
    </MarketingShell>
  );
}
