import Link from "next/link";
import {
  ArrowRight,
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
    "Scopri il metodo EasyBatt: rilievo laser, software proprietario, lavorazione CNC, codifica e planimetria. Battiscopa preparati prima del cantiere e pronti da posare.",
};

export function EasyBattComeFunzionaPage() {
  return (
    <MarketingShell>
      <MarketingHero method />
      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Il principio"
            title="Un processo diverso. Il tuo mestiere resta il tuo."
          >
            Misurazione, preparazione e taglio richiedono lavoro. EasyBatt li
            organizza prima della posa, per permetterti di concentrarti sul
            montaggio.
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
        <div className={`${styles.container} ${styles.systemLayout}`}>
          <div>
            <SectionHeading
              eyebrow="Il sistema EasyBatt"
              title="Il cuore del metodo è il software."
            >
              Tra il rilievo dell&apos;ambiente e la lavorazione c&apos;è un
              sistema sviluppato per elaborare e organizzare i dati. Non
              soltanto un servizio di taglio, ma un processo che collega misure,
              produzione, codifica e posa.
            </SectionHeading>
            <p className={styles.lead}>
              Tecnologia dietro le quinte. Semplicità quando arriva il momento
              di posare.
            </p>
          </div>
          <ul className={styles.systemList}>
            <li>
              <ScanLine aria-hidden="true" />
              <div>
                <h3>Dal rilievo</h3>
                <p>
                  Acquisiamo le informazioni dell&apos;ambiente in cui il
                  battiscopa verrà installato.
                </p>
              </div>
            </li>
            <li>
              <Workflow aria-hidden="true" />
              <div>
                <h3>Al progetto</h3>
                <p>
                  Il software elabora i dati e organizza le informazioni
                  necessarie per i singoli elementi.
                </p>
              </div>
            </li>
            <li>
              <Settings2 aria-hidden="true" />
              <div>
                <h3>Alla produzione</h3>
                <p>
                  La lavorazione CNC prepara i pezzi sulla base del progetto.
                </p>
              </div>
            </li>
            <li>
              <Map aria-hidden="true" />
              <div>
                <h3>Alla posa</h3>
                <p>
                  Codifica e planimetria collegano il singolo elemento alla sua
                  posizione.
                </p>
              </div>
            </li>
          </ul>
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
              artigianale, rilievo digitale, software proprietario e lavorazione
              CNC.
            </p>
            <Link href="/#chi-siamo" className={styles.sectionLink}>
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
              <h3>Battiscopa preparati</h3>
              <p>
                Tagliati sulla base del rilievo e organizzati per il montaggio.
              </p>
            </div>
            <div>
              <Tag size={28} aria-hidden="true" />
              <h3>Pezzi codificati</h3>
              <p>
                Ogni elemento ha un riferimento per facilitarne il
                riconoscimento.
              </p>
            </div>
            <div>
              <Map size={28} aria-hidden="true" />
              <h3>Planimetria di posa</h3>
              <p>
                Una guida per individuare la posizione dei pezzi
                nell&apos;ambiente.
              </p>
            </div>
          </div>
          <p className={styles.supplyNote}>
            La fornitura del battiscopa è opzionale. Se disponi già del
            materiale, ne valutiamo compatibilità, ritiro e consegna prima di
            confermare il lavoro.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Il risultato sul posto"
            title="Identifichi il pezzo. Ti concentri sulla posa."
          >
            Il lavoro svolto prima riduce le attività da organizzare in
            cantiere. Niente normali operazioni di taglio del battiscopa
            nell&apos;immobile significa evitare la polvere e il rumore generati
            da questa lavorazione.
          </SectionHeading>
          <Link href="/quanto-mi-costa" className={styles.sectionLink}>
            Calcola una stima per il tuo lavoro{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <FaqSection items={methodFaqs} title="Il metodo, senza dubbi." />
      <ProjectContact />
    </MarketingShell>
  );
}
export default EasyBattComeFunzionaPage;
