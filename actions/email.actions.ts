"use server"

import prisma from "@/lib/prisma"
import { resend } from "@/lib/resend"


interface ClaimData {
  to: string   
  itemName: string
  finderName: string
  finderEmail: string
  phone?: string
  message: string
}


export const sendClaimEmail = async ({
  itemId,
  name,
  email,
  phone,
  message,
}: {
  itemId: string
  name: string
  email: string
  phone: string
  message: string
}) => {
  try {
    const item = await prisma.foundItem.findUnique({
      where: { id: itemId },
      include: { creator: true },
    })

    if (!item || !item.creator.email) {
      return { success: false, message: "Item not found" }
    }

    await resend.emails.send({
      from: `Bahria Lost & Found <${process.env.EMAIL_FROM}>`,
      to: item.creator.email,
      subject: "Someone claimed the Lost Item You Posted",
      html: `
        <h2>Lost Item You Posted Has Been Claimed</h2>

        <p><b>Item:</b> ${item.name}</p>

        <p><b>Claimant:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>

        <p><b>Message:</b></p>
        <p>${message}</p>

        <hr/>

        <p>
          Contact the claimant directly to verify & return the item.
        </p>
      `,
    })

    return { success: true, message: "Claim sent to Founder successfully" }

  } catch (error) {
    console.log(error)

    return {
      success: false,
      message: "Failed to send claim email",
    }
  }
}

export const sendIfoundItEmail = async ({
  to,
  itemName,
  finderName,
  finderEmail,
  phone,
  message,
}: ClaimData) => {
  try {
    await resend.emails.send({
      from: "Lost & Found <onboarding@resend.dev>",
      to,
      subject: `Someone found your lost item: ${itemName}`,
      html: `
        <h2>Your item "${itemName}" was found!</h2>
        <p><b>Name:</b> ${finderName}</p>
        <p><b>Email:</b> ${finderEmail}</p>
        ${phone ? `<p><b>Phone:</b> ${phone}</p>` : ""}
        <p><b>Message:</b></p>
        <blockquote>${message}</blockquote>
      `,
    })

    return { success: true }
  } catch (error) {
    console.log("Email Error:", error)
    return { success: false }
  }
}