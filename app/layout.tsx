import './globals.css'
import { Nunito } from 'next/font/google';

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
      <body className={font.className}>{children}</body>
    </html>
  )
}
