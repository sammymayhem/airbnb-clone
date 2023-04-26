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

// Importing Nunito font from Google
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
  
  // Creates the structure for the top bar and makes it so that it only shows when not logged in
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
