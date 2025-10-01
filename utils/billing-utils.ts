export function formatPeriodo(periodo: string): string {
  const [year, month] = periodo.split("-")
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]
  return `${monthNames[Number.parseInt(month) - 1]} ${year}`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function getBillingStatusBadge(estado: "pendiente" | "pagado") {
  if (estado === "pagado") {
    return "bg-green-100 text-green-800"
  }
  return "bg-yellow-100 text-yellow-800"
}

export function getBillingStatusText(estado: "pendiente" | "pagado") {
  if (estado === "pagado") {
    return "Pagado"
  }
  return "Pendiente"
}
