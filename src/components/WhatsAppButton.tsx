interface WhatsAppButtonProps {
  message?: string
  label?: string
  className?: string
}

import { WHATSAPP_PHONE } from '../config/contacts'


export default function WhatsAppButton({ message, label = 'Chat on WhatsApp', className = '' }: WhatsAppButtonProps) {
  const encodedMessage = message ? encodeURIComponent(message) : ''
  const url = message
    ? `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`
    : `https://wa.me/${WHATSAPP_PHONE}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600 ${className}`}
    >
      <span>💬</span>
      <span>{label}</span>
    </a>
  )
}
