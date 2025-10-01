"use client"

import { Calendar, Check, Download, MapPin, Package, Search } from "lucide-react"
import type { Order, PuntoTUU } from "../types/order"
import { getPdaStatusBadge, getPdaStatusText } from "../utils/order-utils"

interface OrdersViewProps {
  orders: Order[]
  userRole: string
  selectedPunto: string
  searchTerm: string
  filterPuntoTUU: string
  activePuntosTUU: PuntoTUU[]
  onSearchChange: (term: string) => void
  onFilterPuntoChange: (punto: string) => void
  onOrderSelect: (order: Order) => void
  onOpenSeriesModal: (order: Order) => void
  onOpenPreparadoModal: (order: Order) => void
  onOpenRetiradoModal: (order: Order) => void
}

export function OrdersView({
  orders,
  userRole,
  selectedPunto,
  searchTerm,
  filterPuntoTUU,
  activePuntosTUU,
  onSearchChange,
  onFilterPuntoChange,
  onOrderSelect,
  onOpenSeriesModal,
  onOpenPreparadoModal,
  onOpenRetiradoModal,
}: OrdersViewProps) {
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shp.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.rutCliente.includes(searchTerm)
      const matchesPuntoFilter = filterPuntoTUU === "todos" || order.puntoTUU === filterPuntoTUU
      const matchesPunto = userRole === "admin" || order.puntoTUU === selectedPunto

      return matchesSearch && matchesPuntoFilter && matchesPunto
    })
    .sort((a, b) => {
      const statusOrder = {
        pendiente: 1,
        "pendiente-preparacion": 2,
        preparado: 3,
        retirado: 4,
      }
      return statusOrder[a.estado] - statusOrder[b.estado]
    })

  const pendingOrders = filteredOrders.filter((o) => o.estado === "pendiente")
  const inPreparationOrders = filteredOrders.filter((o) => o.estado === "pendiente-preparacion")
  const readyOrders = filteredOrders.filter((o) => o.estado === "preparado")
  const completedOrders = filteredOrders.filter((o) => o.estado === "retirado")

  const getDaysSince = (date: string) => {
    const orderDate = new Date(date)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - orderDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const OrderCard = ({ order }: { order: Order }) => {
    const daysSince = getDaysSince(order.fechaPedido)
    const isUrgent = daysSince > 3 && order.estado !== "retirado"

    return (
      <div
        className={`bg-white rounded-lg shadow-sm border-2 p-4 hover:shadow-md transition cursor-pointer ${
          isUrgent ? "border-red-300" : "border-gray-200"
        }`}
        onClick={() => onOrderSelect(order)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-sm">{order.nombreCliente}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{order.shp}</p>
          </div>
          {isUrgent && (
            <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-medium">Urgente</span>
          )}
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Calendar size={14} />
            <span>{order.fechaPedido}</span>
            <span className="text-gray-400">•</span>
            <span>
              Hace {daysSince} {daysSince === 1 ? "día" : "días"}
            </span>
          </div>

          {userRole === "admin" && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MapPin size={14} />
              <span>{order.puntoTUU}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Package size={14} />
            <span>
              {order.cantidadProS2 > 0 && `${order.cantidadProS2} PRO 2`}
              {order.cantidadProS2 > 0 &&
                (order.cantidadMiniS > 0 || order.fundasProS2 > 0 || order.pistolaLectora > 0) &&
                " + "}
              {order.cantidadMiniS > 0 && `${order.cantidadMiniS} MINI S`}
              {order.cantidadMiniS > 0 && (order.fundasProS2 > 0 || order.pistolaLectora > 0) && " + "}
              {order.fundasProS2 > 0 && `${order.fundasProS2} Fundas`}
              {order.fundasProS2 > 0 && order.pistolaLectora > 0 && " + "}
              {order.pistolaLectora > 0 && `${order.pistolaLectora} Pistola`}
            </span>
          </div>

          {userRole === "admin" && order.pdaStatus && (
            <div className="pt-2 border-t border-gray-100">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPdaStatusBadge(order.pdaStatus)}`}>
                PDA-{getPdaStatusText(order.pdaStatus)}
              </span>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-gray-100">
          {order.estado === "pendiente" && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onOpenSeriesModal(order)
              }}
              className="w-full bg-purple-600 text-white text-xs py-2 rounded-lg hover:bg-purple-700 transition font-medium"
            >
              Agregar Series
            </button>
          )}

          {order.estado === "pendiente-preparacion" && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onOpenPreparadoModal(order)
              }}
              className="w-full bg-green-600 text-white text-xs py-2 rounded-lg hover:bg-green-700 transition font-medium"
            >
              Marcar Preparado
            </button>
          )}

          {order.estado === "preparado" && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onOpenRetiradoModal(order)
              }}
              className="w-full bg-orange-600 text-white text-xs py-2 rounded-lg hover:bg-orange-700 transition font-medium"
            >
              Marcar Retirado
            </button>
          )}

          {order.estado === "retirado" && (
            <div className="flex items-center justify-center gap-2 text-green-600 text-xs font-medium">
              <Check size={14} />
              <span>Completado</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h2>
          <p className="text-gray-600 mt-1">Vista de flujo de trabajo para gestión de pedidos</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
          <Download size={20} />
          Exportar
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre, RUT o código..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {userRole === "admin" && (
            <select
              value={filterPuntoTUU}
              onChange={(e) => onFilterPuntoChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos los puntos TUU</option>
              {activePuntosTUU.map((punto) => (
                <option key={punto.nombre} value={punto.nombre}>
                  {punto.nombre}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              Pendiente Códigos
            </h3>
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
              {pendingOrders.length}
            </span>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {pendingOrders.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No hay pedidos pendientes</p>
            ) : (
              pendingOrders.map((order) => <OrderCard key={order.id} order={order} />)
            )}
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              Pendiente Preparación
            </h3>
            <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
              {inPreparationOrders.length}
            </span>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {inPreparationOrders.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No hay pedidos en preparación</p>
            ) : (
              inPreparationOrders.map((order) => <OrderCard key={order.id} order={order} />)
            )}
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              Preparado
            </h3>
            <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
              {readyOrders.length}
            </span>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {readyOrders.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No hay pedidos preparados</p>
            ) : (
              readyOrders.map((order) => <OrderCard key={order.id} order={order} />)
            )}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              Retirado
            </h3>
            <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
              {completedOrders.length}
            </span>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {completedOrders.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No hay pedidos retirados</p>
            ) : (
              completedOrders.map((order) => <OrderCard key={order.id} order={order} />)
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
