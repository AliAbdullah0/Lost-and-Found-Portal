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
  contactNo?: number
  creatorId: string
}

const FoundItemCard = ({ item,currentStudentId }: { item: ItemInput,currentStudentId:string }) => {
  const [isPending, startTransition] = useTransition()

  const isOwner = currentStudentId === item.creatorId

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteFoundItem(item.id)

      if (res.success) {
        toast.success("Item deleted")
        window.location.reload()
      } else {
        toast.error(res.message)
      }
    })
  }
  return (
    <div className="w-full max-w-xs bg-white border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">

      {item.image && (
        <img
          src={item.image}
          className="w-full h-40 object-cover"
          alt={item.name}
        />
      )}

      <div className="flex justify-between items-center bg-gray-900 px-3 py-2">
        <h2 className="text-white text-sm font-semibold">
          Found Item
        </h2>
        {isOwner && (
          <Button
            onClick={handleDelete}
            disabled={isPending}
            variant="ghost"
            className="text-white hover:text-destructive"
            title="Delete Item"
          >
            <Trash2 size={18} />
          </Button>
        )}
      </div>

      <div className="px-3 py-3 space-y-1.5 text-sm">

        <h1 className="font-semibold text-base truncate">
          {item.name}
        </h1>

        <p className="text-gray-600 text-xs line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate">{item.location}</span>
        </div>

        {item.time && (
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-4 h-4 shrink-0" />
            <span className="text-xs">
              {new Date(item.time).toLocaleString()}
            </span>
          </div>
        )}

        {item.contactNo && (
          <div className="flex items-center gap-2 text-gray-700">
            <Phone className="w-4 h-4 shrink-0" />
            <span>{item.contactNo}</span>
          </div>
        )}

        <ClaimDialog itemId={item.id} />

      </div>

    </div>
  )
}

export default FoundItemCard
