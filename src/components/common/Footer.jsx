import Image from "next/image";
import React from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-[#1E4B87] text-white">
            <div className="px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 py-6">
                {/* Left Section */}
                <div className="w-1/3 flex flex-col items-start text-center  md:gap-y-6 md:py-4">
                    <div className="bg-white rounded-xl px-4 py-2">
                        <Image
                            src="/images/ai360.png"
                            alt="AutoIntel360 Logo"
                            width={257}
                            height={33}
                            priority
                        />
                        <div className="text-center text-black ">
                            MARKET INSIGHTS
                        </div>
                    </div>
                    <div className="flex space-x-6">
                        <a
                            href="#"
                            className="text-white text-xl hover:text-gray-300 rounded-full"
                        >
                            <Image
                                src="/images/social_icons/instagram.png"
                                alt="AutoIntel360 Logo"
                                width={53}
                                height={53}
                                priority
                            />
                        </a>
                        <a
                            href="#"
                            className="text-white text-xl hover:text-gray-300"
                        >
                            <Image
                                src="/images/social_icons/twitter.png"
                                alt="AutoIntel360 Logo"
                                width={53}
                                height={53}
                                priority
                            />
                        </a>
                        <a
                            href="#"
                            className="text-white text-xl hover:text-gray-300"
                        >
                            <Image
                                src="/images/social_icons/facebook.png"
                                alt="AutoIntel360 Logo"
                                width={53}
                                height={53}
                                priority
                            />
                        </a>
                        <a
                            href="#"
                            className="text-white text-xl hover:text-gray-300"
                        >
                            <Image
                                src="/images/social_icons/linkdin.png"
                                alt="AutoIntel360 Logo"
                                width={53}
                                height={53}
                                priority
                            />
                        </a>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="w-1/3 text-center">
                    <h3 className="text-lg font-semibold">
                        Have any questions?
                    </h3>
                    <div>Email : support@autointel360.com</div>
                    <div>Phone : +91 886-189-8665</div>
                </div>

                {/* Right Section */}
                <div className="w-1/3 flex flex-col items-end justify-center">
                    <div>
                        <div className="text-sm">Data Sourced from :</div>
                        <div className="">
                            <Image
                                src="/images/vahan.png"
                                alt="AutoIntel360 Logo"
                                width={232}
                                height={86}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t-4 border-gray-300  py-3 text-center text-base px-4 md:px-8 flex items-center justify-between">
                <div>
                    © 2025 Infocruise Solutions Private Limited. Trademarks and
                    brands are the property of their respective owners.
                </div>
                <div className="mb-1">
                    Market Insights Powered by AutoIntel360.com
                </div>
            </div>
        </footer>
    );
};

export default Footer;
