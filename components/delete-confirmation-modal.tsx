"use client"

import { AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  title: string
  description: string
  itemName: string
  onClose: () => void
  onConfirm: () => void
}

export function DeleteConfirmationModal({
  isOpen,
  title,
  description,
  itemName,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="py-4 flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-sm">
            <p className="text-gray-900">
              Estás a punto de eliminar: <strong>{itemName}</strong>
            </p>
            <p className="text-gray-600 mt-1">Esta acción no se puede deshacer.</p>
          </div>
        </div>

        <DialogFooter>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Eliminar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
