"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { getCustomerAuth } from "@/lib/easybatt-auth-client";

export function AccountLink() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    let active = true;
    getCustomerAuth().then(({ settings }) => { if (active) setEnabled(settings.enabled); }).catch(() => {});
    return () => { active = false; };
  }, []);
  if (!enabled) return null;
  return <Link href="/account" className="inline-flex min-h-11 w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#72E6E2] hover:bg-white/5"><UserRound size={18} />Account</Link>;
}
