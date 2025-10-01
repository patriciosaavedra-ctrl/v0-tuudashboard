export interface Order {
  id: number
  shp: string
  nombreCliente: string
  rutCliente: string
  telefono: string
  puntoTUU: string
  comuna: string
  cantidadProS2: number
  cantidadMiniS: number
  fundasProS2: number
  pistolaLectora: number
  chipDatos: string
  rollos: number
  stickers: number
  fechaPedido: string
  estado: "pendiente" | "pendiente-preparacion" | "preparado" | "retirado"
  pdaStatus?: string
  preparado: boolean
  emailEnviado: boolean
  retirado: boolean
  fechaSeries?: string
  fechaPreparado?: string
  fechaRetiro?: string
  fechaEmail?: string
  seriesProS2?: string[]
  seriesMiniS?: string[]
  seriesChip?: string[]
}

export interface User {
  id: number
  nombre: string
  email: string
  rol: "Admin" | "Comercio"
  puntoTUU: string | null
  activo: boolean
}

export interface PuntoTUU {
  id: number
  nombre: string
  region: string
  comuna: string
  direccion: string
  telefono: string
  activo: boolean
}

export interface StockPunto {
  punto: string
  proS2: number
  miniS: number
  chipsEntel: number
  chipsMovistar: number
  rollos: number
  stickers: number
}

export interface Billing {
  id: number
  puntoTUU: string
  periodo: string // formato: "YYYY-MM" (ej: "2024-09")
  fechaGeneracion: string // fecha cuando se generó la fila (1er día hábil del mes)
  fechaPago?: string // fecha cuando se adjuntó el PDF
  estado: "pendiente" | "pagado"
  cantidadRetiros: number // cantidad de retiros del mes
  pdfUrl?: string // URL del PDF adjunto
}
