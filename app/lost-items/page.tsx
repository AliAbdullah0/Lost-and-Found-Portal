"use client"

import { useEffect, useState } from "react"
import { getCurrentStudentId, getLostItems } from "@/actions/student.actions"
import LostItemCard from "@/components/LostItemCard"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"

const LostItems = () => {
  const [studentId, setStudentId] = useState<string | null>(null)
  const [items, setItems] = useState<any[]>([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [idRes, itemsRes] = await Promise.all([
          getCurrentStudentId(),
          getLostItems(),
        ])

        setStudentId(idRes ?? null)
        if (itemsRes.success) {
          setItems(itemsRes.lostItems || [])
        }
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredItems = items.filter((item) =>
    [item.name, item.description, item.location].some((field) =>
      field?.toLowerCase().includes(query.toLowerCase())
    )
  )

  return (
    <div className="min-h-screen bg-neutral-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-neutral-900 mb-3">
            Lost Items
          </h1>
          <p className="text-neutral-600">
            Help reunite lost items with their owners
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mb-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <Input
            placeholder="Search by item name, description, or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-base bg-white border-neutral-200 focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-96 rounded-2xl" />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-neutral-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              {query
                ? "No items match your search"
                : "No lost items found yet"}
            </h3>
            <p className="text-neutral-600">
              {query
                ? "Try adjusting your search terms"
                : "Check back later or report a lost item"}
            </p>
          </div>
        )}

        {/* Items Grid */}
        {!loading && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {filteredItems.map((item) => (
              <LostItemCard
                key={item.id}
                item={{
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  image: item.image || undefined,
                  location: item.location,
                  time: item.time ? new Date(item.time) : undefined,
                  contactNo: item.contactNo
                    ? String(item.contactNo)
                    : undefined,
                  creatorEmail: item.creator.email,
                  creatorId: item.creator.id,
                }}
                currentStudentId={studentId ?? undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default LostItems