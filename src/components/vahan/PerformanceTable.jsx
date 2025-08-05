import Image from "next/image";
import PerformanceTableLegendHeader from "./PerformanceTableLegendHeader";

const PerformanceTable = ({ rtoDynamicData, legendHeaderTitle }) => {
    // const [preferredMaker, setPreferredMaker] = useState("Mahindra"); // default brand
    const preferredMaker = "Mahindra";
    const allBrands = Object.keys(rtoDynamicData.totals);

    // Move preferred brand to the first column dynamically
    const sortedBrands = [
        preferredMaker,
        ...allBrands.filter((brand) => brand !== preferredMaker),
    ];
    return (
        <div className="shadow-custom bg-white">
            <PerformanceTableLegendHeader>
                <>
                    {"RTO-Wise - Retails Performance for the"}
                    <span className="font-bold">{legendHeaderTitle}</span>
                </>
            </PerformanceTableLegendHeader>
            <div className="overflow-x-auto ">
                <table className="min-w-full border border-gray-300">
                    {/* Table Header */}
                    <thead className="">
                        <tr>
                            <th className="border p-2 text-left"></th>
                            {sortedBrands.map((brand, index) => (
                                <th
                                    key={index}
                                    className="border p-2 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <div className="flex items-center justify-center">
                                            <div className="w-12 h-12 flex items-center justify-center">
                                                <Image
                                                    src={`/images/${brand}.png`}
                                                    alt={brand}
                                                    width={50}
                                                    height={50}
                                                    className="mx-auto text-xs"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-sm font-normal">
                                            {brand}
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="text-sm">
                        {/* Totals Row */}
                        <tr className="font-semibold">
                            <td className="border p-4">
                                Total of all your RTO :
                            </td>
                            {sortedBrands.map((brand, index) => (
                                <td
                                    key={index}
                                    className={`border p-4 text-center ${
                                        brand === preferredMaker
                                            ? "bg-preferredMaker"
                                            : "bg-competitorMaker"
                                    }`}
                                >
                                    {rtoDynamicData.totals[brand]}
                                </td>
                            ))}
                        </tr>

                        {/* Data Rows */}
                        {rtoDynamicData.rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50">
                                <td className="border p-4">{row.rto}</td>
                                {sortedBrands.map((brand, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={`border p-4 text-center ${
                                            brand === preferredMaker
                                                ? "bg-preferredMaker"
                                                : "bg-competitorMaker"
                                        }`}
                                    >
                                        {row[brand]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PerformanceTable;
