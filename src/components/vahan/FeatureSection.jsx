import { FEATURE_LIST } from "@lib/constants";
import React from "react";
import FeatureCard from "./FeatureCard";

const FeatureSection = () => {
    return (
        <div>
            <header className="text-center py-16 px-36 space-y-4">
                <div className="font-bold text-primary text-3xl">
                    Unlock Full Access – Get Ahead in the Auto Market.
                </div>
                <div className="text-xl text-someGray">
                    You’ve seen what’s trending. Now it’s time to act. With full
                    access to AI360 Market Insights, dealership leaders get real
                    power tools to dominate their markets.
                </div>
            </header>
            <section className="flex items-center gap-4 px-4">
                {FEATURE_LIST.map(({ img_url, title, description }) => (
                    <div key={title} className="w-1/4">
                        <FeatureCard
                            src={img_url}
                            title={title}
                            description={description}
                        />
                    </div>
                ))}
            </section>
            <footer className="flex items-center justify-center py-12">
                <button className=" bg-primary text-white px-8 py-4 rounded-md font-bold text-xl">
                    Subscribe for Full access
                </button>
            </footer>
        </div>
    );
};

export default FeatureSection;
