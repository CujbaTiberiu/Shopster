import { Provider } from 'react-redux'
import './globals.css'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '../redux/provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shopster',
  description: 'E-commerce store built with Next.js, Redux, Tailwind CSS, Prisma and Stripe',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}><ReduxProvider>{children}</ReduxProvider></body>
    </html>
  )
}
