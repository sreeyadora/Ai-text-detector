"use client";

import { useEffect, useState } from "react";
import PageTransition from "@/components/PageTransition";
import api from "@/services/api";

type HistoryItem = {
  text_preview: string;
  label: string;
  confidence: number;
  timestamp: string;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/history");
        setHistory(res.data || []);
      } catch (err) {
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">
          Analysis History
        </h1>

        <p className="text-blue-100 mb-10">
          View your past text analyses and their predictions.
        </p>

        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 shadow-2xl">
          {loading ? (
            <p className="text-blue-100 text-center">
              Loading history...
            </p>
          ) : history.length === 0 ? (
            <p className="text-blue-100 text-center">
              No analysis history yet.
            </p>
          ) : (
            <div className="space-y-4">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-white/10 border border-white/20 p-4"
                >
                  <p className="text-sm text-blue-200 mb-1">
                    {item.timestamp}
                  </p>

                  <p className="text-sm mb-2">
                    {item.text_preview}
                  </p>

                  <p className="text-sm font-semibold">
                    {item.label} · {(item.confidence * 100).toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
