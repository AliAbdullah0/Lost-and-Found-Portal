"use client"

import { sendClaimEmail } from "@/actions/email.actions"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { toast } from "sonner"

const ClaimDialog = ({ itemId }: { itemId: string }) => {
  const [loading, setLoading] = useState(false)

  const submit = async (form: FormData) => {
    setLoading(true)

    const res = await sendClaimEmail({
      itemId,
      name: form.get("name") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      message: form.get("message") as string,
    })

    if (res.success) toast.success(res.message)
    else toast.error(res.message)

    setLoading(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>It's Mine</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Claim This Item</DialogTitle>
        </DialogHeader>

        <form action={submit} className="space-y-3">
          <Input name="name" placeholder="Full Name" required />
          <Input name="email" placeholder="Email" required />
          <Input name="phone" placeholder="Phone" required />
          <Textarea
            name="message"
            placeholder="Describe proof that this item is yours"
            required
          />

          <Button disabled={loading}>
            {loading ? "Sending..." : "Send Claim"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ClaimDialog
