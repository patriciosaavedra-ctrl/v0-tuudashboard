"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import type { PuntoTUU } from "../types/order"

interface PuntoModalProps {
  isOpen: boolean
  editingPunto: PuntoTUU | null
  puntoForm: {
    nombre: string
    region: string
    comuna: string
    direccion: string
    telefono: string
    activo: boolean
  }
  onClose: () => void
  onFormChange: (field: string, value: any) => void
  onSave: () => void
}

export function PuntoModal({ isOpen, editingPunto, puntoForm, onClose, onFormChange, onSave }: PuntoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editingPunto ? "Editar Punto TUU" : "Crear Nuevo Punto TUU"}</DialogTitle>
          <DialogDescription>
            {editingPunto ? "Modifica los datos del punto TUU" : "Completa los datos del nuevo punto TUU"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={puntoForm.nombre}
              onChange={(e) => onFormChange("nombre", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nombre del punto TUU"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Región</label>
            <input
              type="text"
              value={puntoForm.region}
              onChange={(e) => onFormChange("region", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Región"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comuna</label>
            <input
              type="text"
              value={puntoForm.comuna}
              onChange={(e) => onFormChange("comuna", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Comuna"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <input
              type="text"
              value={puntoForm.direccion}
              onChange={(e) => onFormChange("direccion", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Dirección completa"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              type="tel"
              value={puntoForm.telefono}
              onChange={(e) => onFormChange("telefono", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+56 9 1234 5678"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="activo-punto"
              checked={puntoForm.activo}
              onChange={(e) => onFormChange("activo", e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="activo-punto" className="text-sm font-medium text-gray-700">
              Punto TUU activo
            </label>
          </div>
        </div>

        <DialogFooter>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button onClick={onSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            {editingPunto ? "Guardar Cambios" : "Crear Punto TUU"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
