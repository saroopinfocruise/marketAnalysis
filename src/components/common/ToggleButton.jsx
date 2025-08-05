import React from "react";

const ToggleButton = ({ isOn, onToggle }) => {
    const handleToggle = () => {
        onToggle(!isOn); // Toggle state via parent callback
    };

    return (
        <div
            onClick={handleToggle}
            className={`relative inline-flex items-center h-[26px] w-[48px] cursor-pointer rounded-full transition-colors ${
                isOn ? "bg-primary" : "bg-gray-400"
            }`}
        >
            <span
                className={`inline-block w-[22px] h-[22px] transform bg-white rounded-full transition-transform ${
                    isOn ? "translate-x-6" : "translate-x-[2px]"
                }`}
            />
        </div>
    );
};

export default ToggleButton;
