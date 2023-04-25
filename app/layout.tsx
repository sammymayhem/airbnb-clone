import './globals.css'
import { Nunito } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/Modals/RegisterModal';
import LoginModal from './components/Modals/LoginModal';
import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';

export const metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ['latin'],
  weight: '400',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
        </body>
    </html>
  )
}
