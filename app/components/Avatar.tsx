'use client'

import Image from "next/image";

// Makes it so that if there is no avatar image to pull that it comes back null or undefined and puts default avatar
interface AvatarProps {
  src: string | null | undefined        
};

const Avatar: React.FC<AvatarProps> = ({
  src
}) => {
  return (
    <div>
      <Image className="rounded-full" height="30" width="30" alt="Avatar" src={src || "/images/placeholder.jpg"} />  
    </div>
  )
}

export default Avatar
