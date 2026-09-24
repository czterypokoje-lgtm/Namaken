import { CallButton, WhatsAppButton } from "@/components/CallWhatsAppButtons";

export function MobileStickyBar({ locale = "nl" }: { locale?: "nl" | "en" }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-navy-band p-2 text-sm sm:hidden [&_a]:!px-2 [&_a]:!py-2.5 [&_a]:whitespace-nowrap">
      <CallButton className="flex-1 !text-xs" locale={locale} />
      <WhatsAppButton className="flex-1 !text-xs" locale={locale} />
    </div>
  );
}
