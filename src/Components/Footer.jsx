import React from 'react'

const Footer = () => {
  return (
    <footer className="md:hidden bg-white text-black py-6 px-4 border-t border-gray-200 pb-25">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
        </div>

        <div className="flex gap-6 text-sm font-medium">
          <a href="/about" className="hover:text-gray-700 transition">About</a>
          <a href="/contact" className="hover:text-gray-700 transition">Contact</a>
          <a href="/privacy" className="hover:text-gray-700 transition">Privacy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
