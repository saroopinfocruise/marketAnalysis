import Footer from "@components/common/Footer";
import NavHeader from "@components/common/NavHeader";
import FeatureSection from "@components/vahan/FeatureSection";
import LeaderBoard from "@components/vahan/Leaderboard";
import PerformanceTable from "@components/vahan/PerformanceTable";
import RetailTrendChart from "@components/vahan/RetailTrendChart";
import React from "react";
import {
    retailTrendDataForMonth,
    retailTrendDataForWeek,
    retailTrendDataForYear,
    rtoDynamicData,
    rto_data,
} from "../../data";

export default function Home() {
    return (
        <div className="bg-gray-100">
            <NavHeader />
            <div className="p-2">
                <div className="m-2 space-y-4">
                    <PerformanceTable
                        key={1}
                        rtoDynamicData={rtoDynamicData}
                        legendHeaderTitle=" (28-07-2025)"
                    />
                    <PerformanceTable
                        key={2}
                        rtoDynamicData={rtoDynamicData}
                        legendHeaderTitle=" (7 Days :  15-07-2025 to 29-07-2025)"
                    />
                    <PerformanceTable
                        key={3}
                        rtoDynamicData={rtoDynamicData}
                        legendHeaderTitle=" (30 Days :  15-07-2025 to 29-07-2025 )"
                    />
                    <RetailTrendChart
                        retailTrendData={retailTrendDataForMonth}
                        chartHeading="Retails Trend - Day-wise From last 30 Days"
                    />
                    <RetailTrendChart
                        retailTrendData={retailTrendDataForWeek}
                        chartHeading="Retail Trends - Week-wise for Month of July-2025"
                    />
                    <RetailTrendChart
                        retailTrendData={retailTrendDataForYear}
                        chartHeading="Retail Trends - Month-wise for Month of Calendar Year-2025"
                    />
                </div>
                <div className="shadow-custom rounded-md mx-2">
                    <div className="px-4 text-xl py-4 bg-white">
                        Leaderboards for{" "}
                        <span className="font-bold">Current Month</span>{" "}
                    </div>
                    <div className="flex gap-x-[1px]">
                        <div className="w-1/2 ">
                            <LeaderBoard
                                data={rto_data}
                                leaderBoardType="rto"
                            />
                        </div>
                        <div className="w-1/2">
                            <LeaderBoard
                                data={rto_data}
                                leaderBoardType="state"
                            />
                        </div>
                    </div>
                </div>
                <FeatureSection />
            </div>
            <Footer />
        </div>
    );
}
