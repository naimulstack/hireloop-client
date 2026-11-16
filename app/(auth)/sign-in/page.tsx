
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import logo from "@/app/Images/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignInPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            email: "",
            password: "",
        };

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        setErrors(newErrors);

        if (newErrors.email || newErrors.password) return;

        setLoading(true);

        try {
            const { error } = await signIn.email({
                email: form.email.trim(),
                password: form.password,
                rememberMe: form.remember,
            });

            if (error) {
                toast.error(error.message || "Invalid email or password. Please try again.");
                return;
            }

            toast.success("Signed in successfully!");

            router.push("/");
            router.refresh();
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative flex min-h-[calc(100vh-6rem)] items-center justify-center overflow-hidden bg-[#0a0a0c] px-4 py-12 text-white">

            <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#6e56f8]/20 blur-[120px]" />

            <div className="relative my-20 w-full max-w-md rounded-2xl border border-white/10 bg-[#141417]/90 p-6 shadow-2xl shadow-black/50 backdrop-blur sm:p-8">

                <div className="flex flex-col items-center text-center">
                    <Link href="/" className="mb-6">
                        <Image
                            src={logo}
                            alt="HireLoop logo"
                            className="h-8 w-auto"
                            priority
                        />
                    </Link>

                    <h1 className="text-2xl font-bold sm:text-3xl">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-sm text-zinc-400">
                        Sign in to continue to your HireLoop account.
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        className="h-11 border-white/10 bg-white/[0.03] text-zinc-200 hover:bg-white/10 hover:text-white"
                    >
                        G Google
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        className="h-11 border-white/10 bg-white/[0.03] text-zinc-200 hover:bg-white/10 hover:text-white"
                    >
                        𝕏 GitHub
                    </Button>
                </div>

                <div className="my-6 flex items-center gap-3">
                    <span className="h-px flex-1 bg-white/10" />
                    <span className="text-xs uppercase tracking-widest text-zinc-500">
                        or continue with email
                    </span>
                    <span className="h-px flex-1 bg-white/10" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-300">
                            Email
                        </Label>

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                                className="h-11 border-white/10 bg-[#0e0e10] pl-10 text-white"
                            />
                        </div>

                        {errors.email && (
                            <p className="text-xs text-red-400">{errors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-zinc-300">
                                Password
                            </Label>

                            <Link
                                href="/forgot-password"
                                className="text-xs text-indigo-400 hover:text-indigo-300"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                                className="h-11 border-white/10 bg-[#0e0e10] pl-10 pr-10 text-white"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-xs text-red-400">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="remember"
                            checked={form.remember}
                            onCheckedChange={(checked) =>
                                setForm({ ...form, remember: checked === true })
                            }
                        />

                        <Label
                            htmlFor="remember"
                            className="cursor-pointer text-sm text-zinc-400"
                        >
                            Remember me
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="h-11 w-full bg-[#6e56f8] text-white hover:bg-[#5d46f5] disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                        {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                </form>

                <p className="mt-8 text-center text-sm text-zinc-400">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/sign-up"
                        className="font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </section>
    );
}
