import { getCurrentStudentId, getLostItems } from "@/actions/student.actions"
import LostItemCard from "@/components/LostItemCard"

const LostItems = async () => {
  const studentId = await getCurrentStudentId()
  const res = await getLostItems()

  if (!res.success || !res.lostItems?.length) {
    return (
      <div className="text-center py-24 text-gray-500">
        No lost items found.
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-8">

      <h1 className="text-3xl font-bold mb-6">
        Lost Items
      </h1>

      <div className="flex flex-wrap items-center md:flex-row flex-col justify-center gap-4 md:justify-start">

        {res.lostItems.map((item) => (
          <LostItemCard
            key={item.id}
            item={{
              id: item.id,
              name: item.name,
              description: item.description,
              image: item.image || undefined,
              location: item.location,
              time: item.time || undefined,
              contactNo: item.contactNo ? Number(item.contactNo) : undefined,
              creatorEmail:item.creator.email,
              creatorId:item.creator.id,
            }}
            currentStudentId={studentId!}
          />
        ))}
      
      </div>
    </div>
  )
}

export default LostItems
