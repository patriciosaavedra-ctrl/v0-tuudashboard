"use client"

import { useState, useEffect } from "react"
import { Package, MapPin, Users, FileText, LogOut, Building2, Receipt, Bell } from "lucide-react"
import { DashboardView } from "../components/dashboard-view"
import { OrdersView } from "../components/orders-view"
import { StockView } from "../components/stock-view"
import { BillingView } from "../components/billing-view"
import { UsersView } from "../components/users-view"
import { PuntosTUUView } from "../components/puntos-tuu-view"
import { NotificationsView } from "../components/notifications-view"
import { OrderDetailModal } from "../components/order-detail-modal"
import { StockRequestModal } from "../components/stock-request-modal"
import { UserModal } from "../components/user-modal"
import { PuntoModal } from "../components/punto-modal"
import { DeleteConfirmationModal } from "../components/delete-confirmation-modal"
import { initialOrders, initialUsers, initialPuntosTUU, puntosStock, initialBillings } from "../data/mock-data"
import type { Order, User, PuntoTUU, Billing } from "../types/order"

export default function Page() {
  const [currentView, setCurrentView] = useState("dashboard")
  const [userRole, setUserRole] = useState("admin")
  const [selectedPunto, setSelectedPunto] = useState("Mandarakemiyu")

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("orders")
      return saved ? JSON.parse(saved) : initialOrders
    }
    return initialOrders
  })

  const [users, setUsers] = useState<User[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("users")
      return saved ? JSON.parse(saved) : initialUsers
    }
    return initialUsers
  })

  const [puntosTUU, setPuntosTUU] = useState<PuntoTUU[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("puntosTUU")
      return saved ? JSON.parse(saved) : initialPuntosTUU
    }
    return initialPuntosTUU
  })

  const [billings, setBillings] = useState<Billing[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("billings")
      return saved ? JSON.parse(saved) : initialBillings
    }
    return initialBillings
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("orders", JSON.stringify(orders))
    }
  }, [orders])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("users", JSON.stringify(users))
    }
  }, [users])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("puntosTUU", JSON.stringify(puntosTUU))
    }
  }, [puntosTUU])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("billings", JSON.stringify(billings))
    }
  }, [billings])

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("orders")
        localStorage.removeItem("users")
        localStorage.removeItem("puntosTUU")
        localStorage.removeItem("billings")
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filterEstado, setFilterEstado] = useState("todos")
  const [filterPuntoTUU, setFilterPuntoTUU] = useState("todos")
  const [filterStockPunto, setFilterStockPunto] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [showUserModal, setShowUserModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [showPuntoModal, setShowPuntoModal] = useState(false)
  const [editingPunto, setEditingPunto] = useState<PuntoTUU | null>(null)
  const [puntoToDelete, setPuntoToDelete] = useState<PuntoTUU | null>(null)
  const [showSeriesModal, setShowSeriesModal] = useState(false)
  const [showPreparadoModal, setShowPreparadoModal] = useState(false)
  const [showRetiradoModal, setShowRetiradoModal] = useState(false)
  const [orderInAction, setOrderInAction] = useState<Order | null>(null)
  const [showStockRequestModal, setShowStockRequestModal] = useState(false)
  const [stockRequestItem, setStockRequestItem] = useState<any>(null)
  const [requestedStock, setRequestedStock] = useState<string[]>([])
  const [seriesForm, setSeriesForm] = useState({
    seriesProS2: [] as string[],
    seriesMiniS: [] as string[],
    seriesChip: [] as string[],
  })
  const [fechaPreparado, setFechaPreparado] = useState("")
  const [fechaRetiro, setFechaRetiro] = useState("")
  const [userForm, setUserForm] = useState({
    nombre: "",
    email: "",
    rol: "Admin" as "Admin" | "Comercio",
    puntoTUU: "",
    activo: true,
  })
  const [puntoForm, setPuntoForm] = useState({
    nombre: "",
    region: "",
    comuna: "",
    direccion: "",
    telefono: "",
    activo: true,
  })

  const [timePeriod, setTimePeriod] = useState("all")
  const [customStartDate, setCustomStartDate] = useState("")
  const [customEndDate, setCustomEndDate] = useState("")

  const activePuntosTUU = puntosTUU.filter((p) => p.activo)
  const puntoTUUOptions = activePuntosTUU.map((p) => p.nombre)

  const handleUploadPDF = (billingId: number, file: File) => {
    const today = new Date().toISOString().split("T")[0]
    setBillings(
      billings.map((billing) =>
        billing.id === billingId
          ? {
              ...billing,
              estado: "pagado" as const,
              fechaPago: today,
              pdfUrl: `/facturas/${billing.periodo}-${billing.puntoTUU.toLowerCase().replace(/\s+/g, "-")}.pdf`,
            }
          : billing,
      ),
    )
  }

  const marcarPreparado = () => {
    if (!orderInAction) return

    const today = new Date().toISOString().split("T")[0]
    setOrders(
      orders.map((o) =>
        o.id === orderInAction.id
          ? {
              ...o,
              estado: "preparado" as const,
              preparado: true,
              fechaPreparado: today,
              emailEnviado: true,
              fechaEmail: today,
              pdaStatus: "completado",
            }
          : o,
      ),
    )
    setShowPreparadoModal(false)
    setOrderInAction(null)
  }

  const marcarRetirado = () => {
    if (!orderInAction) return

    const today = new Date().toISOString().split("T")[0]
    setOrders(
      orders.map((o) =>
        o.id === orderInAction.id
          ? {
              ...o,
              estado: "retirado" as const,
              retirado: true,
              fechaRetiro: today,
              pdaStatus: "completado",
            }
          : o,
      ),
    )
    setShowRetiradoModal(false)
    setOrderInAction(null)
  }

  const openStockRequestModal = (item: any) => {
    setStockRequestItem(item)
    setShowStockRequestModal(true)
  }

  const confirmStockRequest = () => {
    if (stockRequestItem) {
      const requestKey = `${stockRequestItem.producto}-${stockRequestItem.puntoTUU}`
      setRequestedStock([...requestedStock, requestKey])
      setShowStockRequestModal(false)
      setStockRequestItem(null)
    }
  }

  const isStockRequested = (producto: string, puntoTUU: string) => {
    const requestKey = `${producto}-${puntoTUU}`
    return requestedStock.includes(requestKey)
  }

  const openSeriesModal = (order: Order) => {
    setOrderInAction(order)
    const proS2Count = order.cantidadProS2
    const miniSCount = order.cantidadMiniS
    const totalChips = order.cantidadProS2 + order.cantidadMiniS

    setSeriesForm({
      seriesProS2: order.seriesProS2 && order.seriesProS2.length > 0 ? order.seriesProS2 : Array(proS2Count).fill(""),
      seriesMiniS: order.seriesMiniS && order.seriesMiniS.length > 0 ? order.seriesMiniS : Array(miniSCount).fill(""),
      seriesChip: order.seriesChip && order.seriesChip.length > 0 ? order.seriesChip : Array(totalChips).fill(""),
    })
    setShowSeriesModal(true)
  }

  const saveSeriesForm = () => {
    if (!orderInAction) return

    const allSeries = [...seriesForm.seriesProS2, ...seriesForm.seriesMiniS, ...seriesForm.seriesChip]

    const allSeriesFilled = allSeries.every((serie) => serie.trim() !== "")

    if (!allSeriesFilled) {
      alert("Por favor completa todos los números de serie")
      return
    }

    const allSeriesValid = allSeries.every((serie) => serie.trim().length >= 10)

    if (!allSeriesValid) {
      alert("Todos los números de serie deben tener al menos 10 caracteres")
      return
    }

    setOrders(
      orders.map((order) =>
        order.id === orderInAction.id
          ? {
              ...order,
              seriesProS2: seriesForm.seriesProS2,
              seriesMiniS: seriesForm.seriesMiniS,
              seriesChip: seriesForm.seriesChip,
              estado: "pendiente-preparacion" as const,
              fechaSeries: new Date().toISOString().split("T")[0],
            }
          : order,
      ),
    )

    setShowSeriesModal(false)
    setOrderInAction(null)
    setSeriesForm({ seriesProS2: [], seriesMiniS: [], seriesChip: [] })
  }

  const openPreparadoModal = (order: Order) => {
    setOrderInAction(order)
    setFechaPreparado(new Date().toISOString().split("T")[0])
    setShowPreparadoModal(true)
  }

  const openRetiradoModal = (order: Order) => {
    setOrderInAction(order)
    setFechaRetiro(new Date().toISOString().split("T")[0])
    setShowRetiradoModal(true)
  }

  const openUserModal = (user?: User) => {
    if (user) {
      setEditingUser(user)
      setUserForm({
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        puntoTUU: user.puntoTUU || "",
        activo: user.activo,
      })
    } else {
      setEditingUser(null)
      setUserForm({
        nombre: "",
        email: "",
        rol: "Admin",
        puntoTUU: "",
        activo: true,
      })
    }
    setShowUserModal(true)
  }

  const handleUserFormChange = (field: string, value: any) => {
    setUserForm({ ...userForm, [field]: value })
  }

  const saveUser = () => {
    if (!userForm.nombre || !userForm.email) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }

    if (userForm.rol === "Comercio" && !userForm.puntoTUU) {
      alert("Por favor selecciona un punto TUU para el usuario de comercio")
      return
    }

    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                ...userForm,
                puntoTUU: userForm.rol === "Admin" ? null : userForm.puntoTUU,
              }
            : u,
        ),
      )
    } else {
      const newUser: User = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        ...userForm,
        puntoTUU: userForm.rol === "Admin" ? null : userForm.puntoTUU,
      }
      setUsers([...users, newUser])
    }

    setShowUserModal(false)
    setEditingUser(null)
  }

  const confirmDeleteUser = (user: User) => {
    setUserToDelete(user)
  }

  const deleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id))
      setUserToDelete(null)
    }
  }

  const openPuntoModal = (punto?: PuntoTUU) => {
    if (punto) {
      setEditingPunto(punto)
      setPuntoForm({
        nombre: punto.nombre,
        region: punto.region,
        comuna: punto.comuna,
        direccion: punto.direccion,
        telefono: punto.telefono,
        activo: punto.activo,
      })
    } else {
      setEditingPunto(null)
      setPuntoForm({
        nombre: "",
        region: "",
        comuna: "",
        direccion: "",
        telefono: "",
        activo: true,
      })
    }
    setShowPuntoModal(true)
  }

  const handlePuntoFormChange = (field: string, value: any) => {
    setPuntoForm({ ...puntoForm, [field]: value })
  }

  const savePunto = () => {
    if (!puntoForm.nombre || !puntoForm.region || !puntoForm.comuna || !puntoForm.direccion || !puntoForm.telefono) {
      alert("Por favor completa todos los campos")
      return
    }

    if (editingPunto) {
      if (editingPunto.activo && !puntoForm.activo) {
        setUsers(
          users.map((u) =>
            u.puntoTUU === editingPunto.nombre
              ? {
                  ...u,
                  activo: false,
                }
              : u,
          ),
        )
      }

      setPuntosTUU(
        puntosTUU.map((p) =>
          p.id === editingPunto.id
            ? {
                ...p,
                ...puntoForm,
              }
            : p,
        ),
      )
    } else {
      const newPunto: PuntoTUU = {
        id: Math.max(...puntosTUU.map((p) => p.id)) + 1,
        ...puntoForm,
      }
      setPuntosTUU([...puntosTUU, newPunto])
    }

    setShowPuntoModal(false)
    setEditingPunto(null)
  }

  const confirmDeletePunto = (punto: PuntoTUU) => {
    setPuntoToDelete(punto)
  }

  const deletePunto = () => {
    if (puntoToDelete) {
      setUsers(users.filter((u) => u.puntoTUU !== puntoToDelete.nombre))

      setPuntosTUU(puntosTUU.filter((p) => p.id !== puntoToDelete.id))
      setPuntoToDelete(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Puntos TUU</h1>
                <p className="text-xs text-gray-600">Sistema de Gestión</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">{userRole === "admin" ? "A" : "C"}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {userRole === "admin" ? "Admin Supply" : "Comercio"}
                  </p>
                  <p className="text-xs text-gray-600">{userRole === "comercio" ? selectedPunto : ""}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow p-4 space-y-2">
              <button
                onClick={() => setCurrentView("dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  currentView === "dashboard"
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Package size={20} />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setCurrentView("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  currentView === "orders" ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FileText size={20} />
                <span>Pedidos</span>
              </button>

              <button
                onClick={() => setCurrentView("stock")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  currentView === "stock" ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <MapPin size={20} />
                <span>Stock</span>
              </button>

              <button
                onClick={() => setCurrentView("billing")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  currentView === "billing" ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Receipt size={20} />
                <span>Facturación</span>
              </button>

              {userRole === "admin" && (
                <>
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <button
                      onClick={() => setCurrentView("users")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        currentView === "users"
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Users size={20} />
                      <span>Usuarios y Roles</span>
                    </button>

                    <button
                      onClick={() => setCurrentView("puntos")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        currentView === "puntos"
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Building2 size={20} />
                      <span>Puntos TUU</span>
                    </button>

                    <button
                      onClick={() => setCurrentView("notifications")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        currentView === "notifications"
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Bell size={20} />
                      <span>Notificaciones</span>
                    </button>
                  </div>
                </>
              )}

              <div className="pt-4 mt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2 px-4">Demo: Cambiar rol</p>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="admin">Admin Supply</option>
                  <option value="comercio">Comercio</option>
                </select>
                {userRole === "comercio" && (
                  <select
                    value={selectedPunto}
                    onChange={(e) => setSelectedPunto(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm mt-2"
                  >
                    {puntoTUUOptions.map((punto) => (
                      <option key={punto} value={punto}>
                        {punto}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </nav>
          </aside>

          <main className="flex-1">
            {currentView === "dashboard" && (
              <DashboardView
                orders={orders}
                userRole={userRole}
                selectedPunto={selectedPunto}
                timePeriod={timePeriod}
                customStartDate={customStartDate}
                customEndDate={customEndDate}
                onTimePeriodChange={setTimePeriod}
                onCustomStartDateChange={setCustomStartDate}
                onCustomEndDateChange={setCustomEndDate}
              />
            )}
            {currentView === "orders" && (
              <OrdersView
                orders={orders}
                userRole={userRole}
                selectedPunto={selectedPunto}
                searchTerm={searchTerm}
                filterPuntoTUU={filterPuntoTUU}
                activePuntosTUU={activePuntosTUU}
                onSearchChange={setSearchTerm}
                onFilterPuntoChange={setFilterPuntoTUU}
                onOrderSelect={setSelectedOrder}
                onOpenSeriesModal={openSeriesModal}
                onOpenPreparadoModal={openPreparadoModal}
                onOpenRetiradoModal={openRetiradoModal}
              />
            )}
            {currentView === "stock" && (
              <StockView
                puntosStock={puntosStock}
                userRole={userRole}
                selectedPunto={selectedPunto}
                filterStockPunto={filterStockPunto}
                puntoTUUOptions={puntoTUUOptions}
                onFilterStockPuntoChange={setFilterStockPunto}
                onOpenStockRequestModal={openStockRequestModal}
                isStockRequested={isStockRequested}
              />
            )}
            {currentView === "billing" && (
              <BillingView
                billings={billings}
                userRole={userRole}
                selectedPunto={selectedPunto}
                activePuntosTUU={activePuntosTUU}
                onUploadPDF={handleUploadPDF}
              />
            )}
            {currentView === "users" && (
              <UsersView
                users={users}
                puntosTUU={puntosTUU}
                onOpenUserModal={openUserModal}
                onDeleteUser={confirmDeleteUser}
              />
            )}
            {currentView === "puntos" && (
              <PuntosTUUView
                puntosTUU={puntosTUU}
                onOpenPuntoModal={openPuntoModal}
                onDeletePunto={confirmDeletePunto}
              />
            )}
            {currentView === "notifications" && <NotificationsView />}
          </main>
        </div>
      </div>

      <OrderDetailModal order={selectedOrder} userRole={userRole} onClose={() => setSelectedOrder(null)} />
      <StockRequestModal
        isOpen={showStockRequestModal}
        stockItem={stockRequestItem}
        onClose={() => {
          setShowStockRequestModal(false)
          setStockRequestItem(null)
        }}
        onConfirm={confirmStockRequest}
      />
      <UserModal
        isOpen={showUserModal}
        editingUser={editingUser}
        userForm={userForm}
        puntosTUU={puntosTUU}
        onClose={() => {
          setShowUserModal(false)
          setEditingUser(null)
        }}
        onFormChange={handleUserFormChange}
        onSave={saveUser}
      />
      <PuntoModal
        isOpen={showPuntoModal}
        editingPunto={editingPunto}
        puntoForm={puntoForm}
        onClose={() => {
          setShowPuntoModal(false)
          setEditingPunto(null)
        }}
        onFormChange={handlePuntoFormChange}
        onSave={savePunto}
      />
      <DeleteConfirmationModal
        isOpen={!!userToDelete}
        title="Eliminar Usuario"
        description="¿Estás seguro de que deseas eliminar este usuario?"
        itemName={userToDelete?.nombre || ""}
        onClose={() => setUserToDelete(null)}
        onConfirm={deleteUser}
      />
      <DeleteConfirmationModal
        isOpen={!!puntoToDelete}
        title="Eliminar Punto TUU"
        description="¿Estás seguro de que deseas eliminar este punto TUU? Los usuarios asociados serán eliminados."
        itemName={puntoToDelete?.nombre || ""}
        onClose={() => setPuntoToDelete(null)}
        onConfirm={deletePunto}
      />
    </div>
  )
}
