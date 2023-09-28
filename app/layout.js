import './globals.css'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '../redux/provider'
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shopster',
  description: 'E-commerce store built with Next.js, Redux, Tailwind CSS, Prisma and Stripe',
}
//q: is this component that i should wrap with session provider?

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className={inter.className}> <MantineProvider><ReduxProvider><Notifications position="top-right" zIndex={1000} />{children}</ReduxProvider> </MantineProvider></body>
    </html>
  )
}
