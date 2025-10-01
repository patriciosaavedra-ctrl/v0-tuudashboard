"use client"

import { X } from "lucide-react"

interface StockRequestModalProps {
  isOpen: boolean
  stockItem: {
    producto: string
    puntoTUU: string
  } | null
  onClose: () => void
  onConfirm: () => void
}

export function StockRequestModal({ isOpen, stockItem, onClose, onConfirm }: StockRequestModalProps) {
  if (!isOpen || !stockItem) return null

  return (
    <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">Solicitar Stock</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-gray-700">
            Se solicitará más stock de <strong>{stockItem.producto}</strong> para el punto{" "}
            <strong>{stockItem.puntoTUU}</strong>.
          </p>
          <p className="text-gray-600 text-sm">
            Nos pondremos en contacto contigo para coordinar el envío del stock solicitado.
          </p>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Confirmar Solicitud
          </button>
        </div>
      </div>
    </div>
  )
}
