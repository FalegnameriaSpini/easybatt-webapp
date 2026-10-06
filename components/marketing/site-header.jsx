"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AccountLink } from "@/components/account-link";
import { marketingNavigation } from "@/lib/easybatt-marketing.mjs";
import styles from "./marketing.module.css";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const button = useRef(null);
  const pathname = usePathname();
  function closeOnEscape(event) {
    if (event.key === "Escape" && open) {
      setOpen(false);
      button.current?.focus();
    }
  }
  return (
    <header className={styles.header} onKeyDown={closeOnEscape}>
      <a className={styles.skipLink} href="#contenuto">
        Vai al contenuto
      </a>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <Link
          href="/"
          aria-label="EasyBatt, home"
          className={styles.logo}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/Logo_easybatt_trasp.png"
            alt="EasyBatt - Battiscopa pronti da posare. Senza tagli sul posto"
            width={1331}
            height={401}
            priority
          />
        </Link>
        <button
          ref={button}
          type="button"
          className={styles.menuButton}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          aria-controls="marketing-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav
          id="marketing-navigation"
          aria-label="Navigazione principale"
          className={`${styles.navigation} ${open ? styles.navigationOpen : ""}`}
          onClick={() => setOpen(false)}
        >
          {marketingNavigation.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              aria-current={href === pathname ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          <Link href="/quanto-mi-costa" className={styles.priceLink}>
            Quanto mi costa
          </Link>
          <AccountLink />
          <Link href="/#prova" className={styles.headerCta}>
            Prova EasyBatt <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
