"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, Phone, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { phone?: string; password?: string } = {};
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (phone.replace(/\s/g, "").length < 9) newErrors.phone = "Enter a valid phone number";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
  };

  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-ispani-950 via-ispani-900 to-ispani-800" />
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-ispani-500/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-ispani-400/8 blur-[100px]" />
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-[420px] mx-auto">
          <div className="text-center mb-10">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: "spring" }} className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ispani-500/20 border border-ispani-400/30 mb-5">
              <Leaf className="w-8 h-8 text-ispani-400" />
            </motion.div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">ISPANI</h1>
            <p className="text-ispani-300/80 text-sm mt-1.5 font-medium">Earn. Save. Grow Together.</p>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/[0.07] backdrop-blur-xl border border-white/10 rounded-3xl p-7 md:p-9 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Welcome Back</h2>
            <p className="text-ispani-300/60 text-sm mb-7">Sign in to continue to your account</p>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-ispani-200/80 text-sm font-medium">Phone Number <span className="text-red-400">*</span></Label>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3.5 pointer-events-none"><Phone className="w-4 h-4 text-ispani-400/60" /></div>
                  <div className="absolute left-10 top-0 bottom-0 flex items-center pointer-events-none"><span className="text-ispani-300/60 text-sm font-medium">+27</span></div>
                  <Input id="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="81 234 5678" value={phone} onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors((p) => ({ ...p, phone: undefined })); }} className={`pl-[4.5rem] h-12 bg-white/[0.06] border-white/10 text-white placeholder:text-white/25 rounded-xl ${errors.phone ? "border-red-400" : ""}`} />
                </div>
                {errors.phone && <p className="text-red-400 text-xs" role="alert">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-ispani-200/80 text-sm font-medium">Password <span className="text-red-400">*</span></Label>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3.5 pointer-events-none"><Lock className="w-4 h-4 text-ispani-400/60" /></div>
                  <Input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }} className={`pl-10 pr-12 h-12 bg-white/[0.06] border-white/10 text-white placeholder:text-white/25 rounded-xl ${errors.password ? "border-red-400" : ""}`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ispani-400/50 hover:text-ispani-300 cursor-pointer p-1" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
                {errors.password && <p className="text-red-400 text-xs" role="alert">{errors.password}</p>}
              </div>
              <div className="flex justify-end"><button type="button" className="text-ispani-400 text-xs font-medium hover:text-ispani-300 cursor-pointer">Forgot Password?</button></div>
              <Button type="submit" disabled={isLoading} className="w-full h-12 bg-ispani-500 hover:bg-ispani-600 text-white font-semibold rounded-xl text-base active:scale-[0.98] cursor-pointer shadow-lg shadow-ispani-500/25">{isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4 ml-2" /></>}</Button>
            </form>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center mt-7 text-ispani-300/50 text-sm">Don&apos;t have an account? <Link href="/register" className="text-ispani-400 font-semibold hover:text-ispani-300 cursor-pointer">Register</Link></motion.p>
        </motion.div>
      </main>
    </div>
  );
}
