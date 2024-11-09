import Menu from "./Menu"
import Image from "next/image"
import LogoTest from "@/public/logo2.png"

export default function Header() {
    return (
        <div className="flex flex-row h-[50px] w-screen items-center px-[20px] z-50 border-b border-black">
            <div className="flex w-1/3 justify-start items-center gap-2">
                <Image src={LogoTest} alt="Logo" className="max-h-7 w-auto"/>
                <span>BitWeather</span>
            </div>
            <div className="flex w-1/3 justify-center border">
                <input type="text" placeholder="Search.." className="text-center w-[50%] border border-black rounded-xl">
                </input>
            </div>
            <div className="flex w-1/3 max-md:justify-end md:justify-end">
                <Menu/>
            </div>
        </div>
    )
}