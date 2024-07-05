'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return ( 
    <aside className="p-8 flex flex-col gap-4 border-r">
      <h1 className="text-sm text-neutral-300 font-bold uppercase">Nest Immo</h1>
      <nav className="flex flex-col gap-2">
        <Link
          href="/"
          className={`flex gap-2 items-center px-6 py-3 rounded-lg text-sm w-full font-bold ${pathname === '/' || pathname.includes('/posts') ? 'bg-blue-50' : 'duration-300 hover:bg-blue-50'} `}
        >
          <span className="flex w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Posts list
        </Link>
        <Link href="/categories" className={`flex gap-2 items-center px-6 py-3 rounded-lg text-sm w-full font-bold ${pathname.includes('/categories') ? 'bg-blue-50' : 'duration-300 hover:bg-blue-50'}`}>
          <span className="flex w-1.5 h-1.5 rounded-full bg-blue-500" />
          Categories list
        </Link>
      </nav>
    </aside>
  );
}
 
export default Navbar;
