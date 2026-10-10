import Link from "next/link";
import { ArrowRight, House, PackageCheck, Timer } from "lucide-react";
import {
  MarketingShell,
  MarketingHero,
  SectionHeading,
  FaqSection,
} from "@/components/marketing/site-sections";
import { ProjectForm } from "@/components/marketing/project-form";
import styles from "@/components/marketing/marketing.module.css";
import formStyles from "@/components/marketing/project-form.module.css";

export const metadata = {
  title: "Prova EasyBatt | Raccontaci il tuo progetto",
  description:
    "Un lavoro concreto da valutare insieme: rilievo e preparazione del battiscopa per professionisti e privati, con fornitura opzionale. Brescia e provincia.",
};
const faqs = [
  {
    question: "Se vi scrivo, devo comprare per forza?",
    answer:
      "No. Prima guardiamo insieme il tuo lavoro e vediamo se EasyBatt va bene. Prova non vuol dire gratis: prezzo e condizioni li decidiamo insieme prima di iniziare.",
  },
  {
    question: "Devo sapere già i metri esatti?",
    answer: "No. Se non li sai, nel modulo scegli «Non lo so ancora».",
  },
  {
    question: "Serve una planimetria?",
    answer:
      "No. Le misure le prendiamo noi con il laser. Se hai già una planimetria della casa, puoi mandarcela quando ci sentiamo.",
  },
  {
    question: "Posso provarlo su un solo lavoro?",
    answer:
      "Sì. Raccontaci il lavoro e vediamo insieme se va bene per EasyBatt.",
  },
  {
    question: "In quali zone lavorate?",
    answer:
      "Per ora lavoriamo soprattutto a Brescia e provincia. Se il tuo lavoro è fuori zona, scrivici comunque: vediamo insieme se si può fare.",
  },
  {
    question: "Devo comprare anche il battiscopa?",
    answer:
      "No. Puoi comprarlo da noi oppure usare il tuo. Se usi il tuo, prima controlliamo insieme che vada bene e come farlo arrivare da noi.",
  },
  {
    question: "Che differenza c'è con Calcola il prezzo?",
    answer:
      "Calcola il prezzo ti dà un prezzo indicativo, da solo, senza lasciare i tuoi dati. Con Prova EasyBatt ci racconti un lavoro vero e ti ricontattiamo noi. Non serve aver calcolato il prezzo prima.",
  },
];
export default function ProjectPage() {
  return (
    <MarketingShell>
      <MarketingHero
        content={{
          eyebrow: "Parti da un lavoro reale",
          title: "Prova EasyBatt sul tuo prossimo lavoro.",
          description:
            "Raccontaci il lavoro: valutiamo insieme se EasyBatt può farti arrivare sul posto con battiscopa già tagliati, codificati e pronti da posare. Non devi cambiare il tuo modo di lavorare: parti da un lavoro e giudica il risultato.",
          href: "/come-funziona",
          action: "Come funziona",
          ctaHref: "#progetto",
          ctaLabel: "Raccontaci il progetto",
          ctaFirst: true,
        }}
      />
      <section className={`${styles.section} ${styles.brand}`}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Il risultato"
            title="Preparato prima. Pronto da posare."
          >
            EasyBatt sposta prima del cantiere una parte del lavoro che
            normalmente fai sul posto. Tu ricevi i battiscopa preparati per il
            tuo ambiente.
          </SectionHeading>
          <div className={styles.benefits}>
            <div>
              <Timer aria-hidden="true" />
              <h3>Niente taglio sul posto</h3>
              <p>
                Misurazione e taglio del battiscopa vengono fatti prima del
                cantiere.
              </p>
            </div>
            <div>
              <PackageCheck aria-hidden="true" />
              <h3>Materiale organizzato</h3>
              <p>
                Pezzi tagliati, codificati e accompagnati dalla planimetria di
                posa.
              </p>
            </div>
            <div>
              <House aria-hidden="true" />
              <h3>Meno polvere e rumore</h3>
              <p>
                Niente taglio nell&apos;immobile. Soprattutto quando il cantiere
                è la casa di qualcuno.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.light}`}>
        <div className={`${styles.container} ${styles.sectionIntro}`}>
          <SectionHeading
            eyebrow="Il sistema"
            title="Non solo battiscopa. Il lavoro già preparato."
          />
          <div>
            <p>
              Rilievo laser, software proprietario, troncatrice a controllo
              numerico, codifica e planimetria collegano l&apos;ambiente reale
              ai singoli pezzi. Il
              risultato: battiscopa su misura dell&apos;ambiente, già tagliati,
              codificati e accompagnati dalla planimetria di posa.
            </p>
            <Link href="/il-sistema" className={styles.textLink}>
              Entra nel sistema EasyBatt{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Prima valutiamo, poi decidiamo"
            title="Parti da un lavoro reale."
          />
          <ol className={formStyles.steps}>
            <li>
              <span>01</span>
              <h3>Raccontaci il progetto</h3>
              <p>Partiamo dalle informazioni che hai già a disposizione.</p>
            </li>
            <li>
              <span>02</span>
              <h3>Lo valutiamo insieme</h3>
              <p>
                Approfondiamo il lavoro e verifichiamo se è adatto a EasyBatt.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Organizziamo i passaggi</h3>
              <p>Se ci sono le condizioni, concordiamo come procedere.</p>
            </li>
          </ol>
        </div>
      </section>
      <section id="progetto" className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Non servono tutte le risposte"
            title="Raccontaci il progetto."
          >
            Lasciaci i tuoi recapiti e le informazioni che hai: ti ricontattiamo
            per una prima valutazione. Non serve registrarsi.
          </SectionHeading>
          <div className="mb-8">
            <Link href="/quanto-mi-costa" className={styles.textLink}>
              Cerchi solo una stima? Calcola il prezzo{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ProjectForm />
        </div>
      </section>
      <FaqSection items={faqs} title="Prima di raccontarci il lavoro." />
      <section className={styles.section}>
        <div className={`${styles.container} ${styles.sectionIntro}`}>
          <SectionHeading
            eyebrow="Chi segue la tua richiesta"
            title="Parlerai con chi EasyBatt lo ha costruito."
          />
          <div>
            <p>
              Nella fase di lancio le richieste sono seguite direttamente dal
              titolare. EasyBatt nasce dall&apos;esperienza di Falegnameria
              Spini: il tuo progetto viene valutato da chi conosce il sistema e
              il lavoro sul campo.
            </p>
            <Link href="/chi-siamo" className={styles.textLink}>
              Conosci EasyBatt <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
