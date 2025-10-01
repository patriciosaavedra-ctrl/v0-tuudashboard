"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Switch } from "./ui/switch"
import type { User, PuntoTUU } from "../types/order"

interface UserModalProps {
  isOpen: boolean
  editingUser: User | null
  userForm: {
    nombre: string
    email: string
    rol: "Admin" | "Comercio"
    puntoTUU: string
    activo: boolean
  }
  puntosTUU: PuntoTUU[]
  onClose: () => void
  onFormChange: (field: string, value: any) => void
  onSave: () => void
}

export function UserModal({ isOpen, editingUser, userForm, puntosTUU, onClose, onFormChange, onSave }: UserModalProps) {
  const activePuntosTUU = puntosTUU.filter((p) => p.activo)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editingUser ? "Editar Usuario" : "Crear Nuevo Usuario"}</DialogTitle>
          <DialogDescription>
            {editingUser ? "Modifica los datos del usuario" : "Completa los datos del nuevo usuario"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={userForm.nombre}
              onChange={(e) => onFormChange("nombre", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={userForm.email}
              onChange={(e) => onFormChange("email", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <select
              value={userForm.rol}
              onChange={(e) => onFormChange("rol", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Admin">Admin</option>
              <option value="Comercio">Comercio</option>
            </select>
          </div>

          {userForm.rol === "Comercio" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Punto TUU</label>
              <select
                value={userForm.puntoTUU}
                onChange={(e) => onFormChange("puntoTUU", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccionar punto TUU</option>
                {activePuntosTUU.map((punto) => (
                  <option key={punto.id} value={punto.nombre}>
                    {punto.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label htmlFor="activo" className="text-sm font-medium text-gray-700">
              Usuario activo
            </label>
            <Switch
              id="activo"
              checked={userForm.activo}
              onCheckedChange={(checked) => onFormChange("activo", checked)}
            />
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
            {editingUser ? "Guardar Cambios" : "Crear Usuario"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
