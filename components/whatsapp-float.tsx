"use client";

import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/5551998694945?text=Quero%20saber%20mais%3F";

export function WhatsappFloat() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      className="group fixed bottom-[26px] right-[26px] z-[80] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(0,0,0,0.35)] max-[560px]:bottom-[18px] max-[560px]:right-[18px] max-[560px]:h-[52px] max-[560px]:w-[52px]"
    >
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
      <span className="pointer-events-none absolute right-[72px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border/10 bg-background-soft px-3.5 py-2 text-[0.82rem] text-foreground opacity-0 transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100 max-[560px]:hidden">
        Falar no WhatsApp
      </span>
      <svg viewBox="0 0 24 24" fill="white" className="relative h-7 w-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.85.5 3.646 1.447 5.213L2 22l4.937-1.404A9.937 9.937 0 0012.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.09c-1.62 0-3.209-.436-4.593-1.26l-.329-.196-3.06.87.87-2.994-.214-.34A8.075 8.075 0 013.91 12c0-4.463 3.63-8.09 8.091-8.09 4.462 0 8.09 3.627 8.09 8.09 0 4.463-3.628 8.09-8.09 8.09z" />
      </svg>
    </motion.a>
  );
}
