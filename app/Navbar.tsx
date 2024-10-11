import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";

const Navbar = () => {
  const links = [
    { label: 'Dashboard', href: '/'},
    { label: 'Issues', href: '/issues'}
  ]
  return (
    <nav className='flex space-x-6 mb-6 px-5 h-14 items-center border-b'>
      <Link href="/"><FaBug /></Link>
      <ul className='flex space-x-6'>
        { 
          links.map(link => <li>
            <Link
            key={link.href} 
            className='text-zinc-500 hover:text-zinc-950 transition-colors' 
            href={link.href}>{link.label}</Link></li>) 
        }
      </ul>
    </nav>
  )
}

export default Navbar