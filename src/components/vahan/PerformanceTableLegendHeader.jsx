import ColorLegend from "@components/common/ColorLegend";
import React from "react";

const PerformanceTableLegendHeader = ({ children }) => {
    return (
        <div className="flex items-center justify-between p-2">
            <div className="text-lg">{children}</div>
            <div className="flex items-center gap-x-4">
                <ColorLegend
                    label="Preferred  Maker "
                    tileBgColor="bg-preferredMaker"
                />
                <ColorLegend
                    label="Competitor  Maker "
                    tileBgColor="bg-competitorMaker"
                />
            </div>
        </div>
    );
};

export default PerformanceTableLegendHeader;
