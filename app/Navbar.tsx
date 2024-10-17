'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from "react-icons/fa";
import classNames from 'classnames';
import { useSession } from 'next-auth/react'
import { Box } from '@radix-ui/themes';

const NavBar = () => {
  const currPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' }
  ]
  return (
    <nav className='flex space-x-6 mb-6 px-5 h-14 items-center border-b'>
      <Link href="/"><FaBug /></Link>
      <ul className='flex space-x-6'>
        {
          links.map(link => <li key={link.href}>
            <Link
              className={classNames({
                'text-zinc-950': currPath === link.href,
                'text-zinc-500': currPath !== link.href,
                'hover:text-zinc-800 transition-colors': true
              })}
              href={link.href}>{link.label}</Link></li>)
        }
      </ul>
      <Box>
        {status === 'authenticated' && <Link href="/api/auth/signout">Logout</Link>}
        {status === 'unauthenticated' && <Link href="/api/auth/signin">Login</Link>}
      </Box>
    </nav>
  )
}

export default NavBar