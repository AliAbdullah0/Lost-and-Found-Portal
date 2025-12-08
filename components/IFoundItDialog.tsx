"use client"

import { useState } from "react"
import { sendIfoundItEmail } from "@/actions/email.actions"
import { toast } from "sonner"
import { send } from "node:process"
import { Button } from "./ui/button"

interface Props {
  creatorEmail: string
  itemName: string
}

const IFoundItDialog = ({ creatorEmail, itemName }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const form = e.target

    const res = await sendIfoundItEmail({
      to: creatorEmail,
      itemName,
      finderName: form.name.value,
      finderEmail: form.email.value,
      phone: form.phone.value,
      message: form.message.value,
    })

    setLoading(false)
    setOpen(false)

    if (res.success) toast.success("Email sent successfully!")
    else toast.error("Failed to send email.")
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full mt-3 bg-black hover:bg-black/80 transition text-sm py-600/70 text-white rounded-lg py-2"
      >
        I Found It
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[90%] max-w-md p-6">
            <h2 className="font-semibold text-lg mb-3">
              Contact Item Owner
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                required
                placeholder="Your name"
                className="w-full border p-2 rounded"
              />

              <input
                name="email"
                type="email"
                required
                placeholder="Your email"
                className="w-full border p-2 rounded"
              />

              <input
                name="phone"
                placeholder="Your phone (optional)"
                className="w-full border p-2 rounded"
              />

              <textarea
                name="message"
                required
                placeholder="Write your message..."
                className="w-full border p-2 rounded h-24"
              />

            <div className="flex gap-2">
              <Button
                disabled={loading}
                className=" bg-emerald-600 hover:bg-emerald-600/80 text-white py-2 rounded"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
            </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default IFoundItDialog
