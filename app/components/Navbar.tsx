import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import drip from './crop.png'
export default function Navbar() {
  return (
    <main className='flex flex-row items-center justify-between border-0 h-14 gap-10 bg-white shadow-xl font-bold'>
        <div>
            <Image src={drip} width={90} className='absolute top-1.5 left-3'/>
        </div>
        <div className='flex flex-row gap-10'>
            <Link href={"/"}>
                <h1 className='hover:bg-neutral-300 p-2 rounded-xl transition-all'>Products</h1>
            </Link>
            <Link href={"/account"}>
                <h1 className='hover:bg-neutral-300 p-2 rounded-xl transition-all'>Account</h1>
            </Link>
            <Link href={"/aboutus"}>
                <h1 className='hover:bg-neutral-300 p-2 rounded-xl transition-all'>About us</h1>
            </Link>
        </div>
        <div>

        </div>
    </main>
  )
}
