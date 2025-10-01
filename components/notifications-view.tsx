"use client"

import { useState, useEffect } from "react"
import { Mail, Send, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"

interface EmailNotification {
  id: number
  clienteNombre: string
  shp: string
  puntoTUU: string
  estado: "enviado" | "no-enviado"
  fechaEnvio: string | null
  correoDestino: string
}

const mockNotifications: EmailNotification[] = [
  {
    id: 1,
    clienteNombre: "Juan Pérez",
    shp: "SHP-2024-001",
    puntoTUU: "Mandarakemiyu",
    estado: "enviado",
    fechaEnvio: "2025-09-28",
    correoDestino: "juan.perez@email.com",
  },
  {
    id: 2,
    clienteNombre: "María González",
    shp: "SHP-2024-002",
    puntoTUU: "Mandarakemiyu",
    estado: "no-enviado",
    fechaEnvio: null,
    correoDestino: "maria.gonzalez@email.com",
  },
  {
    id: 3,
    clienteNombre: "Carlos Rodríguez",
    shp: "SHP-2024-003",
    puntoTUU: "KarinMarket",
    estado: "enviado",
    fechaEnvio: "2025-09-29",
    correoDestino: "carlos.rodriguez@email.com",
  },
]

export function NotificationsView() {
  const [notifications, setNotifications] = useState<EmailNotification[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("notifications")
      return saved ? JSON.parse(saved) : mockNotifications
    }
    return mockNotifications
  })

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<EmailNotification | null>(null)

  const [filterCliente, setFilterCliente] = useState("")
  const [filterSHP, setFilterSHP] = useState("")
  const [filterPuntoTUU, setFilterPuntoTUU] = useState("")
  const [filterCorreo, setFilterCorreo] = useState("")
  const [filterFecha, setFilterFecha] = useState("")
  const [filterEstado, setFilterEstado] = useState<"todos" | "enviado" | "no-enviado">("todos")

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("notifications", JSON.stringify(notifications))
    }
  }, [notifications])

  const openConfirmModal = (notification: EmailNotification) => {
    setSelectedNotification(notification)
    setShowConfirmModal(true)
  }

  const handleSendEmail = () => {
    if (!selectedNotification) return

    const today = new Date().toISOString().split("T")[0]

    if (selectedNotification.estado === "no-enviado") {
      setNotifications(
        notifications.map((notif) =>
          notif.id === selectedNotification.id
            ? {
                ...notif,
                estado: "enviado" as const,
                fechaEnvio: today,
              }
            : notif,
        ),
      )
    } else {
      const newNotification: EmailNotification = {
        id: Math.max(...notifications.map((n) => n.id)) + 1,
        clienteNombre: selectedNotification.clienteNombre,
        shp: selectedNotification.shp,
        puntoTUU: selectedNotification.puntoTUU,
        estado: "enviado",
        fechaEnvio: today,
        correoDestino: selectedNotification.correoDestino,
      }
      setNotifications([...notifications, newNotification])
    }

    setShowConfirmModal(false)
    setSelectedNotification(null)
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filterCliente && !notif.clienteNombre.toLowerCase().includes(filterCliente.toLowerCase())) return false
    if (filterSHP && !notif.shp.toLowerCase().includes(filterSHP.toLowerCase())) return false
    if (filterPuntoTUU && !notif.puntoTUU.toLowerCase().includes(filterPuntoTUU.toLowerCase())) return false
    if (filterCorreo && !notif.correoDestino.toLowerCase().includes(filterCorreo.toLowerCase())) return false
    if (filterFecha && notif.fechaEnvio !== filterFecha) return false
    if (filterEstado !== "todos" && notif.estado !== filterEstado) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notificaciones de Correo</h2>
          <p className="text-gray-600 mt-1">
            Registro de correos enviados a clientes cuando el pedido está preparado para retiro
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Mail className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-blue-900">
          <p className="font-medium mb-1">Información sobre Notificaciones</p>
          <p>
            Los correos se envían automáticamente cuando el PDA está en estado "Completado" y el pedido está en estado
            "Preparado". Puedes reenviar correos manualmente si es necesario.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
            <input
              type="text"
              value={filterCliente}
              onChange={(e) => setFilterCliente(e.target.value)}
              placeholder="Buscar por cliente"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SHP</label>
            <input
              type="text"
              value={filterSHP}
              onChange={(e) => setFilterSHP(e.target.value)}
              placeholder="Buscar por SHP"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Punto TUU</label>
            <input
              type="text"
              value={filterPuntoTUU}
              onChange={(e) => setFilterPuntoTUU(e.target.value)}
              placeholder="Buscar por punto TUU"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
            <input
              type="text"
              value={filterCorreo}
              onChange={(e) => setFilterCorreo(e.target.value)}
              placeholder="Buscar por correo"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Envío</label>
            <input
              type="date"
              value={filterFecha}
              onChange={(e) => setFilterFecha(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos</option>
              <option value="enviado">Enviado</option>
              <option value="no-enviado">No enviado</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SHP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Punto TUU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correo Destino
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Envío
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
              {filteredNotifications.map((notification) => (
                <tr key={notification.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{notification.clienteNombre}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{notification.shp}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{notification.puntoTUU}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{notification.correoDestino}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{notification.fechaEnvio || "-"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        notification.estado === "enviado" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {notification.estado === "enviado" ? "Enviado" : "No enviado"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => openConfirmModal(notification)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-900 px-3 py-1 rounded hover:bg-blue-50 transition text-xs font-medium"
                    >
                      <Send size={14} />
                      {notification.estado === "enviado" ? "Reenviar" : "Enviar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Envío de Correo</DialogTitle>
            <DialogDescription>
              {selectedNotification?.estado === "enviado"
                ? "Este correo ya fue enviado. ¿Deseas reenviar el correo al cliente? Se creará un nuevo registro de insistencia."
                : "¿Estás seguro de que deseas enviar el correo al cliente?"}
            </DialogDescription>
          </DialogHeader>

          {selectedNotification && (
            <div className="py-4 space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Detalles del envío:</p>
                  <p className="text-gray-600 mt-1">
                    Cliente: <strong>{selectedNotification.clienteNombre}</strong>
                  </p>
                  <p className="text-gray-600">
                    SHP: <strong>{selectedNotification.shp}</strong>
                  </p>
                  <p className="text-gray-600">
                    Correo: <strong>{selectedNotification.correoDestino}</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <button
              onClick={() => setShowConfirmModal(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSendEmail}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Confirmar Envío
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
