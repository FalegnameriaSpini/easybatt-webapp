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
  title: "Il sistema EasyBatt | Rilievo, software e preparazione CNC",
  description:
    "Un sistema integrato: rilievo laser, software proprietario, CNC, codifica e planimetria di posa. Scopri come EasyBatt prepara il battiscopa per il tuo ambiente.",
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
    label: "Lavorazione CNC",
    text: "Il progetto entra nella fase produttiva. La lavorazione CNC prepara i singoli elementi sulla base dei dati elaborati dal sistema.",
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
      "È un sistema di preparazione del battiscopa che integra rilievo laser, elaborazione con software proprietario, lavorazione CNC, codifica dei pezzi e planimetria di posa.",
  },
  {
    question: "Perché viene utilizzato il rilievo laser?",
    answer:
      "Per acquisire le informazioni dell'ambiente necessarie alle successive fasi di elaborazione e preparazione. Il progetto parte dallo spazio reale.",
  },
  {
    question: "Il software EasyBatt è proprietario?",
    answer:
      "Sì. È stato sviluppato per elaborare e organizzare i dati del processo produttivo EasyBatt, collegando il rilievo alle fasi di preparazione e identificazione dei pezzi.",
  },
  {
    question: "Devo imparare a usare il software?",
    answer:
      "Il software governa la preparazione del lavoro. Il professionista riceve i pezzi codificati e la planimetria di posa: non deve gestire il software produttivo per identificare e montare gli elementi.",
  },
  {
    question: "Qual è il ruolo della lavorazione CNC?",
    answer:
      "Trasferisce alla preparazione fisica dei battiscopa le informazioni definite dal progetto, per realizzare gli elementi destinati allo specifico ambiente.",
  },
  {
    question: "A cosa servono codici e planimetria?",
    answer:
      "Il codice identifica il pezzo, la planimetria indica dove va posizionato. Insieme permettono di passare dal materiale preparato all'organizzazione della posa.",
  },
  {
    question: "Il sistema sostituisce il posatore?",
    answer:
      "No. Interviene nella preparazione del lavoro. La posa resta affidata alla competenza del professionista.",
  },
];

export default function SystemPage() {
  return (
    <MarketingShell>
      <MarketingHero
        content={{
          eyebrow: "Tecnologia al servizio del lavoro",
          title: "Il sistema EasyBatt",
          statement: "Precisione nel processo. Semplicità nella posa.",
          description:
            "Rilievo, software, CNC, codifica e planimetria. Non tecnologie isolate: un unico sistema.",
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
            Il rilievo raccoglie i dati, il software li elabora, la CNC li
            trasforma in elementi fisici. Codifica e planimetria organizzano ciò
            che arriverà sul posto.
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
          <p className={styles.supplyNote}>
            La fornitura del battiscopa resta opzionale. L&apos;eventuale
            materiale del cliente e la relativa logistica vengono valutati prima
            della conferma.
          </p>
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
              <h3>Meno preparazione sul posto</h3>
              <p>
                Le normali operazioni di taglio avvengono prima, evitando
                polvere e rumore generati nell&apos;immobile da questa
                lavorazione.
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
      <ProjectContact />
    </MarketingShell>
  );
}
