"use client";
import Image from "next/image";
import Logo from "@/public/android-chrome-512x512.png";
import Link from "next/link";
import { BiInfoCircle } from "react-icons/bi";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="flex items-center gap-2.5 px-4 h-[70px] border-b border-b-(--contrast-01)">
        <Link href="/" className="flex items-center gap-3.5">
          <Image className="w-13 aspect-square rounded-(--border-radius)" src={Logo} alt="Logo" width={155} priority />
          <h1 className="text-[1.1rem] font-medium">FocusSpot | Spazi Studio</h1>
        </Link>
      </nav>
      {!pathname.includes("editor") && !pathname.includes("moderation") && (
        <div className="animate-[fade-in_.3s] flex items-center my-4 mx-4 rounded-(--border-radius)">
          <div className="relative w-full flex flex-col gap-2.5 overflow-hidden border-solid border-2 border-(--primary) text-(--primary) p-5 rounded-(--border-radius) before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-(--primary) before:opacity-20">
            <p className="flex gap-2.5 items-center">
              <BiInfoCircle size={20} />L'app è ancora in beta. Aiutaci a migliorarla:
            </p>
            <ul className="list-disc space-y-1.5 ml-15 z-1">
              <li>segnalando nuovi spazi di studio o lavoro da aggiungere alle mappe <Link className="text-(--primary-light) underline z-1" href="/editor/new">qui</Link>,</li>
              <li>sostenendo il progetto tramite una donazione <Link className="text-(--primary-light) underline z-1" href="https://ko-fi.com/focusspot" target="_blank">qui</Link>.</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}