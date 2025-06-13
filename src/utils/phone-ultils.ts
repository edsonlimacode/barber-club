export function phoneMask(value: string) {
  value = value.replace(/\D/g, "")

  value = value.slice(0, 11)

  value = value.replace(/^(\d{2})(\d)/, "($1) $2")
  value = value.replace(/(\d{5})(\d)/, "$1-$2")

  return value
}

export function formatPhone(value: string) {
  value = value.replace(/\D/g, "")

  return value
}
