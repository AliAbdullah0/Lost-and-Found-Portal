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
    console.log("fetching student")
    const fetchStudent = async () => {
      try {
    console.log("in try catch")
        const currentStudent: StudentResponse = await getCurrentStudent()
        if (currentStudent.success && currentStudent.student) {
            console.log("current:",currentStudent)
          setStudent(currentStudent.student)
        } else {
          setStudent(null)
        }
      } catch (error) {
    console.log(error)
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
      <div className="w-10 h-10 rounded-full bg-gray-400 animate-pulse" />
    )
  }

  if (!student) {
    return <Button onClick={() => router.push("/register")}>Register</Button>
  }

  return (
    <Menubar className="flex items-center">
      <MenubarMenu>
        <MenubarTrigger asChild className="shadow-none border-none">
          <Avatar className="cursor-pointer shadow-none">
            <AvatarFallback className="bg-black shadow-none text-white p-3">
              {student.email.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent align="end">
          <MenubarItem onClick={()=>router.push("/create")} className="rounded-none">Create</MenubarItem>
          <MenubarItem onClick={()=>router.push("/lost-items")} className="rounded-none">Lost Items</MenubarItem>
          <MenubarItem onClick={()=>router.push("/found")} className="rounded-none">Found Items</MenubarItem>
          <MenubarItem onClick={handleLogout} className="rounded-none">Logout</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default ProfileButton
