"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

type HistoryItem = {
  text_preview: string;
  label: string;
  confidence: number;
  timestamp: string;
};

export default function HistoryPage() {
  const [data, setData] = useState<HistoryItem[]>([]);

  useEffect(() => {
    api.get("/history").then(res => setData(res.data));
  }, []);

  return (
    <div className="p-10 text-white">
      <h1 className="mb-6 text-3xl font-bold">History</h1>

      <div className="space-y-4">
        {data.map((item, i) => (
          <div key={i} className="rounded-xl bg-white/10 p-4">
            <p className="text-sm text-white/60">{item.text_preview}…</p>
            <div className="mt-2 flex justify-between text-sm">
              <span>{item.label}</span>
              <span>{(item.confidence * 100).toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
