export function formatNaira(amount: number, decimals = 0, includeSymbol = true) {
  const formatted = amount.toLocaleString('en-NG', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return includeSymbol ? `₦${formatted}` : formatted
}
