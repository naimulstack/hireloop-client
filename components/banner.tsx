import Image from "next/image";
import Link from "next/link";
import {
    Search,
    MapPin,
    Briefcase,
    BarChart3,
    Users,
    Star,
    type LucideIcon,
} from "lucide-react";
import globe from "@/app/Images/globe.png"; // change extension if it's .jpg / .svg

const trendingPositions = [
    "Product Designer",
    "AI Engineering",
    "Dev-ops Engineer",
];

const stats: { icon: LucideIcon; value: string; label: string }[] = [
    { icon: Briefcase, value: "50K", label: "Active Jobs" },
    { icon: BarChart3, value: "12K", label: "Companies" },
    { icon: Users, value: "2M", label: "Job Seekers" },
    { icon: Star, value: "97%", label: "Satisfaction Rate" },
];

export function Banner() {
    return (
        <section className="relative bg-[#0a0a0c] text-white overflow-hidden">
            {/* Optional: if Navbar is already in layout.tsx, you can remove this from here */}


            {/* top content */}
            <div className="relative z-10 mx-auto max-w-6xl px-4 pt-36 text-center md:px-8 md:pt-40">        {/* badge */}
                <div className="flex items-center justify-center gap-3">
                    <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-white/25 sm:block lg:w-28" />
                    <div className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 backdrop-blur">
                        <span className="grid h-6 w-6 place-items-center rounded-md bg-white/10 text-sm">
                            🎁
                        </span>
                        <span className="bg-gradient-to-b from-amber-300 to-orange-500 bg-clip-text text-sm font-bold text-transparent">
                            50,000+
                        </span>
                        <span className="font-mono text-[11px] tracking-widest text-zinc-400">
                            NEW JOBS THIS MONTH
                        </span>
                    </div>
                    <span className="hidden h-px w-16 bg-gradient-to-l from-transparent to-white/25 sm:block lg:w-28" />
                </div>

                {/* heading */}
                <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-[56px] lg:leading-[1.1]">
                    Find Your Dream Job Today
                </h1>

                {/* subtext */}
                <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-400">
                    HireLoop connects top talent with world-class companies. Browse
                    thousands of curated opportunities and land your next role – faster.
                </p>

                {/* search bar */}
                <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-[#141417]/90 p-2 shadow-2xl shadow-black/50 backdrop-blur">
                    <label className="flex min-w-0 flex-1 items-center gap-2 px-2">
                        <Search className="h-4 w-4 shrink-0 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Job title, skill or company"
                            className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                        />
                    </label>

                    <span className="hidden h-6 w-px bg-white/10 sm:block" />

                    <label className="hidden items-center gap-2 px-2 sm:flex">
                        <MapPin className="h-4 w-4 shrink-0 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Location or Remote"
                            className="w-36 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                        />
                    </label>

                    <Link
                        href="/jobs"
                        aria-label="Search jobs"
                        className="grid h-10 w-11 shrink-0 place-items-center rounded-lg bg-[#6e56f8] transition-colors hover:bg-[#5d46f5]"
                    >
                        <Search className="h-[18px] w-[18px] text-white" />
                    </Link>
                </div>

                {/* trending positions */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                    <span className="text-sm text-zinc-500">Trending Position</span>
                    {trendingPositions.map((position) => (
                        <Link
                            key={position}
                            href={`/jobs?q=${encodeURIComponent(position)}`}
                            className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            {position}
                        </Link>
                    ))}
                </div>
            </div>

            {/* globe scene */}
            <div className="relative mt-10 aspect-[1440/640] w-full overflow-hidden">
                {/* Background globe image */}
                <Image
                    src={globe}
                    alt="Globe background"
                    fill
                    sizes="100vw"
                    priority
                    className="absolute inset-0 h-full w-full object-cover object-center opacity-85" />

                {/* Glow overlay to match screenshot */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/95 via-black/70 to-transparent pointer-events-none" />

                {/* overlay text */}
                <p className="absolute inset-x-0 top-[44%] mx-auto max-w-3xl px-4 text-center text-2xl leading-snug text-zinc-400 md:text-[28px] z-10">
                    Assisting over{" "}
                    <span className="font-semibold text-white">15,000 job seekers</span>
                    <br />
                    <span className="text-[#a5a1c8]">find their dream positions.</span>
                </p>

                {/* stats cards */}
                <div className="absolute inset-x-0 bottom-4 z-10">
                    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 md:grid-cols-4 md:gap-4 md:px-8">
                        {stats.map(({ icon: Icon, value, label }) => (
                            <div
                                key={label}
                                className="rounded-xl border border-white/[0.06] bg-gradient-to-b from-[#151517] to-[#0b0b0d] p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-white/15"
                            >
                                <Icon className="h-5 w-5 text-zinc-500" strokeWidth={1.8} />
                                <div className="mt-8 text-3xl font-bold text-white md:text-[34px]">
                                    {value}
                                </div>
                                <div className="mt-1 text-sm text-zinc-400">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}