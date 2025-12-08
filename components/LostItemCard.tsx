"use client"

import { MapPin, Phone, Clock, Trash2 } from "lucide-react"
import IFoundItDialog from "./IFoundItDialog"
import { deleteLostItem } from "@/actions/student.actions"
import { toast } from "sonner"
import { useTransition } from "react"
import { Button } from "./ui/button"

interface ItemInput {
  id: string
  name: string
  description: string
  image?: string
  time?: Date
  location: string
  contactNo?: string
  creatorEmail: string
  creatorId: string
}

const LostItemCard = ({
  item,
  currentStudentId,
}: {
  item: ItemInput
  currentStudentId: string | undefined
}) => {
  const [isPending, startTransition] = useTransition()
  const isOwner = currentStudentId === item.creatorId

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteLostItem(item.id)
      if (res.success) {
        toast.success("Item deleted successfully")
        window.location.reload()
      } else {
        toast.error(res.message || "Failed to delete item")
      }
    })
  }

  return (
    <div className="group relative w-full max-w-[320px]  bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200">
      {/* Fixed Image Container - 180px height */}
      <div className="relative w-full h-48 overflow-hidden bg-neutral-50">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-neutral-100">
            <span className="text-neutral-400 text-sm font-medium">No Image</span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Header: Tag + Delete */}
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
          Lost Item
        </span>

        {isOwner && (
          <Button
            onClick={handleDelete}
            disabled={isPending}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-neutral-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} />
          </Button>
        )}
      </div>

      {/* Content - Tight & Clean */}
      <div className="px-4 py-3 space-y-3">
        <h3 className="font-bold text-lg text-neutral-900 line-clamp-1">
          {item.name}
        </h3>

        <p className="text-neutral-600 text-sm line-clamp-2 leading-snug">
          {item.description}
        </p>

        {/* Meta Info - Compact */}
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-neutral-600">
            <MapPin size={13} className="shrink-0 text-neutral-500" />
            <span className="truncate">{item.location}</span>
          </div>

          {item.time && (
            <div className="flex items-center gap-2 text-neutral-600">
              <Clock size={13} className="shrink-0 text-neutral-500" />
              <span>
                {new Date(item.time).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          )}

          {item.contactNo && (
            <div className="flex items-center gap-2 text-neutral-600">
              <Phone size={13} className="shrink-0 text-neutral-500" />
              <span className="font-medium">{item.contactNo}</span>
            </div>
          )}
        </div>
      </div>

      {/* CTA - Full width feel, compact */}
      <div className="px-4 pb-4">
        <IFoundItDialog
          itemName={item.name}
          creatorEmail={item.creatorEmail}
        />
      </div>
    </div>
  )
}

export default LostItemCard