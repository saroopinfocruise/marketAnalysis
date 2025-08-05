import Image from "next/image";
import React from "react";

const FeatureCard = ({ title, description, src }) => {
    return (
        <div className="shadow-card p-4 rounded-lg space-y-1">
            <div>
                <Image
                    src={src || "/logo.png"}
                    alt={title}
                    width={43}
                    height={43}
                    className=" text-xs"
                />
            </div>
            <div className="text-lg font-bold">{title}</div>

            <div className="text-sm font-normal w-10/12">{description}</div>
        </div>
    );
};

export default FeatureCard;
