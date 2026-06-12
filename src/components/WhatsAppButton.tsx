interface WhatsAppButtonProps {
  message?: string
  label?: string
  className?: string
}

const PHONE_NUMBER = '2348034748216'

export default function WhatsAppButton({ message, label = 'Chat on WhatsApp', className = '' }: WhatsAppButtonProps) {
  const encodedMessage = message ? encodeURIComponent(message) : ''
  const url = message
    ? `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`
    : `https://wa.me/${PHONE_NUMBER}`

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
