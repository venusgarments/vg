// src/views/Dashboard.jsx
import React, { useEffect } from "react";
import AdminPannel from "../Styles/AdminPannelWrapper";
import Achivement from "../tables/Achivement";
import MonthlyOverview from "../tables/MonthlyOverView";
import SalesOverview from "../tables/WeeklyOverview";
import TotalEarning from "../tables/TotalEarning";
import { CardStatsVertical, customTheme } from "../them/customeThem";
import CustomersTable from "../tables/CustomersTable";
import { ThemeProvider } from "@mui/material/styles";
import "../Views/Admin.css";
import "../AdminPannel.css";
import RecentlyAddeddProducts from "../tables/RecentlyAddeddProducts";
import SalesOverTime from "../tables/SalesOverTime";
import RecentOrders from "../tables/RecentOrders";
import { Card, CardContent, Typography } from "@mui/material";
import Icon from "@mdi/react";
import {
  mdiBriefcaseVariantOutline,
  mdiHelpCircleOutline,
  mdiPoll,
  mdiCurrencyUsd
} from "@mdi/js";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardOverview } from "../Redux/Admin/Orders/Action";


const Dashboard = () => {
  const dispatch = useDispatch();
  const { overview, loading, error } = useSelector((state) => state.adminsOrder || {});

  useEffect(() => {
    dispatch(fetchDashboardOverview());
  }, [dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ThemeProvider theme={customTheme}>
        <AdminPannel>
          <div className="container mx-auto px-3 sm:px-4 py-4 max-w-[1600px] ">
            {/* Row 1 - Achievement & Monthly Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 ">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 hover:scale-[1.01] h-full">
                  <div className="p-4">
                    <Achivement sales={overview?.totalRevenue} />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 hover:scale-[1.01] h-full">
                  <div className="p-4">
                    <MonthlyOverview overview={overview} />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 - Sales Overview, Total Earning & Key Metrics */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">

  {/* ─── Sales Overview ─────────────────────────────── */}
  <div className="h-full">
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 hover:scale-[1.01] h-full">
      <div className="p-4 h-full">
        <SalesOverview overview={overview} />
      </div>
    </div>
  </div>

  {/* ─── Total Earnings ─────────────────────────────── */}
  <div className="h-full">
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 
                    transition-all duration-300 hover:scale-[1.01] h-full">
      <div className="p-4 h-full">
        <TotalEarning
          amount={overview?.totalRevenue}
          lastYearAmount={overview?.lastYearRevenue}
          topCategories={overview?.topCategories || []}
        />
      </div>
    </div>
  </div>

  {/* ─── Key Metrics ─────────────────────────────── */}
  <div className="md:col-span-2 lg:col-span-1 h-full">
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 
                    transition-all duration-300 hover:scale-[1.01] h-full">
      <div className="p-4 h-full flex flex-col">

        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          Key Metrics
        </h2>

        <div className="grid grid-cols-2 gap-3">

          <CardStatsVertical
            stats={`$${overview?.totalProfit || 0}`}
            icon={<Icon path={mdiPoll} size={0.85} />}
            color="success"
            trendNumber="+42%"
            title="Total Profit"
            subtitle="Weekly Profit"
          />

          <CardStatsVertical
            stats={`$${overview?.totalRefund || 0}`}
            title="Refunds"
            trend="negative"
            color="secondary"
            trendNumber="-15%"
            subtitle="Past Month"
            icon={<Icon path={mdiCurrencyUsd} size={0.85} />}
          />

          <CardStatsVertical
            stats={`${overview?.weeklyOrderCount || 0}`}
            trend="positive"
            trendNumber="+12%"
            title="New Orders"
            subtitle="Weekly Orders"
            icon={<Icon path={mdiBriefcaseVariantOutline} size={0.85} />}
          />

          <CardStatsVertical
            stats={`${overview?.totalQueries || 0}`}
            color="warning"
            trend="neutral"
            trendNumber="--"
            subtitle="Last Week"
            title="Sales Queries"
            icon={<Icon path={mdiHelpCircleOutline} size={0.85} />}
          />

        </div>
      </div>
    </div>
  </div>

</div>


            {/* Row 3 - Customers & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 hover:scale-[1.01] h-full">
                  <div className="p-4">
                    <CustomersTable customers={overview?.recentUsers || []} />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 hover:scale-[1.01] h-full">
                  <div className="p-4">
                    <RecentOrders orders={overview?.recentOrders || []} />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4 - Recent Products & Sales Over Time */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 hover:scale-[1.01] h-full">
                  <div className="p-4">
                    <RecentlyAddeddProducts />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 hover:scale-[1.01] h-full">
                  <div className="p-4">
                    <SalesOverTime />
                  </div>
                </div>
              </div>
            </div>

            {/* Full width table */}
            <div className="w-full">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 hover:scale-[1.01] h-full">
                <div className="p-4">
                  <CustomersTable />
                </div>
              </div>
            </div>
          </div>
        </AdminPannel>
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;