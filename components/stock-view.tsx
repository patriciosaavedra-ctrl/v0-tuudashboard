"use client"

import { Download, MapPin } from "lucide-react"
import type { StockPunto } from "../types/order"
import { puntoTUUMapping } from "../data/mock-data"

interface StockViewProps {
  puntosStock: StockPunto[]
  userRole: string
  selectedPunto: string
  filterStockPunto: string
  puntoTUUOptions: string[]
  onFilterStockPuntoChange: (punto: string) => void
  onOpenStockRequestModal: (item: any) => void
  isStockRequested: (producto: string, puntoTUU: string) => boolean
}

export function StockView({
  puntosStock,
  userRole,
  selectedPunto,
  filterStockPunto,
  puntoTUUOptions,
  onFilterStockPuntoChange,
  onOpenStockRequestModal,
  isStockRequested,
}: StockViewProps) {
  const filteredStock = puntosStock.filter((punto) => {
    if (userRole === "comercio") {
      return punto.punto === selectedPunto
    }
    if (filterStockPunto !== "todos") {
      return punto.punto === filterStockPunto
    }
    return true
  })

  const stockRows: Array<{
    producto: string
    cantidad: number
    puntoTUU: string
    lowStock: boolean
  }> = []

  filteredStock.forEach((punto) => {
    stockRows.push(
      { producto: "POS PRO 2", cantidad: punto.proS2, puntoTUU: punto.punto, lowStock: punto.proS2 < 10 },
      { producto: "POS MINI S", cantidad: punto.miniS, puntoTUU: punto.punto, lowStock: punto.miniS < 10 },
      {
        producto: "Chips Entel",
        cantidad: punto.chipsEntel,
        puntoTUU: punto.punto,
        lowStock: punto.chipsEntel < 15,
      },
      {
        producto: "Chips Movistar",
        cantidad: punto.chipsMovistar,
        puntoTUU: punto.punto,
        lowStock: punto.chipsMovistar < 15,
      },
      {
        producto: "Rollos Térmicos",
        cantidad: punto.rollos,
        puntoTUU: punto.punto,
        lowStock: punto.rollos < 30,
      },
      { producto: "Stickers", cantidad: punto.stickers, puntoTUU: punto.punto, lowStock: punto.stickers < 30 },
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Control de Stock</h2>
          <p className="text-gray-600 mt-1">
            {userRole === "admin" ? "Inventario de todos los puntos TUU" : `Inventario - ${selectedPunto}`}
          </p>
        </div>
      </div>

      {userRole === "admin" && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-4">
            <select
              value={filterStockPunto}
              onChange={(e) => onFilterStockPuntoChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos los puntos</option>
              {puntoTUUOptions.map((punto) => (
                <option key={punto} value={punto}>
                  {punto}
                </option>
              ))}
            </select>
            <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
              <Download size={20} />
              Exportar CSV
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre del Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
                {userRole === "admin" && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Punto TUU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comuna
                    </th>
                  </>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stockRows.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{row.producto}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-semibold ${row.lowStock ? "text-red-600" : "text-green-600"}`}>
                      {row.cantidad}
                    </span>
                  </td>
                  {userRole === "admin" && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <MapPin className="text-blue-600" size={18} />
                          <span className="text-sm text-gray-900">{row.puntoTUU}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {puntoTUUMapping[row.puntoTUU as keyof typeof puntoTUUMapping]?.comuna || "-"}
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {row.lowStock && !isStockRequested(row.producto, row.puntoTUU) && (
                      <button
                        onClick={() => onOpenStockRequestModal(row)}
                        className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded hover:bg-blue-50 transition text-xs font-medium"
                      >
                        Solicitar
                      </button>
                    )}
                    {row.lowStock && isStockRequested(row.producto, row.puntoTUU) && (
                      <span className="text-gray-600 text-xs font-medium">Stock solicitado</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
