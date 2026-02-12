"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageTransition from "@/components/PageTransition";
import { Lock, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!userId || !password) {
      setError("Please enter User ID and Password.");
      return;
    }

    // 🔐 TEMPORARY DEMO LOGIN (NO BACKEND)
    if (userId === "admin" && password === "admin123") {
      // 🔥 STORE USERNAME FOR SETTINGS PAGE
      localStorage.setItem("username", userId);

      router.push("/history");
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 shadow-2xl">

          <h1 className="text-3xl font-extrabold mb-6 text-center">
            Login
          </h1>

          {/* User ID */}
          <div className="mb-4">
            <label className="block text-sm mb-1">User ID</label>
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
              <User size={18} />
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter user ID"
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm mb-1">Password</label>
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
              <Lock size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-300 text-sm mb-4">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-white text-indigo-700 py-3 rounded-xl font-bold hover:scale-[1.02] transition"
          >
            Login
          </button>

          <p className="text-xs text-blue-100 mt-4 text-center">
            Demo credentials: <b>admin / admin123</b>
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
