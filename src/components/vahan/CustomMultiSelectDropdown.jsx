"use client";
import React, { useState, useRef, useEffect } from "react";

const MultiSelectDropdown = ({
    allOptions,
    selectedOptions,
    setSelectedOptions,
    leaderBoardType,
    allowEmptySelection = true, // ✅ New prop
    isAbsolute = true,
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // ✅ Function to ensure at least one option remains selected
    const toggleOption = (option) => {
        if (option === "All") {
            if (selectedOptions.length === allOptions.length) {
                // Unselect all only if empty selection is allowed
                if (allowEmptySelection) {
                    setSelectedOptions([]);
                }
            } else {
                setSelectedOptions(allOptions); // Select all
            }
        } else {
            if (selectedOptions.includes(option)) {
                const newSelection = selectedOptions.filter(
                    (item) => item !== option
                );
                if (newSelection.length === 0 && !allowEmptySelection) {
                    return; // ❌ Prevent unselecting the last one
                }
                setSelectedOptions(newSelection);
            } else {
                setSelectedOptions([...selectedOptions, option]);
            }
        }
    };

    // ✅ Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className={`${isAbsolute && "absolute right-5"}`}
            ref={dropdownRef}
        >
            <div className="relative text-left text-xs min-w-52">
                <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="w-full border p-2 rounded bg-white shadow"
                >
                    {selectedOptions.length === allOptions.length
                        ? `All ${
                              leaderBoardType === "rto"
                                  ? "your preferred RTO"
                                  : "India"
                          }`
                        : selectedOptions.join(", ")}
                </button>
                {dropdownOpen && (
                    <div className="absolute z-10 w-full bg-white border rounded shadow mt-1 p-2">
                        <label className="flex items-center gap-2 p-1 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={
                                    selectedOptions.length === allOptions.length
                                }
                                onChange={() => toggleOption("All")}
                            />
                            All{" "}
                            {leaderBoardType === "rto"
                                ? "your preferred RTO"
                                : "India"}
                        </label>
                        {allOptions.map((option) => (
                            <label
                                key={option}
                                className="flex items-center gap-2 p-1 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => toggleOption(option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MultiSelectDropdown;
