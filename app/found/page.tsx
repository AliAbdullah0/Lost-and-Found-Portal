import { getCurrentStudentId, getFoundItems } from "@/actions/student.actions"
import FoundItemCard from "@/components/FoundItemCard"
import LostItemCard from "@/components/LostItemCard"

const FoundItems = async () => {
  const studentId = await getCurrentStudentId()
  const res = await getFoundItems()

  if (!res.success || !res.foundItems?.length) {
    return (
      <div className="text-center py-24 text-gray-500">
        No founded items posted yet.
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-8">

      <h1 className="text-3xl font-bold mb-6">
        Found Items
      </h1>

           <div className="flex flex-wrap items-center md:flex-row flex-col justify-center gap-4 md:justify-start">

        {res.foundItems.map((item) => (
          <FoundItemCard
            key={item.id}
            item={{
              id: item.id,
              name: item.name,
              description: item.description,
              image: item.image || undefined,
              location: item.location,
              time: item.time || undefined,
              contactNo: item.contactNo ? Number(item.contactNo) : undefined,
              creatorId:item.creator.id
            }}
            currentStudentId={studentId!}
          />
        ))}

      </div>
    </div>
  )
}

export default FoundItems
