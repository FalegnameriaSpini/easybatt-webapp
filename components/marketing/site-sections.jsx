import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ScanLine,
  Workflow,
  Settings2,
  Tag,
  Map,
  PackageCheck,
  Plus,
  Maximize2,
} from "lucide-react";
import {
  marketingMedia,
  processSteps,
  projectEmail,
} from "@/lib/easybatt-marketing.mjs";
import { SiteHeader } from "./site-header";
import styles from "./marketing.module.css";

const icons = {
  scan: ScanLine,
  workflow: Workflow,
  settings: Settings2,
  tag: Tag,
  map: Map,
  package: PackageCheck,
};
export function MarketingShell({ children, mobileContact = false }) {
  return (
    <div
      className={`${styles.site} ${mobileContact ? styles.withMobileContact : ""}`}
    >
      <SiteHeader mobileContact={mobileContact} />
      <main id="contenuto" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
export function ActionLink({ href, children, secondary = false }) {
  return (
    <Link
      href={href}
      className={secondary ? styles.secondaryButton : styles.primaryButton}
    >
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className={styles.sectionHeading}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <p className={styles.lead}>{children}</p>}
    </div>
  );
}
export function PhotoFigure({ media, className = "", sizes = "(max-width: 767px) 100vw, 50vw", caption = true }) {
  return (
    <figure className={`${styles.photoFigure} ${className}`}>
      <a
        href={media.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Apri immagine: ${media.alt} (nuova scheda)`}
        title="Apri immagine a piena risoluzione"
      >
        <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes={sizes} />
        <span className={styles.photoExpand} aria-hidden="true"><Maximize2 size={19} /></span>
      </a>
      {caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  );
}
// The H1 carries the promise of the page; yellow is reserved for the
// conversion action, so the explore link always uses the secondary style.
const homeHero = {
  eyebrow: "Per professionisti e imprese",
  title: "Battiscopa su misura, già tagliati e pronti da posare.",
  description: (
    <>
      EasyBatt rileva le stanze con il laser, taglia i battiscopa, li codifica
      e te li consegna con la planimetria di posa: la pianta delle stanze con
      i codici dei pezzi. <strong>Tu ti occupi della posa.</strong>
    </>
  ),
  href: "/come-funziona",
  action: "Scopri come funziona",
};
export function MarketingHero({ content }) {
  const copy = content ?? homeHero;
  const media = copy.media ?? marketingMedia.hero;
  const explore = (
    <ActionLink href={copy.href} secondary>
      {copy.action}
    </ActionLink>
  );
  const cta = (
    <ActionLink href={copy.ctaHref || "/prova-easybatt"}>
      {copy.ctaLabel || "Prova EasyBatt"}
    </ActionLink>
  );
  return (
    <section
      className={`${styles.hero} ${content ? styles.pageHero : ""} ${media.mobileAspectRatio ? styles.mobileFramedHero : ""}`}
      aria-labelledby="hero-title"
      style={media.mobileAspectRatio ? { "--hero-mobile-aspect-ratio": media.mobileAspectRatio } : undefined}
    >
      <div className={styles.heroMedia}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
          style={media.position ? { objectPosition: media.position } : undefined}
        />
      </div>
      <div className={`${styles.container} ${styles.heroContent}`}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h1 id="hero-title">{copy.title}</h1>
        <p className={styles.heroDescription}>{copy.description}</p>
        <div className={styles.actions}>
          {copy.ctaFirst ? cta : explore}
          {copy.ctaFirst ? explore : cta}
        </div>
      </div>
      <span className={styles.mediaCaption}>{media.caption}</span>
    </section>
  );
}
export function ProcessSteps({ detailed = false }) {
  return (
    <ol className={detailed ? styles.processDetailed : styles.processGrid}>
      {processSteps.map((step, index) => {
        const Icon = icons[step.icon];
        return (
          <li key={step.id} id={detailed ? step.id : undefined}>
            <div className={styles.stepTop}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3>{step.title}</h3>
            <p className={styles.stepSubtitle}>{step.subtitle}</p>
            {detailed && (
              <>
                <p className={styles.stepText}>{step.text}</p>
                <PhotoFigure media={marketingMedia[step.media]} caption={false} sizes="(max-width: 767px) 100vw, 33vw" />
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}
export function Comparison() {
  return (
    <div className={`${styles.comparison} ${styles.comparisonSteps}`}>
      <div>
        <p className={styles.eyebrow}>Oggi, per ogni pezzo</p>
        <p className={styles.comparisonFlow}>
          Misurare <ArrowRight aria-hidden="true" /> Segnare{" "}
          <ArrowRight aria-hidden="true" /> Tagliare{" "}
          <ArrowRight aria-hidden="true" /> Verificare{" "}
          <ArrowRight aria-hidden="true" /> Ritoccare{" "}
          <ArrowRight aria-hidden="true" /> Posare
        </p>
        <p>E poi si ricomincia con il pezzo successivo.</p>
      </div>
      <div>
        <p className={styles.eyebrow}>Con EasyBatt, per ogni pezzo</p>
        <p className={styles.comparisonFlow}>
          Identificare <ArrowRight aria-hidden="true" /> Posare
        </p>
        <p>
          Il taglio è già fatto. Codice e planimetria ti dicono dove va.
        </p>
      </div>
    </div>
  );
}
// Plan view of an internal corner measured at 93°: the two boards meet on
// the bisector, so each piece is cut at 46.5°. Coordinates are computed for
// walls at 180° and 87° from the corner at (400, 70), boards 18 units thick.
export function AngleDiagram() {
  return (
    <svg
      viewBox="0 0 480 400"
      role="img"
      aria-labelledby="angle-diagram-title"
      className={styles.angleDiagram}
    >
      <title id="angle-diagram-title">
        Schema: angolo interno di 93 gradi tra due muri. I due battiscopa si
        incontrano con un taglio in bisettrice di 46,5 gradi ciascuno.
      </title>
      <polygon
        className={styles.angleWall}
        points="20,40 428.5,40 446.8,390 416.8,390 400,70 20,70"
      />
      <polygon
        className={styles.angleBoard}
        points="40,70 400,70 382.9,88 40,88"
      />
      <polygon
        className={styles.angleBoard}
        points="400,70 415.7,369.6 397.7,370.5 382.9,88"
      />
      <path
        className={styles.angleArc}
        d="M 280 70 A 120 120 0 0 0 406.3 189.8"
      />
      <line
        className={styles.angleBisector}
        x1="400"
        y1="70"
        x2="241.7"
        y2="236.8"
      />
      <text x="236" y="172" textAnchor="middle" className={styles.angleValue}>
        93°
      </text>
      <text x="318" y="112" textAnchor="middle" className={styles.angleHalf}>
        46,5°
      </text>
      <text x="382" y="162" textAnchor="end" className={styles.angleHalf}>
        46,5°
      </text>
      <text x="44" y="60" className={styles.angleLabel}>
        muro
      </text>
      <text x="44" y="106" className={styles.angleLabel}>
        battiscopa
      </text>
    </svg>
  );
}
// The first objection posatori raise: real corners are rarely 90°.
export function AngleSection() {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} ${styles.systemLayout}`}>
        <div>
          <SectionHeading
            eyebrow="La domanda che ci fanno tutti"
            title="«Sì, ma gli angoli non sono tutti a 90°.»"
          >
            Lo sappiamo. Per questo il laser misura ogni angolo com&apos;è
            davvero. Il software calcola il taglio al decimo di grado e la
            troncatrice lo esegue.
          </SectionHeading>
          <p className={styles.keyLine}>
            Angolo di 93°? Ogni pezzo viene tagliato in bisettrice a 46,5°.
          </p>
          <Link href="/il-sistema" className={styles.sectionLink}>
            Entra nel sistema EasyBatt{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <figure className={styles.angleFigure}>
          <AngleDiagram />
          <figcaption>
            Schema: angolo interno rilevato a 93°, taglio in bisettrice.
          </figcaption>
        </figure>
      </div>
      <div
        className={`${styles.container} ${styles.systemLayout} ${styles.angleProof}`}
      >
        <PhotoFigure media={marketingMedia.troncatrice} caption={false} />
        <div>
          <p className={styles.eyebrow}>Nella realtà</p>
          <h3>Lo stesso angolo, dal software alla macchina.</h3>
          <p>
            Sull&apos;etichetta del pezzo F07 c&apos;è l&apos;angolo calcolato
            dal software: 42,5°. La troncatrice è impostata sullo stesso
            valore. Nessun taglio di prova.
          </p>
        </div>
      </div>
    </section>
  );
}
export function FaqSection({
  items,
  title = "Prima di iniziare, le tue domande.",
}) {
  return (
    <section id="domande" className={`${styles.section} ${styles.light}`}>
      <div className={`${styles.container} ${styles.faqLayout}`}>
        <SectionHeading eyebrow="Domande frequenti" title={title}>
          Un metodo nuovo merita risposte chiare.
        </SectionHeading>
        <div className={styles.faqList}>
          {items.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export function ProjectContact({
  title = "Hai un lavoro in programma?",
  lead = "Prova EasyBatt sul tuo prossimo battiscopa.",
  text = "Raccontaci il lavoro e vediamo insieme se EasyBatt va bene. Non servono le misure.",
  action = "Parlaci del tuo prossimo lavoro",
}) {
  return (
    <section id="prova" className={`${styles.section} ${styles.contact}`}>
      <div className={`${styles.container} ${styles.contactLayout}`}>
        <div>
          <p className={styles.eyebrow}>Prova EasyBatt</p>
          <h2>{title}</h2>
          <p className={styles.lead}>{lead}</p>
          {text && <p>{text}</p>}
        </div>
        <div className={styles.contactActions}>
          <ActionLink href="/prova-easybatt">{action}</ActionLink>
          <a className={styles.textLink} href={`mailto:${projectEmail}`}>
            {projectEmail}
          </a>
          <p>
            Scriverci non ti impegna ad acquistare. Prima valutiamo il lavoro e
            concordiamo il prezzo.
          </p>
          <Link className={styles.textLink} href="/quanto-mi-costa">
            Cerchi solo una stima? Calcola il prezzo{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerGrid}`}>
        <div>
          <Link href="/" className={styles.footerBrand}>
            Easy<span>Batt</span>
          </Link>
          <p>
            Battiscopa pronti da posare.
            <br />
            Senza tagli sul posto.
          </p>
        </div>
        <div>
          <p className={styles.footerTitle}>Il servizio</p>
          <Link href="/come-funziona">Come funziona</Link>
          <Link href="/per-professionisti">Per i professionisti</Link>
          <Link href="/il-sistema">Il sistema</Link>
          <Link href="/chi-siamo">Chi siamo</Link>
          <Link href="/quanto-mi-costa">Calcola il prezzo</Link>
        </div>
        <div>
          <p className={styles.footerTitle}>Parliamone</p>
          <a href={`mailto:${projectEmail}`}>{projectEmail}</a>
          <Link href="/prova-easybatt">Prova EasyBatt</Link>
          <p>Gussago, Brescia</p>
        </div>
      </div>
      <div className={`${styles.container} ${styles.footerLegal}`}>
        <p>EasyBatt è un marchio di Falegnameria Spini Gianluca e Marco snc.</p>
        <p>
          Via Benedetto Castelli 40/42, 25064 Gussago (BS) / P. IVA 03098310984
        </p>
      </div>
    </footer>
  );
}
