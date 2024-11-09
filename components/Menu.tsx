"use client"

{/* import ContactUs from "./contactus" */}
import { Turn } from "hamburger-react";
import { useState } from "react";
import { useEffect } from "react";

const menuItems = [
    { label: 'Home', href: '#' },
    { label: 'Second', href: '#' },
    { label: 'Third', href: '#' }
]

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className="flex flex-row gap-4 items-center ">
            <div className={`
                flex
                flex-col 
                justify-start 
                max-md:pt-[50px] 
                md:flex-row 
                items-center 
                fixed
                gap-4 
                md:static z-0 
                max-md:bg-purple 
                right-0 
                top-[50px]
                w-[100vw] 
                h-[100%] 
                md:w-auto 
                md:border-none 
                transition-[transform,opacity]
                duration-1000
                ${isOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'} 
                top-[-40px]
                `}>
                {menuItems.map((item, index) => (
                    <a key={index} href={item.href} className="rounded-lg max-md:w-[150px] w-[80px] my-[5px] mx-[px] text-center">
                        {item.label}
                    </a>
                ))}
            </div>
            <div className="relative z-10 md:hidden">
                <Turn toggled={isOpen} onToggle={setIsOpen} color="black" size={22} />
            </div>
        </div>
    )
}