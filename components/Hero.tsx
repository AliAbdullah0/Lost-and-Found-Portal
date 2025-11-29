"use client"

import React from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

const technologies = [
  {
    name: "Next.js",
    logo: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg",
  },
  {
    name: "React",
    logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
  },
  {
    name: "Tailwind",
    logo: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
  },
  {
    name: "Prisma",
    logo: "https://cdn.worldvectorlogo.com/logos/prisma-2.svg",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.worldvectorlogo.com/logos/postgresql.svg",
  },
]

const Hero = () => {
  const router = useRouter()

  return (
    <section className="w-full min-h-[70vh] bg-white dark:bg-gray-900 flex flex-col items-center justify-center text-center px-6 py-16">
      <div className="flex flex-col items-center gap-4 mb-8">
        <img
          src="https://lms.bahria.edu.pk/_viewfiles/images/logo.png"
          alt="Bahria Logo"
          className="w-20 h-20 object-contain"
        />

        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Bahria Lost & Found Portal
        </h1>

        <p className="mt-4 text-gray-500 dark:text-gray-300 max-w-xl">
          Find your lost items or report found ones. Connect with the Bahria community easily.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <Button
          onClick={() => router.push("/lost-items")}
          className="px-6 py-3 text-lg font-medium"
        >
          Lost Items
        </Button>

        <Button
          onClick={() => router.push("/found")}
          variant={"outline"}
          className="px-6 py-3 text-lg font-medium"
        >
          Found Items
        </Button>
      </div>
      <div className="mt-12 w-full max-w-4xl">
        <p className="mb-4 text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Built with
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 opacity-80 hover:opacity-100 transition"
            >
              <img
                src={tech.logo}
                alt={tech.name}
                className="h-7 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default Hero
