'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();   // Allows for the Logo to lead back to home /

    return (
        <Image 
          onClick={() => router.push('/')}    // onClick brings you back to /
          alt='Logo' 
          className='hidden md:block cursor-pointer' 
          height='100' 
          width='100' 
          src='/images/logo.png' 
        />
    )
}

export default Logo;