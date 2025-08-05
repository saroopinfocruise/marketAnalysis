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

const retailTrendData = [
    {
        rto: "Bangalore",
        brands: [
            {
                brand: "Maruthi",
                data: [
                    { date: "Week 1", value: 95 },
                    { date: "Week 2", value: 110 },
                    { date: "Week 3", value: 102 },
                    { date: "Week 4", value: 120 },
                    { date: "Week 5", value: 105 },
                ],
            },
            {
                brand: "Mahindra",
                data: [
                    { date: "Week 1", value: 65 },
                    { date: "Week 2", value: 72 },
                    { date: "Week 3", value: 80 },
                    { date: "Week 4", value: 90 },
                    { date: "Week 5", value: 78 },
                ],
            },
        ],
    },
    {
        rto: "Chennai",
        brands: [
            {
                brand: "Maruthi",
                data: [
                    { date: "Week 1", value: 60 },
                    { date: "Week 2", value: 70 },
                    { date: "Week 3", value: 68 },
                    { date: "Week 4", value: 75 },
                    { date: "Week 5", value: 82 },
                ],
            },
            {
                brand: "Mahindra",
                data: [
                    { date: "Week 1", value: 55 },
                    { date: "Week 2", value: 62 },
                    { date: "Week 3", value: 66 },
                    { date: "Week 4", value: 70 },
                    { date: "Week 5", value: 73 },
                ],
            },
        ],
    },
];

const brandLogos = {
    Hyundai: "/images/Hyundai.png",
    Honda: "/images/Honda.png",
    Maruthi: "/images/Maruti Suzuki.png",
    Mahindra: "/images/Mahindra.png",
    Tata: "/images/Tata.png",
    Kia: "/images/Kia.png",
    MG: "/images/MG.png",
};

function Table({ chartData, brands }) {
    if (!chartData.length) return <p>No data available</p>;

    return (
        <div className="overflow-x-auto mt-4">
            <table className="border-collapse border w-full min-w-[400px]">
                <thead>
                    <tr>
                        <th className="border p-2 bg-gray-100">Week</th>
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
                            <td className="border p-2 font-semibold">{row.date}</td>
                            {brands.map((brand) => (
                                <td key={brand} className="border p-2 text-center">
                                    {row[brand] || 0}
                                </td>
                            ))}
                        </tr>
                    ))}
                    <tr className="bg-gray-100 font-bold">
                        <td className="border p-2">Grand Total</td>
                        {brands.map((brand) => (
                            <td key={brand} className="border p-2 text-center">
                                {chartData.reduce((sum, d) => sum + (d[brand] || 0), 0)}
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
        ${logo
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

export default function App() {
    const rtoList = useMemo(
        () => [...new Set(retailTrendData.map((item) => item.rto))],
        []
    );
    const [selectedRTOs, setSelectedRTOs] = useState(rtoList);
    const [view, setView] = useState("table");

    const { filteredData, brands, grandTotals, chartData } = useMemo(() => {
        usedColors.clear(); // reset used colors
        const rtoMap = {};
        const brandSet = new Set();
        const totals = {};
        const dateMap = {};

        for (const rtoItem of retailTrendData) {
            if (!selectedRTOs.includes(rtoItem.rto)) continue;

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
    }, [selectedRTOs]);

    const handleCheckboxChange = (rto) => {
        setSelectedRTOs((prev) =>
            prev.includes(rto)
                ? prev.filter((item) => item !== rto)
                : [...prev, rto]
        );
    };

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
        },
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-3">Select RTO(s)</h2>
            <div className="border p-2 rounded mb-4">
                {rtoList.map((rto) => (
                    <label key={rto} className="block">
                        <input
                            type="checkbox"
                            checked={selectedRTOs.includes(rto)}
                            onChange={() => handleCheckboxChange(rto)}
                            className="mr-2"
                        />
                        {rto}
                    </label>
                ))}
            </div>

            <button
                onClick={() =>
                    setView((prev) => (prev === "table" ? "chart" : "table"))
                }
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                Switch to {view === "table" ? "Chart" : "Table"} View
            </button>

            {view === "table" ? (
                <Table
                    chartData={chartData}
                    brands={brands}
                />
            ) : (
                <div className="w-full h-80 relative">
                    <Line data={chartJSData} options={chartOptions} />
                </div>
            )}
        </div>
    );
}
