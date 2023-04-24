import './globals.css'
import { Nunito } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import Modal from './components/Modals/Modal';

export const metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ['latin'],
  weight: '400',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Modal title='Hello World' isOpen />
          <Navbar />
        </ClientOnly>
        {children}
        </body>
    </html>
  )
}
