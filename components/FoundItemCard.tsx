"use client"

import { MapPin, Phone, Clock } from "lucide-react"
import ClaimDialog from "./ClaimDialog"

interface ItemInput {
  id: string
  name: string
  description: string
  image?: string
  time?: Date
  location: string
  contactNo?: number
}

const FoundItemCard = ({ item }: { item: ItemInput }) => {
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
