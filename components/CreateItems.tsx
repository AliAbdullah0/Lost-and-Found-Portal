"use client"

import { useState } from "react"
import { createLostItem, createFoundedItem } from "@/actions/student.actions"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const upload = async (file: File) => {
  try {
    const body = new FormData()
    body.append("file", file)
    body.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    )

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body,
      }
    )

    if (!res.ok) throw new Error("Upload failed")

    const data = await res.json()

    if (!data.secure_url) throw new Error("Image URL missing")

    return data.secure_url
  } catch (err) {
    console.error("Upload Error:", err)
    toast.error("Image upload failed!")
    throw err
  }
}

const CreateItems = () => {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState<string>("")

  const submit = async (type: "lost" | "found", formData: FormData) => {
    try {
      setLoading(true)

      const data = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        location: formData.get("location") as string,
        contactNo: Number(formData.get("contact") || 0) || undefined,
        image: image || "", 
        time: new Date(),
      }

      const result =
        type === "lost"
          ? await createLostItem(data)
          : await createFoundedItem(data)

      if (result.success) {
        toast.success(result.message)
        setImage("") // reset after success
      } else {
        toast.error(result.message)
      }

    } catch {
      toast.error("Submission failed")
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return

    setUploading(true)
    try {
      const url = await upload(e.target.files[0])
      setImage(url)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-[60vh] justify-center items-center gap-6">

      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold">Create a Report</h1>
        <p className="text-sm text-gray-500">
          Submit details for lost or found items on campus
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Report Lost Item</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report Lost Item</DialogTitle>
            </DialogHeader>

            <form action={(f) => submit("lost", f)} className="space-y-3">
              <Input name="name" placeholder="Item name" required />
              <Textarea name="description" placeholder="Description" required />
              <Input name="location" placeholder="Location" required />
              <Input name="contact" placeholder="Contact no" />

              <Input type="file" accept="image/*" onChange={handleUpload} />

              {image && (
                <img
                  src={image}
                  className="w-full h-40 object-cover rounded"
                  alt="Preview"
                />
              )}

              <Button disabled={loading || uploading}>
                {uploading
                  ? "Uploading..."
                  : loading
                    ? "Submitting..."
                    : "Submit"}
              </Button>

            </form>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Report Found Item</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report Found Item</DialogTitle>
            </DialogHeader>

            <form action={(f) => submit("found", f)} className="space-y-3">

              <Input name="name" placeholder="Item name" required />
              <Textarea name="description" placeholder="Description" required />
              <Input name="location" placeholder="Location" required />
              <Input name="contact" placeholder="Contact no" />

              <Input type="file" accept="image/*" onChange={handleUpload} />

              {image && (
                <img
                  src={image}
                  className="w-full h-40 object-cover rounded"
                  alt="Preview"
                />
              )}

              <Button disabled={loading || uploading}>
                {uploading
                  ? "Uploading..."
                  : loading
                    ? "Submitting..."
                    : "Submit"}
              </Button>

            </form>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  )
}

export default CreateItems
