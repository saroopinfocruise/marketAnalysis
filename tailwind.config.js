/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,jsx,tsx,mdx}",
        "./src/app/**/*.{js,jsx,tsx,mdx}",
        "./src/components/**/*.{js,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                preferredMaker: "var(--color-preferredMaker)",
                competitorMaker: "var(--color-competitorMaker)",
                someGray: "var(--color-someGray)",
                leaderBoardGreen: "var(--color-leaderBoardGreen)",
                leaderBoardBlue: "var(--color-leaderBoardBlue)",
                leaderBoardOrange: "var(--color-leaderBoardOrange)",
                leaderBoardRed: "var(--color-leaderBoardRed)",
            },
            fontSize: {
                h1: [
                    "clamp(1.875rem, 4vw, 3.75rem)",
                    { lineHeight: "1.2", fontWeight: "700" },
                ], // 30px → 60px
                h2: [
                    "clamp(1.5rem, 3.5vw, 3rem)",
                    { lineHeight: "1.25", fontWeight: "600" },
                ], // 24px → 48px
                h3: [
                    "clamp(1.25rem, 3vw, 2.25rem)",
                    { lineHeight: "1.3", fontWeight: "600" },
                ], // 20px → 36px
                h4: [
                    "clamp(1.125rem, 2.5vw, 1.875rem)",
                    { lineHeight: "1.35", fontWeight: "500" },
                ], // 18px → 30px
                h5: [
                    "clamp(1rem, 2vw, 1.5rem)",
                    { lineHeight: "1.4", fontWeight: "500" },
                ], // 16px → 24px
                h6: [
                    "clamp(0.875rem, 1.8vw, 1.25rem)",
                    {
                        lineHeight: "1.4",
                        fontWeight: "500",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                    },
                ], // 14px → 20px
                p: [
                    "clamp(1rem, 2vw, 1.25rem)",
                    { lineHeight: "1.6", fontWeight: "400" },
                ], // 16px → 20px
            },
            boxShadow: {
                custom: "0px 4px 4px 0px rgba(0,0,0,0.25)",
                card: "0px 1px 21px 0px rgba(0,0,0,0.25)",
                topOne: "0px 1px 5px 0px rgba(0,0,0,0.25)",
            },
        },
    },
    plugins: [],
};
