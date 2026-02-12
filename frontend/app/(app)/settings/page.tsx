"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import PageTransition from "@/components/PageTransition";
import { Sun, Moon, Settings as SettingsIcon, User } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("username");
    setUsername(storedUser);
  }, []);

  if (!mounted) return null;

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 flex items-center gap-3">
          <SettingsIcon />
          Settings
        </h1>

        <p className="text-blue-100 mb-10">
          Customize your experience and view account details.
        </p>

        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 shadow-2xl space-y-8">

          {/* USER INFO */}
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-white/10">
              <User />
            </div>
            <div>
              <p className="text-sm text-blue-100">Logged in as</p>
              <p className="text-lg font-semibold">
                {username || "Guest"}
              </p>
            </div>
          </div>

          <hr className="border-white/20" />

          {/* THEME SETTINGS */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Theme</h2>
              <p className="text-sm text-blue-100">
                Switch between light and dark mode.
              </p>
            </div>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          <hr className="border-white/20" />

          {/* SYSTEM INFO */}
          <div>
            <h2 className="text-lg font-semibold mb-2">
              System Information
            </h2>

            <div className="space-y-2 text-sm text-blue-100">
              <p><b>Model:</b> Hybrid ML + Stylometry</p>
              <p><b>Explainability:</b> SHAP</p>
              <p><b>Backend:</b> FastAPI</p>
              <p><b>Frontend:</b> Next.js (App Router)</p>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
