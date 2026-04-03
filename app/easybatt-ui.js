import { cn } from "@/lib/utils";

const cardBase =
  "rounded-[28px] border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.24)]";

export const eb = {
  pageShell: "mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-5",
  topNav:
    "mb-4 flex flex-col gap-3 rounded-[30px] border border-white/6 bg-white/[0.025] px-4 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-5",
  topNavIcon:
    "flex h-9 w-9 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] text-[#72E6E2]",
  navGroup:
    "flex flex-wrap items-center gap-1.5 rounded-full border border-white/8 bg-[#121418]/55 p-1 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
  navGhost:
    "rounded-full border border-transparent px-3.5 text-[#B9C1CA] transition-all duration-200 hover:bg-white/[0.06] hover:text-white",
  navActiveTeal:
    "rounded-full border border-[#10B7B3]/16 bg-[#10B7B3]/12 px-3.5 font-medium text-[#C8FAF8] transition-all duration-200 hover:bg-[#10B7B3]/18",
  navActiveYellow:
    "rounded-full border border-[#F4CC18]/16 bg-[#F4CC18]/12 px-3.5 font-medium text-[#F9E796] transition-all duration-200 hover:bg-[#F4CC18]/18",
  badgeTeal:
    "rounded-full border border-[#10B7B3]/35 bg-[#10B7B3]/12 px-4 py-1.5 text-[#A7F3F0] transition-colors duration-200 hover:bg-[#10B7B3]/16",
  badgeYellow:
    "rounded-full border border-[#F4CC18]/35 bg-[#F4CC18]/10 px-4 py-1.5 text-[#F8E58A] transition-colors duration-200 hover:bg-[#F4CC18]/14",
  badgeNeutral:
    "rounded-full border border-white/15 bg-white/6 px-4 py-1.5 text-[#D6DBE0] transition-colors duration-200 hover:bg-white/8",
  hero:
    "grid gap-4 rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(15,175,169,0.12),_transparent_34%),linear-gradient(135deg,_rgba(20,23,29,0.98),_rgba(29,32,38,0.98))] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:p-6",
  card: cn(cardBase, "bg-[#1C1F24]"),
  cardInteractive: cn(
    cardBase,
    "bg-[#1C1F24] transition-all duration-300 hover:-translate-y-1 hover:border-white/18 hover:shadow-[0_22px_56px_rgba(0,0,0,0.28)]",
  ),
  cardInset: "rounded-[24px] border border-white/10 bg-[#17191D] p-4",
  cardInsetSoft: "rounded-[24px] border border-white/10 bg-white/[0.04] p-4",
  statInset: "rounded-[20px] border border-white/10 bg-[#1F2329] p-3",
  primaryButtonTeal:
    "h-11 rounded-2xl border border-[#10B7B3]/20 bg-[#10B7B3] text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#22C7C2] sm:text-[15px]",
  primaryButtonYellow:
    "h-11 rounded-2xl border border-[#F4CC18]/20 bg-[#F4CC18] text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F7D742] sm:text-[15px]",
  outlineButton:
    "h-11 rounded-2xl border border-white/10 bg-transparent text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.06] sm:text-[15px]",
  summaryPanel:
    "rounded-[24px] border border-[#10B7B3]/20 bg-gradient-to-br from-[#17191D] via-[#1B1E23] to-[#083331] p-5 text-white",
};
