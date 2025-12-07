"use client"

import { useEffect, useState } from "react"
import { getCurrentStudentId, getFoundItems } from "@/actions/student.actions"
import FoundItemCard from "@/components/FoundItemCard"
import { Input } from "@/components/ui/input"
import { set } from "zod/v3"
import { Skeleton } from "@/components/ui/skeleton"

const FoundItems = () => {
  const [studentId, setStudentId] = useState<string | null>(null)
  const [items, setItems] = useState<any[]>([])
  const [query, setQuery] = useState("")
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const id = await getCurrentStudentId()
      const res = await getFoundItems()

      setStudentId(id ?? "")
      if (res.success) {
        setLoading(false)
        setItems(res.foundItems || [])
      }
    }

    loadData()
  }, [])

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.location.toLowerCase().includes(query.toLowerCase())
  )

   if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-8">
        <h1 className="text-3xl font-bold mb-4">Lost Items</h1>

        <Skeleton className="max-w-md h-10 mb-6" />

        <div className="flex flex-wrap gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-[280px] h-[280px] rounded-lg"
            />
          ))}
        </div>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="text-center py-24 text-gray-500">
        No founded items posted yet.
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-8">
      
      <h1 className="text-3xl font-bold mb-4">
        Found Items
      </h1>

      <Input
        placeholder="Search by name, description or location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-md mb-6"
      />

      {!filteredItems.length && (
        <div className="text-center text-gray-500 mb-8">
          No items matched your search.
        </div>
      )}

      <div className="flex flex-wrap items-center md:flex-row flex-col justify-center gap-4 md:justify-start">
        {filteredItems.map((item) => (
          <FoundItemCard
            key={item.id}
            item={{
              id: item.id,
              name: item.name,
              description: item.description,
              image: item.image || undefined,
              location: item.location,
              time: item.time || undefined,
              contactNo: item.contactNo
                ? Number(item.contactNo)
                : undefined,
              creatorId: item.creator.id
            }}
            currentStudentId={studentId!}
          />
        ))}
      </div>
    </div>
  )
}

export default FoundItems
