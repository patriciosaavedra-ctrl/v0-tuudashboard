"use client"

import { X, Check } from "lucide-react"
import type { Order } from "../types/order"
import { getPdaStatusBadge, getPdaStatusText } from "../utils/order-utils"

interface OrderDetailModalProps {
  order: Order | null
  userRole: string
  onClose: () => void
}

export function OrderDetailModal({ order, userRole, onClose }: OrderDetailModalProps) {
  if (!order) return null

  const requiresSerialNumbers = (order: Order) => {
    return order.cantidadProS2 > 0 || order.cantidadMiniS > 0
  }

  return (
    <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 border border-gray-200">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">Detalle del Pedido - {order.shp}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Info del cliente */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-gray-900">Información del Cliente</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nombre</p>
                <p className="font-medium">{order.nombreCliente}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">RUT</p>
                <p className="font-medium">{order.rutCliente}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Teléfono</p>
                <p className="font-medium">{order.telefono}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fecha Pedido</p>
                <p className="font-medium">{order.fechaPedido}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Punto TUU</p>
                <p className="font-medium">{order.puntoTUU}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Comuna</p>
                <p className="font-medium">{order.comuna}</p>
              </div>
            </div>
          </div>

          {/* Productos */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-gray-900">Productos</h4>
            <div className="space-y-2">
              {order.cantidadProS2 > 0 && (
                <div className="flex justify-between items-center">
                  <span>POS PRO 2</span>
                  <span className="font-medium">{order.cantidadProS2} unidades</span>
                </div>
              )}
              {order.cantidadMiniS > 0 && (
                <div className="flex justify-between items-center">
                  <span>POS MINI S</span>
                  <span className="font-medium">{order.cantidadMiniS} unidades</span>
                </div>
              )}
              {order.fundasProS2 > 0 && (
                <div className="flex justify-between items-center">
                  <span>Fundas de PRO 2</span>
                  <span className="font-medium">{order.fundasProS2} unidades</span>
                </div>
              )}
              {order.pistolaLectora > 0 && (
                <div className="flex justify-between items-center">
                  <span>Pistola lectora de código de barras</span>
                  <span className="font-medium">{order.pistolaLectora} unidades</span>
                </div>
              )}
              {(order.cantidadProS2 > 0 || order.cantidadMiniS > 0) && (
                <div className="flex justify-between items-center">
                  <span>Chip de Datos ({order.chipDatos})</span>
                  <span className="font-medium">{order.cantidadProS2 + order.cantidadMiniS} unidades</span>
                </div>
              )}
              {order.rollos > 0 && (
                <div className="flex justify-between items-center">
                  <span>Rollos térmicos</span>
                  <span className="font-medium">{order.rollos} packs</span>
                </div>
              )}
              {order.stickers > 0 && (
                <div className="flex justify-between items-center">
                  <span>Stickers</span>
                  <span className="font-medium">{order.stickers} unidades</span>
                </div>
              )}
            </div>
          </div>

          {userRole === "admin" && order.pdaStatus && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-gray-900">Estado del PDA</h4>
              <div className="flex items-center gap-3">
                <span className={`text-sm px-3 py-1.5 rounded-full font-medium ${getPdaStatusBadge(order.pdaStatus)}`}>
                  PDA-{getPdaStatusText(order.pdaStatus)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Estado del proceso de onboarding en el tablero interno de gestión
              </p>
            </div>
          )}

          {/* Estado del pedido */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-gray-900">Estado del Pedido</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full flex items-center justify-center ${
                    !requiresSerialNumbers(order) || order.estado !== "pendiente" ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  {(!requiresSerialNumbers(order) || order.estado !== "pendiente") && (
                    <Check size={10} className="text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Números de serie agregados</p>
                  {!requiresSerialNumbers(order) && (
                    <p className="text-xs text-gray-500">No requiere números de serie</p>
                  )}
                  {requiresSerialNumbers(order) && order.fechaSeries && (
                    <p className="text-xs text-gray-500">Fecha: {order.fechaSeries}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${order.preparado ? "bg-green-600" : "bg-gray-300"}`}></div>
                  <span className={order.preparado ? "text-green-600 font-medium" : "text-gray-600"}>Preparado</span>
                </div>
                {order.preparado && <span className="text-sm text-gray-600">{order.fechaPreparado}</span>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${order.emailEnviado ? "bg-green-600" : "bg-gray-300"}`}></div>
                  <span className={order.emailEnviado ? "text-green-600 font-medium" : "text-gray-600"}>
                    Email enviado
                  </span>
                </div>
                {order.emailEnviado && <span className="text-sm text-gray-600">{order.fechaEmail}</span>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${order.retirado ? "bg-green-600" : "bg-gray-300"}`}></div>
                  <span className={order.retirado ? "text-green-600 font-medium" : "text-gray-600"}>Retirado</span>
                </div>
                {order.retirado && <span className="text-sm text-gray-600">{order.fechaRetiro}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end">
          <button onClick={onClose} className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
