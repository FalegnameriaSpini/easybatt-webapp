import Link from "next/link";
import {
  ArrowRight,
  ScanLine,
  Workflow,
  Settings2,
  Tag,
  Map,
  Check,
  Clock3,
} from "lucide-react";
import {
  MarketingShell,
  MarketingHero,
  SectionHeading,
  AngleDiagram,
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
    title: "Tutto parte dalle stanze, come sono davvero.",
    label: "Rilievo laser",
    text: "Veniamo sul posto e misuriamo tutta la casa, stanza per stanza, con un misuratore laser robotico. Da queste misure partono tutte le fasi successive.",
    reason:
      "Non una misura standard: il laser rileva anche gli angoli come sono davvero, per esempio 93° invece di 90°. Il software calcola il taglio al decimo di grado.",
  },
  {
    id: "software",
    Icon: Workflow,
    title: "Dalle misure ai tagli.",
    label: "Software proprietario",
    text: "Le misure da sole non bastano. Il nostro software le usa per calcolare il taglio di ogni pezzo e il punto esatto dove va.",
    reason: "È il collegamento tra le stanze, il taglio e la posa.",
  },
  {
    id: "cnc",
    Icon: Settings2,
    title: "Dal calcolo al taglio.",
    label: "Troncatrice a controllo numerico",
    text: "Il progetto passa in laboratorio. La troncatrice a controllo numerico taglia ogni pezzo con le misure calcolate dal software.",
    reason: "Ogni pezzo è tagliato per un punto preciso della casa.",
  },
  {
    id: "codifica",
    Icon: Tag,
    title: "Ogni pezzo ha il suo codice.",
    label: "Codifica",
    text: "Su ogni pezzo mettiamo un'etichetta con il suo codice. Così sai sempre qual è.",
    reason:
      "Non ricevi un mucchio di pezzi tagliati, ma un lavoro già in ordine.",
  },
  {
    id: "planimetria",
    Icon: Map,
    title: "Dal codice alla posizione.",
    label: "Planimetria di posa",
    text: "Con i pezzi ricevi la planimetria di posa, su carta. Per ogni codice ti dice dove va il pezzo.",
    reason:
      "Si parte dalle stanze e si torna alle stanze: ogni pezzo al suo posto.",
  },
];
const faqs = [
  {
    question: "Che cos'è il sistema EasyBatt?",
    answer:
      "È il nostro modo di preparare il battiscopa. Misuriamo le stanze con un misuratore laser robotico, il software calcola i tagli e la troncatrice a controllo numerico taglia i pezzi. Ogni pezzo ha un codice e arriva con la planimetria di posa.",
  },
  {
    question: "Perché usate il laser?",
    answer:
      "Perché misura ogni stanza com'è davvero, angoli compresi. Da queste misure partono tutti i tagli.",
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
            Il laser misura, il software calcola, la troncatrice taglia. Codici
            e planimetria ti dicono dove va ogni pezzo.
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
              {id === "rilievo" ? (
                <AngleDiagram />
              ) : (
                <Icon size={38} strokeWidth={1.5} aria-hidden="true" />
              )}
              <h3>Perché conta</h3>
              <p>{reason}</p>
              {id === "software" && (
                <ul className={styles.plainList}>
                  <li>Calcola ogni taglio al decimo di grado.</li>
                  <li>Dà un codice a ogni pezzo.</li>
                  <li>Prepara la planimetria di posa.</li>
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
            Misure, calcolo, taglio e codici: tutto questo succede prima che il
            battiscopa arrivi in cantiere. È lì che nasce il valore.
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
              Il sistema nasce dall&apos;esperienza di Falegnameria Spini nel
              lavoro su misura. Abbiamo guardato il lavoro in cantiere e ci siamo
              chiesti cosa si poteva preparare prima.
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
                Il taglio lo facciamo noi, in laboratorio. In casa niente
                polvere e rumore del taglio.
              </p>
            </div>
            <div>
              <Tag size={28} aria-hidden="true" />
              <h3>Pezzi organizzati</h3>
              <p>Codice e planimetria ti dicono dove va ogni pezzo.</p>
            </div>
            <div>
              <Clock3 size={28} aria-hidden="true" />
              <h3>Più tempo per la posa</h3>
              <p>Pensi solo a montare, e a farlo bene.</p>
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
        lead="Il modo migliore per capirlo è vederlo su un lavoro vero."
        text="Hai un lavoro in programma? Raccontacelo e vediamo insieme come preparare il battiscopa prima del cantiere."
        action="Prova il sistema EasyBatt"
      />
    </MarketingShell>
  );
}
