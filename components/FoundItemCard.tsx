"use client"

import { MapPin, Phone, Clock, Trash2 } from "lucide-react"
import ClaimDialog from "./ClaimDialog"
import { useTransition } from "react"
import { deleteFoundItem } from "@/actions/student.actions"
import { toast } from "sonner"
import { Button } from "./ui/button"

interface ItemInput {
  id: string
  name: string
  description: string
  image?: string
  time?: Date
  location: string
  contactNo?: string
  creatorId: string
}

const FoundItemCard = ({
  item,
  currentStudentId,
}: {
  item: ItemInput
  currentStudentId: string
}) => {
  const [isPending, startTransition] = useTransition()
  const isOwner = currentStudentId === item.creatorId

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteFoundItem(item.id)
      if (res.success) {
        toast.success("Found item deleted")
        window.location.reload()
      } else {
        toast.error(res.message || "Failed to delete item")
      }
    })
  }

  return (
    <div className="group relative w-full max-w-[320px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200">
      {/* Image - Fixed height, smooth zoom */}
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
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Header: Tag + Delete Button */}
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
          Found Item
        </span>

        {isOwner && (
          <Button
            onClick={handleDelete}
            disabled={isPending}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-neutral-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Delete item"
          >
            <Trash2 size={16} />
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="px-4 py-3 space-y-3">
        <h3 className="font-bold text-lg text-neutral-900 line-clamp-1">
          {item.name}
        </h3>

        <p className="text-neutral-600 text-sm line-clamp-2 leading-snug">
          {item.description}
        </p>

        {/* Meta Info */}
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

      {/* CTA */}
      <div className="px-4 pb-4">
        <ClaimDialog itemId={item.id} />
      </div>
    </div>
  )
}

export default FoundItemCard