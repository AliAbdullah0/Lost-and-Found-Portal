import Link from "next/link"
import ProfileButton from "./ProfileButton"
import { Button } from "./ui/button"

const Navigation = () => {
  return (
    <nav className="w-full h-16 px-6 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center gap-2">
        <Link href="/" className="md:text-xl text-lg font-black">
          Bahria Lost & Found.
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Button asChild variant={"outline"}><Link href={'/'}>Home</Link>
        </Button>
        <ProfileButton />
      </div>

    </nav>
  )
}

export default Navigation
