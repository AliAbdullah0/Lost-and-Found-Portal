"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createStudent } from "@/actions/student.actions"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email(),
  enrollment: z.string(),
})

const AuthForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      enrollment: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const res = await createStudent(values)
      if (res.success) {
        toast.success(res.message)
        router.push("/")
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Bahria Lost & Found Portal
          </h1>
          <p className="text-sm text-slate-500">
            Register yourself to continue
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="enrollment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enrollment No.</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0123456789"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11 text-base"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Confirming...
                </span>
              ) : (
                "Confirm"
              )}
            </Button>

          </form>
        </Form>
      </div>
    </div>
  )
}

export default AuthForm
