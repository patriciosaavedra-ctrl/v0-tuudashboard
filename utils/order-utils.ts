import type { Order } from "../types/order"

export const getEstadoBadge = (estado: Order["estado"]) => {
  const badges = {
    pendiente: "bg-gray-100 text-gray-800",
    "pendiente-preparacion": "bg-yellow-100 text-yellow-800",
    preparado: "bg-blue-100 text-blue-800",
    retirado: "bg-green-100 text-green-800",
  }
  return badges[estado] || badges.pendiente
}

export const getEstadoText = (estado: Order["estado"]) => {
  const texts = {
    pendiente: "Pendiente Códigos",
    "pendiente-preparacion": "Pendiente Preparación",
    preparado: "Preparado",
    retirado: "Retirado",
  }
  return texts[estado] || "Pendiente Códigos"
}

export const getPdaStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    "configurar-manual": "Configurar manual",
    "riesgo-financiero": "Riesgo financiero: requiere verificación",
    "esperando-documentacion": "Esperando documentación adicional",
    "merchant-completo": "Merchant completo: requiere verificación",
    "activar-dispositivos": "Activar dispositivos",
    completado: "Completado",
  }
  return statusMap[status] || status
}

export const getPdaStatusBadge = (status: string) => {
  const badgeMap: Record<string, string> = {
    "configurar-manual": "bg-blue-100 text-blue-800",
    "riesgo-financiero": "bg-red-100 text-red-800",
    "esperando-documentacion": "bg-yellow-100 text-yellow-800",
    "merchant-completo": "bg-purple-100 text-purple-800",
    "activar-dispositivos": "bg-orange-100 text-orange-800",
    completado: "bg-green-100 text-green-800",
  }
  return badgeMap[status] || "bg-gray-100 text-gray-800"
}

export const requiresSerialNumbers = (order: Order) => {
  return order.cantidadProS2 > 0 || order.cantidadMiniS > 0
}

export const getBusinessDaysSincePrepared = (preparedDate: string) => {
  if (!preparedDate) return 0
  const today = new Date()
  const prepared = new Date(preparedDate)
  let days = 0
  const currentDay = new Date(prepared)
  while (currentDay <= today) {
    const dayOfWeek = currentDay.getDay()
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      days++
    }
    currentDay.setDate(currentDay.getDate() + 1)
  }
  return days
}

export const calculateAverageTime = (ordersList: Order[], fromState: string, toState: string) => {
  const relevantOrders = ordersList.filter((o) => {
    if (toState === "pendiente-preparacion" && !o.fechaSeries) return false
    if (toState === "preparado" && !o.fechaPreparado) return false
    if (toState === "retirado" && !o.fechaRetiro) return false

    if (fromState === "preparado" && toState === "preparado") {
      return o.estado === "preparado" && o.fechaPreparado
    }

    if (fromState === "pendiente" && toState === "pendiente-preparacion") {
      return o.estado === "pendiente-preparacion"
    }
    if (fromState === "pendiente-preparacion" && toState === "preparado") {
      return o.estado === "preparado"
    }
    if (fromState === "preparado" && toState === "retirado") {
      return o.estado === "retirado"
    }

    return false
  })

  if (relevantOrders.length === 0) return "0.0"

  const totalDays = relevantOrders.reduce((sum, order) => {
    let startDate, endDate

    if (fromState === "pendiente" && toState === "pendiente-preparacion") {
      startDate = new Date(order.fechaPedido)
      endDate = new Date(order.fechaSeries!)
    } else if (fromState === "pendiente-preparacion" && toState === "preparado") {
      startDate = new Date(order.fechaSeries!)
      endDate = new Date(order.fechaPreparado!)
    } else if (fromState === "preparado" && toState === "retirado") {
      startDate = new Date(order.fechaPreparado!)
      endDate = new Date(order.fechaRetiro!)
    } else {
      return sum
    }

    if (endDate < startDate) {
      endDate = startDate
    }

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    return sum + diffDays
  }, 0)

  return (totalDays / relevantOrders.length).toFixed(1)
}
