const Footer = () => {
  return (
    <footer className="w-full border-t mt-16 bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-5 py-6 flex md:flex-col flex-col-reverse md:flex-row items-center justify-between gap-4">
    <div className="space-y-2">
        <ul className="text-gray-600 text-sm">
            <li><span className="font-semibold">Ali Abdullah : </span>01-136252-010</li>
            <li><span className="font-semibold">Wasay Goraya : </span>01-136252-048</li>
        </ul>
        <p className="md:text-sm text-xs text-gray-500 ">
          © {new Date().getFullYear()} Lost & Found Portal. All rights reserved.
        </p>
        </div>
        <div className="flex items-center gap-5 text-sm text-gray-500">
          <a href="/found" className="hover:text-black transition">
            Found Items
          </a>
          <a href="/lost-items" className="hover:text-black transition">
            Lost Items
          </a>
        </div>

      </div>

    </footer>
  )
}

export default Footer
