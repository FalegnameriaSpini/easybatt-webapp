import Link from "next/link";
import { ArrowRight, PackageCheck, Tag, Map } from "lucide-react";
import {
  MarketingShell,
  MarketingHero,
  SectionHeading,
  ProcessSteps,
  Comparison,
  FaqSection,
  ProjectContact,
} from "@/components/marketing/site-sections";
import { methodFaqs } from "@/lib/easybatt-marketing.mjs";
import styles from "@/components/marketing/marketing.module.css";

export const metadata = {
  title: "Come funziona EasyBatt | Dal rilievo alla posa",
  description:
    "Scopri il metodo EasyBatt: rilievo laser, software proprietario, troncatrice a controllo numerico (CNC), codifica e planimetria. Battiscopa preparati prima del cantiere e pronti da posare.",
};

export function EasyBattComeFunzionaPage() {
  return (
    <MarketingShell>
      <MarketingHero
        content={{
          eyebrow: "Il metodo EasyBatt",
          title:
            "Come funziona EasyBatt: dal rilievo al battiscopa pronto da posare.",
          description:
            "Rileviamo le stanze con il laser, il nostro software calcola i tagli e una troncatrice a controllo numerico taglia i battiscopa. Te li consegniamo codificati, con la planimetria di posa. Tu arrivi in cantiere e monti.",
          href: "#metodo",
          action: "Scopri il metodo",
        }}
      />
      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Il principio"
            title="Il tuo mestiere non cambia. La parte più lunga e faticosa la facciamo noi."
          >
            Misurare, segnare, tagliare, verificare, ritoccare: oggi lo fai in
            cantiere, un pezzo alla volta. Con EasyBatt lo facciamo noi, prima,
            in laboratorio. A te resta la posa.
          </SectionHeading>
          <Comparison />
        </div>
      </section>

      <section id="metodo" className={`${styles.section} ${styles.light}`}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Il metodo, in sei passaggi"
            title="Dall'ambiente reale al battiscopa pronto per il montaggio."
          >
            Ogni fase prepara quella successiva. Dalle informazioni raccolte sul
            posto ai pezzi che ricevi.
          </SectionHeading>
          <ProcessSteps detailed />
        </div>
      </section>

      <section id="sistema" className={styles.section}>
        <div className={`${styles.container} ${styles.sectionIntro}`}>
          <SectionHeading
            eyebrow="Il sistema EasyBatt"
            title="Il cuore del metodo è il software."
          />
          <div>
            <p className={styles.lead}>
              L&apos;abbiamo sviluppato noi. Prende le misure del laser, calcola
              ogni taglio al decimo di grado, dà un codice a ogni pezzo e
              prepara la planimetria di posa.
            </p>
            <p className={styles.keyLine}>
              Il sistema è digitale. Il risultato è analogico: pezzi tagliati e
              una planimetria su carta.
            </p>
            <Link href="/il-sistema" className={styles.sectionLink}>
              Approfondisci il sistema EasyBatt{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`}>
        <div className={`${styles.container} ${styles.sectionIntro}`}>
          <SectionHeading
            eyebrow="Esperienza e metodo"
            title="EasyBatt nasce dal lavoro, prima ancora che dalla tecnologia."
          />
          <div>
            <p className={styles.lead}>
              L&apos;esperienza di Falegnameria Spini ha portato a una domanda:
              possiamo preparare prima ciò che siamo abituati a fare sul posto?
            </p>
            <p className={styles.lead}>
              Da questa ricerca nasce un metodo che unisce esperienza
              artigianale, rilievo digitale, software proprietario e
              troncatrice a controllo numerico.
            </p>
            <Link href="/chi-siamo" className={styles.sectionLink}>
              Da dove nasce EasyBatt <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Cosa ricevi"
            title="Un lavoro preparato. Non soltanto pezzi tagliati."
          />
          <div className={styles.benefits}>
            <div>
              <PackageCheck size={28} aria-hidden="true" />
              <h3>Battiscopa già tagliati</h3>
              <p>Sulle misure della stanza, angoli compresi.</p>
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
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Il risultato sul posto"
            title="Identifichi il pezzo. Ti concentri sulla posa."
          >
            In cantiere non tagli: leggi il codice, guardi la planimetria e
            posi. E dentro casa niente polvere e rumore del taglio.
          </SectionHeading>
          <Link href="/quanto-mi-costa" className={styles.sectionLink}>
            Calcola una stima per il tuo lavoro{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <FaqSection items={methodFaqs} title="Il metodo, senza dubbi." />
      <ProjectContact
        title="Ora che sai come funziona, vediamolo sul tuo lavoro."
        lead="Hai un cantiere o una ristrutturazione in programma?"
        text="Raccontaci il progetto e verifichiamo insieme come applicare il metodo EasyBatt al battiscopa del tuo ambiente."
        action="Prova EasyBatt sul tuo prossimo lavoro"
      />
    </MarketingShell>
  );
}
export default EasyBattComeFunzionaPage;
