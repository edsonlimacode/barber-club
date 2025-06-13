export function currencyMask(value: string) {
  const valueWithOutCaracteres = value.replace(/\D/g, "")

  if (valueWithOutCaracteres) {
    let value = (parseInt(valueWithOutCaracteres) / 100).toFixed(2)

    value = value.replace(".", ",")
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return value
  }
}

export function formatValueToDecimal(value: string) {
  return value.replace(/\./g, "").replace(",", ".")
}

export function currencyMaskToEdit(value: number) {
  return value
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value)
}
