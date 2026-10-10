import Link from "next/link";
import {
  ArrowRight,
  ScanLine,
  Workflow,
  Settings2,
  Tag,
  Map,
  Check,
  PackageCheck,
} from "lucide-react";
import {
  MarketingShell,
  MarketingHero,
  SectionHeading,
  FaqSection,
  ProjectContact,
} from "@/components/marketing/site-sections";
import styles from "@/components/marketing/marketing.module.css";

export const metadata = {
  title: "Il sistema EasyBatt | Rilievo laser, software e troncatrice CNC",
  description:
    "Un sistema integrato: rilievo laser, software proprietario, troncatrice a controllo numerico (CNC), codifica e planimetria di posa. Scopri come EasyBatt prepara il battiscopa per il tuo ambiente.",
};
const stages = [
  {
    id: "rilievo",
    Icon: ScanLine,
    title: "Tutto parte dall'ambiente reale.",
    label: "Rilievo laser",
    text: "Ogni lavoro inizia dallo spazio nel quale il battiscopa dovrà essere installato. Il rilievo laser raccoglie le informazioni necessarie alle fasi successive.",
    reason:
      "Non una misura standard: la base del progetto è l'ambiente in cui ogni elemento troverà la sua posizione.",
  },
  {
    id: "software",
    Icon: Workflow,
    title: "Dal rilievo al progetto.",
    label: "Software proprietario",
    text: "Raccogliere le misure non basta. Il software proprietario EasyBatt elabora e organizza i dati per trasformarli nelle informazioni necessarie alla preparazione dei singoli elementi.",
    reason:
      "Il collegamento tra ambiente rilevato, lavorazione e identificazione dei pezzi.",
  },
  {
    id: "cnc",
    Icon: Settings2,
    title: "Dal dato al battiscopa.",
    label: "Troncatrice a controllo numerico",
    text: "Il progetto passa in laboratorio. La troncatrice a controllo numerico taglia ogni pezzo con le misure calcolate dal software.",
    reason:
      "L'informazione digitale diventa un elemento fisico destinato a quello specifico ambiente.",
  },
  {
    id: "codifica",
    Icon: Tag,
    title: "Ogni pezzo ha il suo riferimento.",
    label: "Codifica",
    text: "Preparare su misura è solo una parte del lavoro. I singoli elementi vengono codificati per riconoscerli e collegarli alla posizione prevista.",
    reason:
      "Non una serie di battiscopa tagliati: un lavoro organizzato per chi dovrà montarlo.",
  },
  {
    id: "planimetria",
    Icon: Map,
    title: "Dal codice alla posizione.",
    label: "Planimetria di posa",
    text: "La planimetria accompagna i battiscopa e collega i pezzi codificati alla loro posizione nell'ambiente. Un riferimento concreto da consultare durante il montaggio.",
    reason:
      "Il punto di arrivo del sistema è lo stesso da cui siamo partiti: l'ambiente reale.",
  },
];
const faqs = [
  {
    question: "Che cos'è il sistema EasyBatt?",
    answer:
      "È il nostro modo di preparare il battiscopa. Misuriamo la stanza con un misuratore laser robotico, il software calcola i tagli e la troncatrice a controllo numerico taglia i pezzi. Ogni pezzo ha un codice e arriva con la planimetria di posa.",
  },
  {
    question: "Perché usate il laser?",
    answer:
      "Perché misura la stanza com'è davvero, angoli compresi. Da queste misure partono tutti i tagli.",
  },
  {
    question: "Il software è vostro?",
    answer:
      "Sì, l'abbiamo sviluppato noi, apposta per EasyBatt. Collega le misure, i tagli e i codici dei pezzi.",
  },
  {
    question: "Devo imparare a usare il software?",
    answer:
      "No. Il software lo usiamo noi. Tu ricevi i pezzi codificati e la planimetria di posa su carta. Per montarli non serve nessun programma: basta guardare sulla planimetria dove va il codice del pezzo.",
  },
  {
    question: "A cosa serve la troncatrice a controllo numerico?",
    answer:
      "Taglia ogni pezzo con le misure calcolate dal software. Il taglio si fa in laboratorio, non in cantiere.",
  },
  {
    question: "A cosa servono codici e planimetria?",
    answer:
      "Il codice ti dice qual è il pezzo. La planimetria ti dice dove va. Così monti un pezzo dopo l'altro, senza misurare.",
  },
  {
    question: "Il sistema fa il lavoro del posatore?",
    answer: "No. Il sistema prepara i pezzi. La posa la fai tu.",
  },
];

export default function SystemPage() {
  return (
    <MarketingShell>
      <MarketingHero
        content={{
          eyebrow: "Tecnologia al servizio del lavoro",
          title:
            "Il sistema EasyBatt: dalla precisione del rilievo alla semplicità della posa.",
          description:
            "Rilievo laser, software proprietario, troncatrice a controllo numerico (CNC), codifica e planimetria. Non tecnologie isolate: un unico sistema per preparare il battiscopa prima che arrivi in cantiere.",
          href: "#processo",
          action: "Entra nel sistema",
        }}
      />
      <section id="processo" className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Un unico processo"
            title="Ogni fase prepara quella successiva."
          >
            Il rilievo raccoglie i dati, il software li elabora, la troncatrice
            a controllo numerico taglia i pezzi. Codifica e planimetria
            organizzano ciò che arriverà sul posto.
          </SectionHeading>
          <nav className={styles.processIndex} aria-label="Fasi del sistema">
            {stages.map(({ id, label, Icon }, index) => (
              <Link href={`#${id}`} key={id}>
                <Icon size={24} aria-hidden="true" />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{label}</strong>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {stages.map(({ id, Icon, title, label, text, reason }, index) => (
        <section
          key={id}
          id={id}
          className={`${styles.section} ${index % 2 === 0 ? styles.light : ""}`}
        >
          <div className={`${styles.container} ${styles.systemLayout}`}>
            <div>
              <SectionHeading
                eyebrow={`${String(index + 1).padStart(2, "0")} / ${label}`}
                title={title}
              >
                {text}
              </SectionHeading>
            </div>
            <div className={styles.technicalExplanation}>
              <Icon size={38} strokeWidth={1.5} aria-hidden="true" />
              <h3>Perché conta</h3>
              <p>{reason}</p>
              {id === "software" && (
                <ul className={styles.plainList}>
                  <li>Riceve i dati del rilievo.</li>
                  <li>Li elabora per la preparazione.</li>
                  <li>Organizza i singoli elementi.</li>
                  <li>Collega lavorazione e identificazione.</li>
                </ul>
              )}
            </div>
          </div>
        </section>
      ))}

      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Il valore dell'insieme"
            title="Il battiscopa è ciò che ricevi. Il sistema è ciò che lo rende possibile."
          >
            Rilievo, elaborazione, lavorazione e organizzazione trasformano il
            materiale in elementi preparati per la posa. Il valore nasce da
            tutto ciò che accade prima della consegna.
          </SectionHeading>
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`}>
        <div className={`${styles.container} ${styles.sectionIntro}`}>
          <SectionHeading
            eyebrow="Tecnologia ed esperienza"
            title="Conoscere il lavoro, per migliorarlo."
          />
          <div>
            <p className={styles.lead}>
              Il sistema nasce dall&apos;esperienza di Falegnameria Spini nelle
              lavorazioni su misura: osservare il lavoro sul campo, riconoscere
              le attività migliorabili e prepararle prima della posa.
            </p>
            <Link href="/chi-siamo" className={styles.sectionLink}>
              Le origini di EasyBatt <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Per chi posa"
            title="Tutta questa tecnologia deve portare a una cosa semplice."
          />
          <div className={styles.benefits}>
            <div>
              <Check size={28} aria-hidden="true" />
              <h3>Niente taglio sul posto</h3>
              <p>
                Il taglio avviene prima dell&apos;arrivo in cantiere: niente
                polvere e rumore da questa lavorazione nell&apos;immobile.
              </p>
            </div>
            <div>
              <PackageCheck size={28} aria-hidden="true" />
              <h3>Pezzi organizzati</h3>
              <p>Codifica e planimetria aiutano a individuare gli elementi.</p>
            </div>
            <div>
              <Map size={28} aria-hidden="true" />
              <h3>Più tempo per la posa</h3>
              <p>
                La tua attenzione rimane sul montaggio e sulla qualità del
                risultato.
              </p>
            </div>
          </div>
          <Link href="/per-professionisti" className={styles.sectionLink}>
            EasyBatt per il tuo mestiere{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <FaqSection items={faqs} title="Dentro il sistema EasyBatt." />
      <ProjectContact
        title="Dalla tecnologia al tuo prossimo lavoro."
        lead="Il modo migliore per comprendere il sistema EasyBatt è vederlo applicato a un ambiente reale."
        text="Hai un lavoro in programma a Brescia o provincia? Raccontaci il progetto e vediamo insieme come preparare il battiscopa prima dell'arrivo in cantiere."
        action="Prova il sistema EasyBatt"
      />
    </MarketingShell>
  );
}
