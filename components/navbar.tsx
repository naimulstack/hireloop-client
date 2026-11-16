
"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import logo from "@/app/Images/logo.png";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useSession, signOut } from "@/lib/auth-client";

export function Navbar() {
    const { data: session } = useSession();

    const navLinks = [
        { label: "Browse Jobs", href: "/jobs" },
        { label: "Company", href: "/company" },
        { label: "Pricing", href: "/pricing" },
        { label: "Dashboard", href: `/dashboard/${session?.user.role?.toLowerCase() || 'seeker'}` },
    ];


    const handleSignOut = async () => {
        await signOut();
    }

    return (
        <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4 md:px-8">
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border border-white/5 bg-[#1c1c1e]/95 px-4 shadow-lg backdrop-blur md:px-6">
                <Link href="/" className="flex shrink-0 items-center">
                    <Image
                        src={logo}
                        alt="Hireloop logo"
                        priority
                        className="h-8 w-auto"
                    />
                </Link>

                <div className="hidden items-center md:flex">
                    <ul className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Separator
                        orientation="vertical"
                        className="mx-6 h-8 bg-white/15 py-5"
                    />

                    <div className="flex items-center gap-6">
                        {session?.user ?
                            <div className="flex gap-4">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5b5cf0] text-lg font-bold text-white">
                                    {session.user.name?.charAt(0).toUpperCase()}
                                </span>
                                <Button
                                    onClick={handleSignOut}
                                    nativeButton={false}
                                    render={<Link href="/sign-up" />}
                                    className="h-10 rounded-lg bg-gradient-to-r from-[#5b5cf0] to-[#7b61ff] px-5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
                                >
                                    Sign Out
                                </Button>
                            </div>
                            : <>
                                <Link
                                    href="/sign-in"
                                    className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                                >
                                    Sign In
                                </Link>

                                <Button
                                    nativeButton={false}
                                    render={<Link href="/sign-up" />}
                                    className="h-10 rounded-lg bg-gradient-to-r from-[#5b5cf0] to-[#7b61ff] px-5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
                                >
                                    Get Started
                                </Button>
                            </>}
                    </div>
                </div>

                <Sheet>
                    <SheetTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-200 hover:bg-white/10 hover:text-white md:hidden"
                            />
                        }
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Open menu</span>
                    </SheetTrigger>

                    <SheetContent
                        side="right"
                        className="flex w-72 flex-col border-white/10 bg-[#1c1c1e] text-white"
                    >
                        <SheetHeader>
                            <SheetTitle className="text-left text-white">
                                Menu
                            </SheetTitle>
                        </SheetHeader>

                        <nav className="mt-8 flex flex-col gap-6 px-4">
                            {navLinks.map((link) => (
                                <SheetClose
                                    key={link.href}
                                    nativeButton={false}
                                    render={
                                        <Link
                                            href={link.href}
                                            className="text-base font-medium text-gray-300 transition-colors hover:text-white"
                                        />
                                    }
                                >
                                    {link.label}
                                </SheetClose>
                            ))}

                            <Separator className="bg-white/10" />

                            <SheetClose
                                nativeButton={false}
                                render={
                                    <Link
                                        href="/sign-in"
                                        className="text-base font-medium text-indigo-400 hover:text-indigo-300"
                                    />
                                }
                            >
                                Sign In
                            </SheetClose>

                            <SheetClose
                                nativeButton={false}
                                render={
                                    <Link
                                        href="/sign-up"
                                        className={cn(
                                            buttonVariants(),
                                            "h-11 w-full bg-gradient-to-r from-[#5b5cf0] to-[#7b61ff] text-white hover:opacity-90"
                                        )}
                                    />
                                }
                            >
                                Get Started
                            </SheetClose>
                        </nav>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}
