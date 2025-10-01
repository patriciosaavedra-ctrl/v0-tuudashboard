"use client"

import { Check, Clock, FileText, Package } from "lucide-react"
import type { Order } from "../types/order"
import {
  getEstadoBadge,
  getEstadoText,
  getBusinessDaysSincePrepared,
  calculateAverageTime,
  requiresSerialNumbers,
} from "../utils/order-utils"

interface DashboardViewProps {
  orders: Order[]
  userRole: string
  selectedPunto: string
  timePeriod: string
  customStartDate: string
  customEndDate: string
  onTimePeriodChange: (period: string) => void
  onCustomStartDateChange: (date: string) => void
  onCustomEndDateChange: (date: string) => void
}

export function DashboardView({
  orders,
  userRole,
  selectedPunto,
  timePeriod,
  customStartDate,
  customEndDate,
  onTimePeriodChange,
  onCustomStartDateChange,
  onCustomEndDateChange,
}: DashboardViewProps) {
  const getFilteredOrdersByPeriod = (ordersList: Order[]) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    switch (timePeriod) {
      case "today":
        return ordersList.filter((o) => {
          const orderDate = new Date(o.fechaPedido)
          orderDate.setHours(0, 0, 0, 0)
          return orderDate.getTime() === today.getTime()
        })
      case "week":
        const weekAgo = new Date(today)
        weekAgo.setDate(weekAgo.getDate() - 7)
        return ordersList.filter((o) => new Date(o.fechaPedido) >= weekAgo)
      case "month":
        const monthAgo = new Date(today)
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        return ordersList.filter((o) => new Date(o.fechaPedido) >= monthAgo)
      case "custom":
        if (!customStartDate || !customEndDate) return ordersList
        const start = new Date(customStartDate)
        const end = new Date(customEndDate)
        end.setHours(23, 59, 59, 999)
        return ordersList.filter((o) => {
          const orderDate = new Date(o.fechaPedido)
          return orderDate >= start && orderDate <= end
        })
      case "all":
      default:
        return ordersList
    }
  }

  const periodFilteredOrders = getFilteredOrdersByPeriod(
    userRole === "admin" ? orders : orders.filter((o) => o.puntoTUU === selectedPunto),
  )

  const stats = {
    pendienteCodigos: periodFilteredOrders.filter((o) => o.estado === "pendiente" && requiresSerialNumbers(o)).length,
    pendientePreparacion: periodFilteredOrders.filter((o) => o.estado === "pendiente-preparacion").length,
    preparados: periodFilteredOrders.filter((o) => o.estado === "preparado").length,
    retirados: periodFilteredOrders.filter((o) => o.estado === "retirado").length,
    total: periodFilteredOrders.length,
  }

  const avgTimeCodigos = calculateAverageTime(
    periodFilteredOrders.filter((o) => requiresSerialNumbers(o)),
    "pendiente",
    "pendiente-preparacion",
  )
  const avgTimePreparacion = calculateAverageTime(periodFilteredOrders, "pendiente-preparacion", "preparado")
  const avgTimePreparado = calculateAverageTime(periodFilteredOrders, "preparado", "retirado")

  const readyToPickupOrders = periodFilteredOrders
    .filter((order) => order.estado === "preparado")
    .sort((a, b) => {
      return new Date(a.fechaPreparado!).getTime() - new Date(b.fechaPreparado!).getTime()
    })
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-1">
            {userRole === "admin" ? "Vista general de todos los puntos TUU" : `Punto TUU ${selectedPunto}`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={timePeriod}
            onChange={(e) => onTimePeriodChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
          >
            <option value="today">Hoy</option>
            <option value="week">Última semana</option>
            <option value="month">Último mes</option>
            <option value="all">Todo el tiempo</option>
            <option value="custom">Personalizado</option>
          </select>

          {timePeriod === "custom" && (
            <div className="flex items-center gap-2 ml-2">
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => onCustomStartDateChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Fecha inicio"
              />
              <span className="text-gray-400">→</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => onCustomEndDateChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Fecha término"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gray-50 border-l-4 border-gray-500 rounded-lg p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-600 leading-tight min-h-[2.5rem] flex items-center">
                Pendiente Códigos
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2 leading-none">{stats.pendienteCodigos}</p>
              <p className="text-xs text-gray-500 mt-4 leading-tight">Promedio: {avgTimeCodigos} días</p>
            </div>
            <Clock className="text-gray-400 flex-shrink-0 mt-0.5" size={24} />
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-yellow-700 leading-tight min-h-[2.5rem] flex items-center">
                Pendiente Preparación
              </p>
              <p className="text-3xl font-bold text-yellow-900 mt-2 leading-none">{stats.pendientePreparacion}</p>
              <p className="text-xs text-yellow-600 mt-4 leading-tight">Promedio: {avgTimePreparacion} días</p>
            </div>
            <Package className="text-yellow-400 flex-shrink-0 mt-0.5" size={24} />
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-blue-700 leading-tight min-h-[2.5rem] flex items-center">
                Preparados
              </p>
              <p className="text-3xl font-bold text-blue-900 mt-2 leading-none">{stats.preparados}</p>
              <p className="text-xs text-blue-600 mt-4 leading-tight">Promedio: {avgTimePreparado} días</p>
            </div>
            <Check className="text-blue-400 flex-shrink-0 mt-0.5" size={24} />
          </div>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-green-700 leading-tight min-h-[2.5rem] flex items-center">
                Retirados
              </p>
              <p className="text-3xl font-bold text-green-900 mt-2 leading-none">{stats.retirados}</p>
              <p className="text-xs text-green-600 mt-4 leading-tight">En el período</p>
            </div>
            <Check className="text-green-400 flex-shrink-0 mt-0.5" size={24} />
          </div>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-purple-700 leading-tight min-h-[2.5rem] flex items-center">
                Total Pedidos
              </p>
              <p className="text-3xl font-bold text-purple-900 mt-2 leading-none">{stats.total}</p>
              <p className="text-xs text-purple-600 mt-4 leading-tight">En el período</p>
            </div>
            <FileText className="text-purple-400 flex-shrink-0 mt-0.5" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Pedidos Pendientes</h3>
        <div className="space-y-3">
          {periodFilteredOrders
            .filter((order) => order.estado === "pendiente" || order.estado === "pendiente-preparacion")
            .sort((a, b) => {
              if (a.estado === "pendiente" && b.estado === "pendiente-preparacion") return -1
              if (a.estado === "pendiente-preparacion" && b.estado === "pendiente") return 1
              return new Date(a.fechaPedido).getTime() - new Date(b.fechaPedido).getTime()
            })
            .slice(0, 5)
            .map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{order.nombreCliente}</p>
                  <p className="text-sm text-gray-600">
                    {order.shp} - {order.fechaPedido}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {userRole === "admin" && <span className="text-sm text-gray-600">{order.puntoTUU}</span>}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoBadge(order.estado)}`}>
                    {getEstadoText(order.estado)}
                  </span>
                </div>
              </div>
            ))}
          {periodFilteredOrders.filter(
            (order) => order.estado === "pendiente" || order.estado === "pendiente-preparacion",
          ).length === 0 && <p className="text-gray-500 text-center py-4">No hay pedidos pendientes en este período</p>}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Pedidos por Retirar</h3>
        <div className="space-y-3">
          {readyToPickupOrders.length > 0 ? (
            readyToPickupOrders.map((order) => {
              const businessDays = getBusinessDaysSincePrepared(order.fechaPreparado!)
              const isOverdue = businessDays > 3

              return (
                <div
                  key={order.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isOverdue ? "bg-red-50 border-2 border-red-300" : "bg-gray-50"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium ${isOverdue ? "text-red-900" : "text-gray-900"}`}>
                        {order.nombreCliente}
                      </p>
                      {isOverdue && (
                        <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                          +3 días
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${isOverdue ? "text-red-700" : "text-gray-600"}`}>
                      {order.shp} - Preparado: {order.fechaPreparado}
                    </p>
                    <p className={`text-xs ${isOverdue ? "text-red-600" : "text-gray-500"} mt-1`}>
                      {businessDays} {businessDays === 1 ? "día hábil" : "días hábiles"} esperando retiro
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {userRole === "admin" && (
                      <span className={`text-sm ${isOverdue ? "text-red-700" : "text-gray-600"}`}>
                        {order.puntoTUU}
                      </span>
                    )}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isOverdue ? "bg-red-200 text-red-900" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {isOverdue ? "Urgente" : "Preparado"}
                    </span>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-gray-500 text-center py-4">No hay pedidos preparados pendientes de retiro</p>
          )}
        </div>
      </div>
    </div>
  )
}
