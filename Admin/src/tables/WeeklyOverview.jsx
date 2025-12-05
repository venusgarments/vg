// src/tables/SalesOverview.jsx  (Tailwind version)
import React, { useState, useMemo } from "react";
import Icon from "@mdi/react";
import { mdiDotsVertical } from "@mdi/js";
import ReactApexCharts from "react-apexcharts";

/**
 * Tailwind-based SalesOverview
 * Props:
 *  - overview: { weeklySales: number[], monthlySales: number[], yearlySales: number[] }
 */
const SalesOverview = ({ overview = {} }) => {
  const [activeTab, setActiveTab] = useState("weekly");

  const weeklySales = Array.isArray(overview.weeklySales) ? overview.weeklySales : [];
  const monthlySales = Array.isArray(overview.monthlySales) ? overview.monthlySales : [];
  const yearlySales = Array.isArray(overview.yearlySales) ? overview.yearlySales : [];

  const chartData = {
    weekly: weeklySales,
    monthly: monthlySales,
    yearly: yearlySales,
  };

  const currentSeries = chartData[activeTab] || [];

// inside SalesOverview component, replace the existing useMemo(options) with this:

const options = useMemo(() => {
  const base = {
    chart: {
      id: "sales-line-chart",
      toolbar: { show: false },
      animations: { enabled: true },
      zoom: { enabled: false },
      background: "transparent",
      foreColor: "#374151" // default text color used by apex for some elements
    },
    dataLabels: {
      // set to true if you want numbers printed on each point
      enabled: false,
      style: {
        colors: ["#374151"],
        fontSize: "12px",
        fontWeight: "600"
      }
    },
    stroke: { curve: "smooth", width: 3 },
    markers: { size: 5, hover: { sizeOffset: 3 } },
    tooltip: {
      theme: "light",
      style: {
        fontSize: "13px",
        fontFamily: undefined
      },
      y: {
        formatter: (val) => (val === undefined || val === null ? "-" : `${val}`)
      }
    },
    grid: { borderColor: "#e6e6e6", strokeDashArray: 4 },
    colors: ["#9155FD"], // purple accent
    xaxis: {
      labels: {
        show: true,
        trim: true,
        style: {
          colors: "#4B5563", // slate-600
          fontSize: "12px"
        }
      },
      axisBorder: { color: "#e6e6e6" },
      axisTicks: { color: "#e6e6e6" }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `${value}`),
        style: {
          colors: "#4B5563", // slate-600
          fontSize: "12px"
        }
      }
    },
    legend: { show: false },
    responsive: [
      {
        breakpoint: 640,
        options: { chart: { height: 220 } }
      }
    ]
  };

  const categories =
    activeTab === "yearly"
      ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      : activeTab === "monthly"
      ? Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return { ...base, xaxis: { ...base.xaxis, categories } };
}, [activeTab]);


  // Performance text safety
  const getPerformanceText = () => {
    const data = currentSeries;
    if (!data || data.length < 2) return "Sales performance data is insufficient to evaluate trends.";
    const previous = Number(data[data.length - 2]) || 0;
    const current = Number(data[data.length - 1]) || 0;
    if (previous === 0) return "Not enough historical data to compute percentage change.";
    const diff = current - previous;
    const percentage = ((diff / Math.abs(previous)) * 100).toFixed(1);
    const sign = diff >= 0 ? "+" : "";
    return `Sales have ${diff >= 0 ? "increased" : "decreased"} by ${sign}${percentage}% compared to the previous period.`;
  };

  const percentChangeDisplay = (() => {
    if (!currentSeries || currentSeries.length < 2) return "N/A";
    const prev = Number(currentSeries.at(-2)) || 0;
    const cur = Number(currentSeries.at(-1)) || 0;
    if (prev === 0) return "N/A";
    return `${Math.round(((cur - prev) / Math.abs(prev)) * 100)}%`;
  })();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition transform-gpu hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between px-5 py-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Sales Overview</h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block text-sm text-slate-500">{/* optionally extra info */}</div>
          <button
            aria-label="more"
            className="text-slate-500 hover:text-slate-700 p-1 rounded"
            title="More"
          >
            <Icon path={mdiDotsVertical} size={0.9} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pb-2">
        <div role="tablist" aria-label="Sales tabs" className="inline-flex rounded-md bg-gray-50 p-1">
          {["weekly", "monthly", "yearly"].map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium px-3 py-1 rounded-md focus:outline-none transition ${
                activeTab === tab
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="px-4">
        <ReactApexCharts type="line" height={280} options={options} series={[{ name: "Sales", data: currentSeries }]} />
      </div>

      {/* Footer: percent and detail */}
      <div className="px-5 pb-5 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-semibold text-slate-900">{percentChangeDisplay}</div>
          <div className="text-sm text-slate-600">{getPerformanceText()}</div>
        </div>

        <div className="w-full sm:w-auto">
          <button className="mt-2 sm:mt-0 w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-sm">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesOverview;
