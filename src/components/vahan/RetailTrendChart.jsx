"use client";
import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
);

import ToggleButton from "@components/common/ToggleButton";
import MultiSelectDropdown from "./CustomMultiSelectDropdown";

const brandLogos = {
    Hyundai: "/images/Hyundai.png",
    Honda: "/images/Honda.png",
    Maruthi: "/images/Maruti Suzuki.png",
    Mahindra: "/images/Mahindra.png",
    Tata: "/images/Tata.png",
    Kia: "/images/Kia.png",
    MG: "/images/MG.png",
};

function Table({ chartData, brands, rowHeading }) {
    if (!chartData.length) return <p>No data available</p>;

    return (
        <div className="overflow-x-auto mt-4">
            <table className="border-collapse border w-full min-w-[400px]">
                <thead>
                    <tr>
                        <th className="border p-2 bg-gray-100">
                            {rowHeading || ""}
                        </th>
                        {brands.map((brand) => (
                            <th key={brand} className="border p-2 bg-gray-100">
                                {brand}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {chartData.map((row) => (
                        <tr key={row.date}>
                            <td className="border p-2 font-semibold">
                                {row.date}
                            </td>
                            {brands.map((brand) => (
                                <td
                                    key={brand}
                                    className="border p-2 text-center"
                                >
                                    {row[brand] || 0}
                                </td>
                            ))}
                        </tr>
                    ))}
                    <tr className="bg-gray-100 font-bold">
                        <td className="border p-2">Total</td>
                        {brands.map((brand) => (
                            <td key={brand} className="border p-2 text-center">
                                {chartData.reduce(
                                    (sum, d) => sum + (d[brand] || 0),
                                    0
                                )}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

// ✅ Random unique color generator
const usedColors = new Set();
const getRandomColor = () => {
    let color;
    do {
        color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    } while (usedColors.has(color) || color.length < 7);
    usedColors.add(color);
    return color;
};

// ✅ Custom external tooltip
const customTooltip = (context) => {
    const { chart, tooltip } = context;
    let tooltipEl = chart.canvas.parentNode.querySelector(
        "div.chartjs-tooltip"
    );

    if (!tooltipEl) {
        tooltipEl = document.createElement("div");
        tooltipEl.classList.add("chartjs-tooltip");
        tooltipEl.style.cssText = `
          background: white;
          border: 1px solid #ccc;
          padding: 8px 12px;
          border-radius: 6px;
          pointer-events: none;
          position: absolute;
          transform: translate(-50%, 0);
          transition: all .1s ease;
          text-align: center;
          box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
        `;
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    if (tooltip.body) {
        const value = tooltip.dataPoints[0].formattedValue;
        const dataset = tooltip.dataPoints[0].dataset.label;
        const logo = brandLogos[dataset] || "";

        tooltipEl.innerHTML = `
            <div style="text-align:center;">
                <div style="font-size:18px;font-weight:bold;">${value}</div>
                ${
                    logo
                        ? `<img src="${logo}" width="40" height="20" style="margin:4px auto; display:block;" />`
                        : ""
                }
                <div style="font-size:12px;color:#333;">${dataset}</div>
            </div>
        `;
    }

    const { offsetLeft: posX, offsetTop: posY } = chart.canvas;
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = posX + tooltip.caretX + "px";
    tooltipEl.style.top = posY + tooltip.caretY - 40 + "px";
};

const RetailTrendChart = ({ retailTrendData, chartHeading }) => {
    const allRTOs = retailTrendData.map((d) => d.rto);
    const [selectedRTO, setSelectedRTO] = useState(allRTOs);
    const [viewTable, setViewTable] = useState(false);

    const { filteredData, brands, grandTotals, chartData } = useMemo(() => {
        usedColors.clear(); // reset used colors
        const rtoMap = {};
        const brandSet = new Set();
        const totals = {};
        const dateMap = {};

        for (const rtoItem of retailTrendData) {
            if (!selectedRTO.includes(rtoItem.rto)) continue;

            if (!rtoMap[rtoItem.rto]) rtoMap[rtoItem.rto] = {};

            for (const brandItem of rtoItem.brands) {
                const total = brandItem.data.reduce(
                    (sum, d) => sum + d.value,
                    0
                );
                rtoMap[rtoItem.rto][brandItem.brand] =
                    (rtoMap[rtoItem.rto][brandItem.brand] || 0) + total;

                brandSet.add(brandItem.brand);
                totals[brandItem.brand] =
                    (totals[brandItem.brand] || 0) + total;

                for (const entry of brandItem.data) {
                    if (!dateMap[entry.date])
                        dateMap[entry.date] = { date: entry.date };
                    dateMap[entry.date][brandItem.brand] =
                        (dateMap[entry.date][brandItem.brand] || 0) +
                        entry.value;
                }
            }
        }

        return {
            filteredData: rtoMap,
            brands: Array.from(brandSet),
            grandTotals: totals,
            chartData: Object.values(dateMap),
        };
    }, [selectedRTO]);

    // ✅ Chart Data
    const chartJSData = {
        labels: chartData.map((d) => d.date),
        datasets: brands.map((brand) => {
            const color = getRandomColor();
            return {
                label: brand,
                data: chartData.map((d) => d[brand] || 0),
                borderColor: color,
                backgroundColor: color,
                borderWidth: 2,
                tension: 0,
                pointRadius: 2,
                pointBorderWidth: 2,
                fill: false,
            };
        }),
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: "nearest",
            intersect: true,
        },
        plugins: {
            tooltip: {
                enabled: false,
                external: customTooltip,
            },
            legend: {
                position: "top",
                labels: {},
            },
        },
        scales: {
            y: { beginAtZero: true },
            x: {
                ticks: {
                    autoSkip: true, // skips labels if there’s too many
                    maxRotation: 60, // maximum tilt angle in degrees
                    minRotation: 45, // minimum tilt angle in degrees
                },
            },
        },
    };

    return (
        <div className="bg-white shadow-custom rounded-md">
            <div className="flex items-center justify-between p-4">
                <div>{chartHeading}</div>
                <div className="flex items-center gap-x-4">
                    <div>
                        <MultiSelectDropdown
                            allOptions={allRTOs}
                            selectedOptions={selectedRTO}
                            setSelectedOptions={setSelectedRTO}
                            leaderBoardType={"rto"}
                            allowEmptySelection={false}
                            isAbsolute={false}
                        />
                    </div>
                    <div className="flex items-center gap-x-4">
                        <ToggleButton
                            isOn={viewTable}
                            onToggle={() => setViewTable((prev) => !prev)}
                        />
                        <div
                            className={`text-sm font-medium ${
                                viewTable ? "text-primary" : "text-someGray"
                            }`}
                        >
                            Show Data table
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4">
                {viewTable ? (
                    <Table chartData={chartData} brands={brands} />
                ) : (
                    <div className="w-full h-80 relative">
                        <Line data={chartJSData} options={chartOptions} />
                    </div>
                )}
            </div>
        </div>
    );
};
export default RetailTrendChart;
