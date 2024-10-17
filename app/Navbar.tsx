'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from "react-icons/fa";
import classNames from 'classnames';
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const NavBar = () => {
  return (
    <nav className='mb-6 px-5 py-4 border-b'>
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/"><FaBug /></Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' }
  ]
  return (
    <ul className='flex space-x-6'>
      {
        links.map(link => <li key={link.href}>
          <Link
            className={classNames({
              'nav-link' : true,
              '!text-zinc-950': currPath === link.href,
            })}
            href={link.href}>{link.label}</Link></li>)
      }
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  return (
    <Box>
      {
        status === 'authenticated' && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={session.user?.image!}
                fallback="?"
                size="2"
                radius='full'
                className='cursor-pointer'
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size="2">
                  {session.user?.email}
                </Text>
              </DropdownMenu.Label>
              <DropdownMenu.Item>
                <Link href="/api/auth/signout">Logout</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )
      }
      {
        status === 'unauthenticated' && (
          <Link href="/api/auth/signin" className='nav-link'>Login</Link>
        )
      }
    </Box>
  );
};

export default NavBar