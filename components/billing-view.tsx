"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, Download, Calendar, Edit } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import type { Billing, PuntoTUU } from "../types/order"
import { formatPeriodo, formatDate, getBillingStatusBadge, getBillingStatusText } from "../utils/billing-utils"

interface BillingViewProps {
  billings: Billing[]
  userRole: string
  selectedPunto: string
  activePuntosTUU: PuntoTUU[]
  onUploadPDF: (billingId: number, file: File) => void
}

export function BillingView({ billings, userRole, selectedPunto, activePuntosTUU, onUploadPDF }: BillingViewProps) {
  const [filterYear, setFilterYear] = useState<string>("todos")
  const [filterMonth, setFilterMonth] = useState<string>("todos")
  const [filterPunto, setFilterPunto] = useState<string>("todos")
  const [uploadingId, setUploadingId] = useState<number | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedBillingId, setSelectedBillingId] = useState<number | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Filtrar facturaciones según el rol
  const filteredByRole =
    userRole === "admin" ? billings : billings.filter((billing) => billing.puntoTUU === selectedPunto)

  // Aplicar filtros adicionales
  const filteredBillings = filteredByRole.filter((billing) => {
    const [year, month] = billing.periodo.split("-")

    if (filterYear !== "todos" && year !== filterYear) return false
    if (filterMonth !== "todos" && month !== filterMonth) return false
    if (filterPunto !== "todos" && billing.puntoTUU !== filterPunto) return false

    return true
  })

  // Obtener años únicos para el filtro
  const availableYears = Array.from(new Set(billings.map((b) => b.periodo.split("-")[0]))).sort((a, b) =>
    b.localeCompare(a),
  )

  const monthNames = [
    { value: "01", label: "Enero" },
    { value: "02", label: "Febrero" },
    { value: "03", label: "Marzo" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Mayo" },
    { value: "06", label: "Junio" },
    { value: "07", label: "Julio" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ]

  const handleOpenUploadModal = (billingId: number, editing = false) => {
    setSelectedBillingId(billingId)
    setIsEditing(editing)
    setShowUploadModal(true)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setSelectedFile(file)
    } else {
      alert("Por favor selecciona un archivo PDF válido")
    }
  }

  const handleConfirmUpload = () => {
    if (selectedFile && selectedBillingId !== null) {
      setUploadingId(selectedBillingId)
      onUploadPDF(selectedBillingId, selectedFile)
      setTimeout(() => setUploadingId(null), 1000)
      setShowUploadModal(false)
      setSelectedFile(null)
      setSelectedBillingId(null)
      setIsEditing(false)
    }
  }

  const handleCancelUpload = () => {
    setShowUploadModal(false)
    setSelectedFile(null)
    setSelectedBillingId(null)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Facturación</h2>
          <p className="text-gray-600 mt-1">Gestión de pagos mensuales a Puntos TUU</p>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los años" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los años</SelectItem>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
              <Select value={filterMonth} onValueChange={setFilterMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los meses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los meses</SelectItem>
                  {monthNames.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {userRole === "admin" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Punto TUU</label>
                <Select value={filterPunto} onValueChange={setFilterPunto}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los puntos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los puntos</SelectItem>
                    {activePuntosTUU.map((punto) => (
                      <SelectItem key={punto.id} value={punto.nombre}>
                        {punto.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabla de facturación */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={20} />
            Registros de Facturación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {userRole === "admin" && <TableHead>Punto TUU</TableHead>}
                  <TableHead>Periodo</TableHead>
                  <TableHead>Cantidad Retiros</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha de Pago</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBillings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={userRole === "admin" ? 6 : 5} className="text-center py-8 text-gray-500">
                      No se encontraron registros de facturación
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBillings.map((billing) => (
                    <TableRow key={billing.id}>
                      {userRole === "admin" && <TableCell className="font-medium">{billing.puntoTUU}</TableCell>}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          {formatPeriodo(billing.periodo)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-blue-600">{billing.cantidadRetiros}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getBillingStatusBadge(billing.estado)}>
                          {getBillingStatusText(billing.estado)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {billing.fechaPago ? formatDate(billing.fechaPago) : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {billing.estado === "pagado" && billing.pdfUrl && (
                            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                              <Download size={16} />
                              Descargar
                            </Button>
                          )}
                          {billing.estado === "pagado" && userRole === "admin" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2 bg-transparent"
                              onClick={() => handleOpenUploadModal(billing.id, true)}
                            >
                              <Edit size={16} />
                              Editar
                            </Button>
                          )}
                          {billing.estado === "pendiente" && userRole === "admin" && (
                            <Button
                              variant="default"
                              size="sm"
                              className="gap-2 bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleOpenUploadModal(billing.id, false)}
                              disabled={uploadingId === billing.id}
                            >
                              <Upload size={16} />
                              {uploadingId === billing.id ? "Subiendo..." : "Adjuntar PDF"}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar Factura" : "Adjuntar Factura"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Selecciona un nuevo archivo PDF para reemplazar la factura existente."
                : "Selecciona el archivo PDF de la factura para adjuntar."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="pdf-upload-modal"
              />
              <label htmlFor="pdf-upload-modal" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <Upload size={32} className="text-gray-400" />
                  <p className="text-sm text-gray-600">
                    {selectedFile ? selectedFile.name : "Haz clic para seleccionar un archivo PDF"}
                  </p>
                  {selectedFile && (
                    <Badge className="bg-green-100 text-green-800 border-green-300">Archivo seleccionado</Badge>
                  )}
                </div>
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelUpload}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmUpload} disabled={!selectedFile} className="bg-blue-600 hover:bg-blue-700">
              {isEditing ? "Actualizar" : "Confirmar y Subir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Información adicional */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <FileText size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Información sobre Facturación</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• El registro de facturación se generará automáticamente el 1er día hábil de cada mes</li>
                <li>• Cada factura corresponde al periodo del mes anterior</li>
                <li>• Una vez hayamos realizado el pago, podrás descargar la factura</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
