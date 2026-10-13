import Link from "next/link";
import { ArrowRight, Clock3, PackageCheck, Tag, Map } from "lucide-react";
import {
  MarketingShell,
  MarketingHero,
  SectionHeading,
  Comparison,
  AngleSection,
  FaqSection,
  ProjectContact,
} from "@/components/marketing/site-sections";
import styles from "@/components/marketing/marketing.module.css";

export const metadata = {
  title: "EasyBatt per professionisti | Battiscopa pronti da posare",
  description:
    "Per posatori, parquetisti, falegnami, imprese e rivenditori. Rilievo e preparazione del battiscopa prima del cantiere, con fornitura opzionale. Sede a Gussago (Brescia).",
};

const professions = [
  {
    id: "posatori",
    title: "Posatori e parquetisti",
    benefit: "Più tempo per la posa.",
    text: "Il battiscopa arriva già tagliato e codificato. Niente misure e tagli pezzo per pezzo: in cantiere pensi solo alla posa.",
  },
  {
    id: "falegnami",
    title: "Falegnami",
    benefit: "Il battiscopa lo prepariamo noi.",
    text: "Spesso il battiscopa è solo una parte del tuo lavoro. Noi misuriamo, tagliamo e codifichiamo i pezzi: tu li monti e passi al resto.",
  },
  {
    id: "imprese",
    title: "Imprese e ristrutturatori",
    benefit: "Una finitura più semplice da gestire.",
    text: "In una ristrutturazione lavorano tante persone, con tempi stretti. Con i battiscopa già tagliati, dentro casa c'è un lavoro in meno da organizzare.",
  },
  {
    id: "rivenditori",
    title: "Rivenditori e showroom",
    benefit: "Un servizio in più per i tuoi clienti.",
    text: "Oltre al battiscopa, puoi offrire la misura e il taglio. Il tuo cliente riceve i pezzi pronti da posare. Come collaborare lo decidiamo insieme.",
  },
];
const faqs = [
  {
    question: "EasyBatt è solo per i posatori?",
    answer:
      "No. È anche per parquetisti, falegnami, imprese di ristrutturazione, rivenditori e showroom: per chi posa il battiscopa e per chi lo vende.",
  },
  {
    question: "Devo cambiare il mio modo di posare?",
    answer:
      "No. Noi lavoriamo prima: misure, taglio, codici. La posa la fai tu, come sempre.",
  },
  {
    question: "Mi conviene?",
    answer:
      "Dipende dal lavoro. Quando fai i conti, non guardare solo il prezzo del battiscopa: conta anche il tempo per misurare, tagliare e ritoccare in cantiere. Con EasyBatt quel tempo lo usi per posare.",
  },
  {
    question: "Posso usare il mio battiscopa?",
    answer:
      "Sì. Prima controlliamo insieme che vada bene e come farlo arrivare da noi. Ti diciamo anche se ci sono costi di trasporto.",
  },
  {
    question: "Sono un rivenditore: posso proporre EasyBatt ai miei clienti?",
    answer:
      "Sì. Puoi offrire ai tuoi clienti il battiscopa già tagliato e pronto da posare. Come collaborare lo decidiamo insieme.",
  },
  {
    question: "In quali zone lavorate?",
    answer:
      "Siamo a Gussago, in provincia di Brescia. Lavoriamo soprattutto in zona, ma per i lavori più grandi andiamo volentieri anche più lontano: scrivici e vediamo insieme.",
  },
  {
    question: "Posso provarlo su un solo lavoro?",
    answer:
      "Sì. Raccontaci il lavoro e vediamo insieme se va bene per EasyBatt. Scriverci non ti impegna ad acquistare e non serve registrarti. Prima valutiamo il lavoro e concordiamo il prezzo.",
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
            "Rileviamo le stanze con il laser, tagliamo i battiscopa, li codifichiamo e te li consegniamo con la planimetria di posa. In cantiere pensi solo a quello che sai fare meglio: posare.",
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
            title="La posa resta tua. Il taglio lo facciamo noi."
          >
            L&apos;esperienza e la qualità del lavoro restano nelle tue mani. Noi
            prepariamo i pezzi: misure, tagli, codici e planimetria di posa.
          </SectionHeading>
          <p className={styles.keyLine}>
            Non ti sostituiamo. Ti semplifichiamo il lavoro.
          </p>
          <h3>Per ogni pezzo, quante cose devi fare prima di montarlo?</h3>
          <Comparison />
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Per il tuo mestiere"
            title="Diverse esigenze. Un solo sistema."
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
              Misurare, segnare, tagliare, verificare, ritoccare: per ogni pezzo
              ci vuole tempo. E il tempo è un costo.
            </p>
            <p>
              Quando confronti i prezzi, conta anche il tempo che con EasyBatt
              non passi più a tagliare in cantiere.
            </p>
            <Link href="/prova-easybatt" className={styles.sectionLink}>
              Vediamolo sul tuo prossimo lavoro{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Un vantaggio anche per il tuo cliente"
            title="Il taglio resta fuori. Anche polvere e rumore."
          >
            Il battiscopa arriva già tagliato: non serve la zona di taglio
            dentro casa. È un vantaggio che il tuo cliente vede, soprattutto in
            case abitate, uffici e negozi.
          </SectionHeading>
          <p>Meno polvere, meno rumore, meno disagio.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Cosa ricevi"
            title="Tutto pronto per la posa."
          />
          <div className={styles.benefits}>
            <div>
              <PackageCheck size={28} aria-hidden="true" />
              <h3>Battiscopa già tagliati</h3>
              <p>Sulle misure di ogni stanza, angoli compresi.</p>
            </div>
            <div>
              <Tag size={28} aria-hidden="true" />
              <h3>Pezzi codificati</h3>
              <p>Ogni pezzo ha il suo codice.</p>
            </div>
            <div>
              <Map size={28} aria-hidden="true" />
              <h3>Planimetria di posa</h3>
              <p>Su carta. Ti dice dove va ogni pezzo.</p>
            </div>
          </div>
          <p className={styles.supplyNote}>
            Il battiscopa puoi comprarlo da noi oppure usare il tuo. Se usi il
            tuo, prima di tagliarlo controlliamo insieme che vada bene.
          </p>
          <Link href="/come-funziona" className={styles.sectionLink}>
            Scopri come funziona <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <AngleSection />
      <FaqSection items={faqs} title="Le domande dei professionisti." />
      <ProjectContact
        title="Il modo migliore per capire EasyBatt? Provarlo sul tuo lavoro."
        lead="Hai un lavoro in programma? Raccontacelo."
        text="Vediamo insieme se EasyBatt va bene per il tuo lavoro. Non servono le misure."
        action="Prova EasyBatt sul tuo prossimo lavoro"
      />
    </MarketingShell>
  );
}
