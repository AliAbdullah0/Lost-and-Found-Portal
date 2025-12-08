"use client"

import { getCurrentStudent, logOut } from "@/actions/student.actions"
import { Button } from "./ui/button"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "./ui/menubar"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useEffect, useState } from "react"

interface Student {
  email: string
  enrollment: string
  id: string
}

interface StudentResponse {
  success: boolean
  student?: Student
}

const ProfileButton = () => {
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const currentStudent: StudentResponse = await getCurrentStudent()

        if (currentStudent.success && currentStudent.student) {
          setStudent(currentStudent.student)
        } else {
          setStudent(null)
        }
      } catch (error) {
        setStudent(null)
      } finally {
        setLoading(false)
      }
    }

    fetchStudent()
  }, [])

  const handleLogout = async () => {
    try {
      await logOut()
      toast.success("Logged out successfully")
      router.push("/register")
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  if (loading) {
    return (
      <div className="w-10 h-10 rounded-md bg-gray-400 animate-pulse" />
    )
  }

  if (!student) {
    return <Button size={"sm"} onClick={() => router.push("/register")}>Register</Button>
  }

  return (
    <Menubar className="border-none shadow-none">
      <MenubarMenu>
        <MenubarTrigger asChild className="border-none shadow-none">
          <button className="h-9 w-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition">
            <Menu className="h-5 w-5" />
          </button>
        </MenubarTrigger>

        <MenubarContent align="end" className="p-2 min-w-[200px]">
          <div className="flex items-center gap-3 px-2 py-2 border-b mb-1">
            <Avatar>
              <AvatarFallback className="bg-black text-white">
                {student.email.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="text-sm truncate">
              {student.email}
            </div>
          </div>
          <MenubarItem onClick={() => router.push("/create")}>
            Create
          </MenubarItem>

          <MenubarItem onClick={() => router.push("/lost-items")}>
            Lost Items
          </MenubarItem>

          <MenubarItem onClick={() => router.push("/found")}>
            Found Items
          </MenubarItem>

          <MenubarItem
            onClick={handleLogout}
            className="text-red-500 focus:text-red-500"
          >
            Logout
          </MenubarItem>

        </MenubarContent>

      </MenubarMenu>
    </Menubar>
  )
}

export default ProfileButton
