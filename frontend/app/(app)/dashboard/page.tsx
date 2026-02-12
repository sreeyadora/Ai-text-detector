"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  History,
  Settings,
  Sparkles,
  Upload,
  Folder,
} from "lucide-react";
import api from "@/services/api";

/* ================= TYPES ================= */

type ShapItem = {
  token: string;
  impact: number;
};

type ResultType = {
  label: string;
  confidence: number;
  shap?: ShapItem[];
  stylometry?: Record<string, number>;
};

/* ================= MAIN PAGE ================= */

export default function DashboardPage() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [folderFiles, setFolderFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState("");

  /* ================= ANALYZE ================= */

  const analyze = async () => {
    setError("");
    setResult(null);

    if (!text.trim() && !file && folderFiles.length === 0) {
      setError("Please enter text or upload a file.");
      return;
    }

    setLoading(true);

    try {
      if (text.trim()) {
        const res = await api.post("/predict", { text });
        setResult(res.data);
      } else if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await api.post("/predict-file", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setResult(res.data);
      } else if (folderFiles.length > 0) {
        const formData = new FormData();
        formData.append("file", folderFiles[0]);

        const res = await api.post("/predict-file", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setResult(res.data);
      }
    } catch (err) {
      setError("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-700 via-blue-700 to-purple-700 text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-black/30 backdrop-blur-xl border-r border-white/20">
        <div className="p-6 text-xl font-bold flex items-center gap-2">
          <Sparkles /> OriginAI
        </div>

        <nav className="px-4 space-y-1">
          <SidebarItem icon={<FileText />} label="New Analysis" active href="/dashboard" />
          <SidebarItem icon={<History />} label="History" href="/history" />
          <SidebarItem icon={<Settings />} label="Settings" href="/settings" />
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-10">
        <div className="mx-auto max-w-4xl space-y-8">

          {/* TEXT INPUT */}
          <textarea
            rows={8}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setFile(null);
              setFolderFiles([]);
            }}
            placeholder="Paste text here..."
            className="w-full rounded-xl bg-black/40 p-4"
          />

          {/* FILE + FOLDER UPLOAD */}
          <div className="grid grid-cols-2 gap-6">

            {/* FILE */}
            <div className="rounded-xl bg-white/15 p-4">
              <p className="mb-2 font-semibold flex items-center gap-2">
                <Upload /> Upload File
              </p>

              <input
                type="file"
                accept=".txt,.pdf,.docx"
                onChange={(e) => {
                  const f = e.target.files?.[0] || null;
                  setFile(f);
                  setText("");
                  setFolderFiles([]);
                }}
              />

              {file && (
                <p className="text-green-300 text-sm mt-2">
                  Selected: {file.name}
                </p>
              )}
            </div>

            {/* FOLDER */}
            <div className="rounded-xl bg-white/15 p-4">
              <p className="mb-2 font-semibold flex items-center gap-2">
                <Folder /> Upload Folder
              </p>

              <input
                type="file"
                multiple
                // @ts-ignore
                webkitdirectory="true"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setFolderFiles(files);
                  setFile(null);
                  setText("");
                }}
              />

              {folderFiles.length > 0 && (
                <p className="text-blue-300 text-sm mt-2">
                  Files selected: {folderFiles.length}
                </p>
              )}
            </div>
          </div>

          {/* ANALYZE BUTTON */}
          <button
            onClick={analyze}
            disabled={loading}
            className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-bold"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          {/* ERROR */}
          {error && <p className="text-red-300">{error}</p>}

          {/* RESULT */}
          {result && (
            <div className="bg-black/40 p-6 rounded-xl space-y-6">
              <p className="text-xl font-bold">
                {result.label} · {(result.confidence * 100).toFixed(2)}%
              </p>

              {/* SHAP */}
              {result.shap && (
                <div>
                  <h3 className="font-semibold mb-2">SHAP Explanation</h3>

                  {result.shap.length === 0 ? (
                    <p className="text-sm text-gray-300">
                      SHAP explanation not available for this prediction.
                    </p>
                  ) : (
                    <ul className="space-y-1 text-sm">
                      {result.shap.map((item, idx) => (
                        <li key={idx}>
                          <span className="text-blue-300">{item.token}</span>
                          {" → "}
                          {item.impact.toFixed(3)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* STYLOMETRY */}
              {result.stylometry && (
                <div>
                  <h3 className="font-semibold mb-2">Stylometric Features</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(result.stylometry).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between bg-white/10 px-3 py-1 rounded"
                      >
                        <span className="capitalize">
                          {key.replace(/_/g, " ")}
                        </span>
                        <span>{Number(value).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ================= SIDEBAR ITEM ================= */

function SidebarItem({
  icon,
  label,
  active,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href: string;
}) {
  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer ${
          active ? "bg-white/20 font-semibold" : "opacity-70"
        }`}
      >
        {icon}
        {label}
      </div>
    </Link>
  );
}
