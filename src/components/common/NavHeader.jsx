"use client";
import Image from "next/image";
import React from "react";

const NavHeader = ({ customerName, infoMsg, dataSourceName }) => {
    return (
        <header className="flex border border-primary shadow-custom ">
            <div className="py-3 px-4">
                <Image
                    src="/images/ai360.png"
                    alt="AutoIntel360 Logo"
                    width={257}
                    height={33}
                    priority
                />
                <div className="text-center">MARKET INSIGHTS</div>
            </div>

            <div className="bg-primary py-3 px-6 text-white flex-3 flex justify-between w-full">
                <div className="">
                    <h1 className="text-xl font-bold">
                        Welcome Back, Advait Hyundai!
                    </h1>
                    <p className="text-base font-normal text-gray-200">
                        {`Here's a snapshot of market performance for your market
                        preference!`}
                    </p>
                </div>

                <div className="flex items-center gap-x-2">
                    <span className="text-base font-normal">
                        Data Sourced from :
                    </span>
                    <Image
                        src="/images/vahan.png"
                        alt="AutoIntel360 Logo"
                        width={145}
                        height={54}
                        priority
                    />
                </div>
            </div>
        </header>
    );
};

export default NavHeader;
