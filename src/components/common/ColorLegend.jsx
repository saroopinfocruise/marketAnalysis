import React from "react";

const ColorLegend = ({ label, tileBgColor }) => {
    return (
        <div className="flex items-center gap-x-2">
            <div className={`w-8 h-4 ${tileBgColor} shadow-custom`} />
            <div className="text-xs">{label}</div>
        </div>
    );
};

export default ColorLegend;
