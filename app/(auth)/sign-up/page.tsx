
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Mail,
    Lock,
    User,
    Eye,
    EyeOff,
    Briefcase,
    UserSearch,
} from "lucide-react";
import logo from "@/app/Images/logo.png";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function SignUpPage() {
    const router = useRouter();
    const [role, setRole] = useState("seeker");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [terms, setTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Enter a valid email address.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!terms) {
            setError("Please accept the Terms and Conditions.");
            return;
        }

        setLoading(true);

        try {
            const { error } = await signUp.email({
                name: name.trim(),
                email: email.trim(),
                password,
            });

            if (error) {
                toast.error(error.message || "Sign up failed. Please try again.");
                return;
            }

            toast.success("Account created successfully!");

            router.push("/");
            router.refresh();

        } catch {
            toast.error("Something went wrong!");
        }
    };

    const inputClass =
        "w-full rounded-lg border border-white/10 bg-[#0e0e10] py-3 pl-10 pr-10 text-sm text-white outline-none focus:border-[#6e56f8]";

    return (
        <section className="flex min-h-screen items-center justify-center bg-[#0a0a0c] px-4 py-12 text-white">
            <div className="mt-16 w-full max-w-md rounded-2xl border border-white/10 bg-[#141417] p-6 shadow-xl sm:p-8">

                <div className="mb-8 text-center">
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="HireLoop"
                            className="mx-auto mb-6 h-8 w-auto"
                            priority
                        />
                    </Link>

                    <h1 className="text-2xl font-bold">
                        Create your account
                    </h1>

                    <p className="mt-2 text-sm text-zinc-400">
                        Join HireLoop and find your next opportunity.
                    </p>
                </div>

                <div className="mb-6 grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setRole("seeker")}
                        className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-sm ${role === "seeker"
                            ? "border-[#6e56f8] bg-[#6e56f8]/10"
                            : "border-white/10"
                            }`}
                    >
                        <UserSearch size={17} />
                        Job Seeker
                    </button>

                    <button
                        type="button"
                        onClick={() => setRole("employer")}
                        className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-sm ${role === "employer"
                            ? "border-[#6e56f8] bg-[#6e56f8]/10"
                            : "border-white/10"
                            }`}
                    >
                        <Briefcase size={17} />
                        Employer
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="mb-2 block text-sm text-zinc-300">
                            Full Name
                        </label>

                        <div className="relative">
                            <User className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />

                            <input
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-zinc-300">
                            Email Address
                        </label>

                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />

                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-zinc-300">
                            Password
                        </label>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="At least 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={inputClass}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-zinc-500"
                            >
                                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-zinc-300">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />

                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={inputClass}
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-3.5 text-zinc-500"
                            >
                                {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 text-sm text-zinc-400">
                        <input
                            type="checkbox"
                            checked={terms}
                            onChange={(e) => setTerms(e.target.checked)}
                            className="mt-1 accent-[#6e56f8]"
                        />

                        <p>
                            I agree to the{" "}
                            <Link href="/terms" className="text-indigo-400">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-indigo-400">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-[#6e56f8] py-3 font-semibold transition hover:bg-[#5d46f5] disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <p className="mt-7 text-center text-sm text-zinc-400">
                    Already have an account?{" "}
                    <Link
                        href="/sign-in"
                        className="font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </section>
    );
}
