"use client"

import { Plus, Edit2, Trash2, Building2 } from "lucide-react"
import type { PuntoTUU } from "../types/order"

interface PuntosTUUViewProps {
  puntosTUU: PuntoTUU[]
  onOpenPuntoModal: (punto?: PuntoTUU) => void
  onDeletePunto: (punto: PuntoTUU) => void
}

export function PuntosTUUView({ puntosTUU, onOpenPuntoModal, onDeletePunto }: PuntosTUUViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Puntos TUU</h2>
          <p className="text-gray-600 mt-1">Administra los puntos de venta TUU</p>
        </div>
        <button
          onClick={() => onOpenPuntoModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Crear Punto TUU
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Punto TUU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Región
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comuna
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {puntosTUU.map((punto) => (
                <tr key={punto.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Building2 className="text-blue-600" size={18} />
                      <span className="text-sm font-medium text-gray-900">{punto.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{punto.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{punto.comuna}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{punto.direccion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{punto.telefono}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        punto.activo ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {punto.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenPuntoModal(punto)}
                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition"
                        title="Editar punto"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => onDeletePunto(punto)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition"
                        title="Eliminar punto"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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
