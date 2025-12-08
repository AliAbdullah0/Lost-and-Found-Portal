"use client"

import { useEffect, useState } from "react"
import { getCurrentStudentId, getFoundItems } from "@/actions/student.actions"
import FoundItemCard from "@/components/FoundItemCard"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"

const FoundItems = () => {
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
          getFoundItems(),
        ])

        setStudentId(idRes ?? null)
        if (itemsRes.success) {
          setItems(itemsRes.foundItems || [])
        }
      } catch (error) {
        console.error("Failed to load found items:", error)
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
            Found Items
          </h1>
          <p className="text-neutral-600">
            See items others have found — claim yours if you recognize it!
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mb-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <Input
            placeholder="Search by item name, description, or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-base bg-white border-neutral-200 focus:border-emerald-500 transition-colors"
          />
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-96 rounded-2xl bg-neutral-200" />
            ))}
          </div>
        )}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-emerald-100 border-2 border-dashed border-emerald-300 rounded-xl w-28 h-28 mx-auto mb-6 flex items-center justify-center">
              <span className="text-5xl">Found</span>
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              {query
                ? "No found items match your search"
                : "No items have been found yet"}
            </h3>
            <p className="text-neutral-600 max-w-md mx-auto">
              {query
                ? "Try different keywords or check back later"
                : "When someone reports a found item, it will appear here"}
            </p>
          </div>
        )}

        {/* Items Grid */}
        {!loading && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {filteredItems.map((item) => (
              <FoundItemCard
                key={item.id}
                item={{
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  image: item.image || undefined,
                  location: item.location,
                  time: item.time ? new Date(item.time) : undefined,
                  contactNo: item.contactNo ? String(item.contactNo) : undefined,
                  creatorId: item.creator.id,
                }}
                currentStudentId={studentId ?? ""}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FoundItems