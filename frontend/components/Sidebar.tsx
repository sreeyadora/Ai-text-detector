"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  History,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside className="w-64 min-h-screen bg-white/10 dark:bg-black/20 backdrop-blur border-r border-white/20 p-6 flex flex-col">
      <h2 className="text-2xl font-extrabold mb-10">
        AI Detector
      </h2>

      <nav className="space-y-3 flex-1">
        {/* Dashboard (optional but kept) */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 transition"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        {/* History */}
        <Link
          href="/history"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 transition"
        >
          <History size={20} />
          History
        </Link>

        {/* Settings */}
        <Link
          href="/settings"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 transition"
        >
          <Settings size={20} />
          Settings
        </Link>
      </nav>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mt-6 flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </aside>
  );
}
