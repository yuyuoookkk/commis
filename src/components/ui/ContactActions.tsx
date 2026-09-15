"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { WECHAT_ID, waLink } from "@/lib/contact"
import WhatsAppIcon from "@/components/ui/WhatsAppIcon"

export default function ContactActions({ message, copiedLabel }: { message: string; copiedLabel?: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2.5 rounded-lg bg-[#25D366] px-6 py-3.5 font-semibold text-white transition-all hover:brightness-110"
        >
          <WhatsAppIcon className="h-5 w-5 fill-current" />
          WhatsApp
        </a>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(WECHAT_ID)
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
          }}
          className="flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-[#07C160] px-6 py-3.5 font-semibold text-white transition-all hover:brightness-110"
        >
          <MessageCircle className="h-5 w-5" />
          {copied ? copiedLabel ?? "ID Copied!" : "WeChat"}
        </button>
      </div>
      <p className="mt-4 text-center text-xs text-white/40">
        WeChat ID: <span className="font-mono text-white/60">{WECHAT_ID}</span>
      </p>
    </div>
  )
}
