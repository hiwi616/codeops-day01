"use client";

import { useState } from "react";
import { cancelOrder } from "@/app/auth-actions";

export function SecurityAttackDemo({ currentOrderId }) {
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(false);

  // Attack 1 & 2: Trigger Server Action directly with target order ID
  const runActionAttack = async (targetOrderId, label) => {
    setLoading(true);
    setLog(null);
    try {
      const res = await cancelOrder(targetOrderId);
      setLog({
        attack: label,
        status: res?.status || 200,
        response: JSON.stringify(res, null, 2),
      });
      console.warn(`[Security Audit - ${label}] Server Response:`, res);
    } catch (err) {
      setLog({
        attack: label,
        status: 500,
        response: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-700 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
          🛡️ Capstone Security Verification Battery (Live Demo)
        </h3>
        <span className="text-xs text-slate-400 font-mono">
          Layer 1–3 Defense Proof
        </span>
      </div>
      <p className="text-xs text-slate-300 mb-4">
        Trigger the three required verification attacks against live Server
        Actions and Open Redirect sanitizers:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <button
          type="button"
          disabled={loading}
          onClick={() =>
            runActionAttack(
              currentOrderId,
              "Attack 1: Unauthenticated / Session Check",
            )
          }
          className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs font-semibold text-left transition"
        >
          <span className="block text-red-400 font-bold mb-0.5">
            Attack 1: Action Call
          </span>
          <span className="text-slate-400 text-[11px]">
            Invoke cancelOrder(&quot;{currentOrderId}&quot;)
          </span>
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() =>
            runActionAttack(
              "ord_102",
              "Attack 2: Tampered ID (Dawit's Order ord_102)",
            )
          }
          className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs font-semibold text-left transition"
        >
          <span className="block text-amber-400 font-bold mb-0.5">
            Attack 2: Tampered Ownership
          </span>
          <span className="text-slate-400 text-[11px]">
            Cancel Dawit&apos;s order (ord_102)
          </span>
        </button>

        <a
          href="/signin?next=https://malicious.example.com"
          className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs font-semibold text-left transition block"
        >
          <span className="block text-blue-400 font-bold mb-0.5">
            Attack 3: Open Redirect
          </span>
          <span className="text-slate-400 text-[11px]">
            /signin?next=https://malicious...
          </span>
        </a>
      </div>

      {log && (
        <div className="bg-black/60 p-3.5 rounded-lg border border-slate-700 font-mono text-xs">
          <div className="text-slate-400 mb-1">{log.attack}</div>
          <pre className="text-emerald-400 overflow-x-auto">{log.response}</pre>
        </div>
      )}
    </div>
  );
}
