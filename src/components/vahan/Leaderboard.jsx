"use client";
import Image from "next/image";
import React, { useState } from "react";
import MultiSelectDropdown from "./CustomMultiSelectDropdown";

const LeaderBoard = ({ data, leaderBoardType }) => {
    const allRTOs = data.map((d) => d.rto);
    const [selectedRTO, setSelectedRTO] = useState(allRTOs);

    // ✅ Aggregate counts
    const aggregatedData = {};
    data.filter((item) => selectedRTO.includes(item.rto)).forEach((rtoData) => {
        rtoData.brands.forEach(({ brand, count }) => {
            aggregatedData[brand] = (aggregatedData[brand] || 0) + count;
        });
    });

    const leaderboard = Object.entries(aggregatedData)
        .map(([brand, count]) => ({ brand, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    const topThree = leaderboard.slice(0, 3);
    const rest = leaderboard.slice(3);

    return (
        <div
            className={`w-full bg-gradient-to-t ${
                leaderBoardType === "rto"
                    ? "from-white to-primary"
                    : "from-white to-leaderBoardGreen"
            }  p-4 text-center relative`}
        >
            {/* ✅ Dropdown Filter */}
            <MultiSelectDropdown
                allOptions={allRTOs}
                selectedOptions={selectedRTO}
                setSelectedOptions={setSelectedRTO}
                leaderBoardType={leaderBoardType}
                allowEmptySelection={false}
            />

            <div className="px-10">
                {/* ✅ Top 3 Podium */}
                <div className="flex justify-center items-end mb-4 px-28 text-white">
                    {[topThree[1], topThree[0], topThree[2]].map(
                        (item, index) =>
                            item && (
                                <div key={index} className="w-full">
                                    <div className="flex flex-col items-center justify-center -mb-8">
                                        {index === 1 && (
                                            <div>
                                                <Image
                                                    src={`/crown.png`}
                                                    alt={"crown"}
                                                    width={50}
                                                    height={50}
                                                    className="mx-auto text-xs"
                                                />
                                            </div>
                                        )}
                                        <div
                                            className={`${
                                                index === 0
                                                    ? "border-2 border-leaderBoardBlue"
                                                    : ""
                                            } ${
                                                index === 1
                                                    ? "h-24 w-24 -mb-6 border-2 border-leaderBoardOrange"
                                                    : "h-20 w-20 -mb-8"
                                            } ${
                                                index === 2
                                                    ? "border-2 border-leaderBoardGreen"
                                                    : ""
                                            } bg-white rounded-full flex items-center justify-center `}
                                        >
                                            <Image
                                                src={`/images/${item.brand}.png`}
                                                alt={item.brand}
                                                width={50}
                                                height={50}
                                                className="mx-auto text-xs"
                                            />
                                        </div>
                                        <div
                                            className={` ${
                                                index === 0
                                                    ? "bg-leaderBoardBlue mt-6"
                                                    : ""
                                            } ${
                                                index === 1
                                                    ? "h-6 w-6 text-sm bg-primary font-semibold mt-2"
                                                    : "h-5 w-5 text-xs"
                                            } ${
                                                index === 2
                                                    ? "bg-leaderBoardGreen mt-6"
                                                    : ""
                                            } rounded-full text-white flex items-center justify-center`}
                                        >
                                            {index === 0
                                                ? "2"
                                                : index === 1
                                                ? "1"
                                                : "3"}
                                        </div>
                                    </div>
                                    <div
                                        className={`flex-1 ${
                                            index === 0 &&
                                            "h-20 bg-primary rounded-tl-xl rounded-bl-xl"
                                        } ${
                                            index === 1 &&
                                            "h-32 bg-leaderBoardRed shadow-topOne rounded-tl-xl rounded-tr-xl"
                                        } ${
                                            index === 2 &&
                                            "h-20 bg-primary rounded-tr-xl rounded-br-xl "
                                        } flex flex-col justify-end`}
                                    >
                                        <div
                                            className={`${
                                                index === 1 ? "pb-8" : "pb-2"
                                            }`}
                                        >
                                            <div
                                                className={`${
                                                    index === 1
                                                        ? "font-bold text-lg"
                                                        : "text-xs"
                                                }`}
                                            >
                                                {item.brand}
                                            </div>
                                            <div
                                                className={`${
                                                    index === 1
                                                        ? "text-sm"
                                                        : "text-xs"
                                                } font-bold`}
                                            >
                                                {item.count.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    )}
                </div>

                {/* ✅ Rest of leaderboard */}
                <div className="bg-white rounded-lg shadow py-2 px-4">
                    {rest.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between p-2 border-b last:border-none"
                        >
                            <div className="flex items-center gap-x-8">
                                <span className="h-5 w-5 bg-leaderBoardOrange rounded-full text-xs flex items-center justify-center">
                                    {index + 4}
                                </span>

                                <div className="relative w-[57px] h-[30px]">
                                    <Image
                                        src={`/images/${item.brand}.png`}
                                        alt={item.brand}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-sm">{item.brand}</span>
                            </div>
                            <span className="text-sm">
                                {item.count.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default LeaderBoard;
