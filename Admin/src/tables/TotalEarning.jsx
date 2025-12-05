// src/tables/TotalEarning.jsx
import React from "react";
import { useSelector } from "react-redux";
import Icon from "@mdi/react";
import { mdiDotsVertical, mdiMenuUp } from "@mdi/js";


const formatCurrency = (val) =>
  typeof val === "number" ? val.toLocaleString() : val || "0";

const TotalEarning = ({ amount = 0 }) => {
  const { overview = {} } = useSelector((state) => state.adminsOrder || {});
  const topCategories = Array.isArray(overview.topCategories) ? overview.topCategories : [];

  const lastYear = typeof overview.lastYearRevenue === "number" ? overview.lastYearRevenue : null;
  const numericAmount = Number(amount || overview.totalRevenue || 0);

  const diff =
    typeof lastYear === "number" && lastYear !== 0
      ? Math.round(((numericAmount - lastYear) / Math.max(1, Math.abs(lastYear))) * 100)
      : null;

  // visual progress fallback: center around 50 and clamp
  const progress = diff !== null ? Math.min(Math.max(50 + diff, 6), 98) : 50;

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition transform-gpu
                 hover:-translate-y-0.5 overflow-hidden"
      role="region"
      aria-label="Total earnings"
    >
      {/* Header */}
      <div className="flex items-start justify-between px-4 py-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Total Earnings</h3>
          <p className="text-xs text-slate-600 mt-0.5">Overview of total revenue</p>
        </div>
        <button
          aria-label="more"
          className="p-1 rounded hover:bg-gray-50 active:bg-gray-100 text-slate-500"
          title="More"
        >
          <Icon path={mdiDotsVertical} size={0.9} />
        </button>
      </div>

      {/* Body */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-extrabold text-slate-900">₹{formatCurrency(numericAmount)}</div>
            <div className="text-xs text-slate-600 mt-1">Total revenue (current)</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-green-600 inline-flex items-center justify-center">
              <Icon path={mdiMenuUp} size={0.85} className="text-white" />
            </div>
            <div className="text-sm font-semibold" style={{ color: diff !== null ? (diff >= 0 ? "#16A34A" : "#DC2626") : "#16A34A" }}>
              {diff !== null ? `${diff >= 0 ? "+" : ""}${diff}%` : "+12%"}
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-3 mb-2">Compared to last year</p>

        {/* Progress bar */}
        <div className="w-full mb-3">
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-2.5 rounded-full bg-gradient-to-r from-green-400 to-green-600"
              style={{ width: `${progress}%` }}
              aria-hidden
            />
          </div>
          <div className="text-xs text-slate-500 mt-2">
            {diff !== null ? `${diff >= 0 ? "Up" : "Down"} ${Math.abs(diff)}% vs last year` : "Performance overview"}
          </div>
        </div>

        {/* Top categories list */}
        <div>
          {topCategories.length > 0 ? (
            topCategories.map((item, idx) => (
              <div
                key={item.title || idx}
                className={`flex items-center justify-between py-3 ${idx !== topCategories.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-gray-50 flex items-center justify-center overflow-hidden">
                    {item.imgSrc ? (
                      <img src={item.imgSrc} alt={item.title} className="max-h-8 object-contain" />
                    ) : (
                      <span className="text-sm font-semibold text-slate-700">{(item.title || "N").charAt(0)}</span>
                    )}
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-500">{item.subtitle || ""}</div>
                  </div>
                </div>

                <div className="text-right min-w-[90px]">
                  <div className="text-sm font-bold text-slate-900">₹{formatCurrency(Number(item.amount) || 0)}</div>
                  {typeof item.share === "number" && (
                    <div className="text-xs text-slate-500">{item.share}% of sales</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-3 text-sm text-slate-600">No top category data available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalEarning;
