/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  relative: true,
  theme: {
    extend: {
      colors: {
        custom_violet: "#AD1FEA",
        custom_blue: "#4661E6",
        custom_very_dark_blue: "#373F68",
        custom_light_gray: "#F2F4FF",
        custom_very_light_gray: "#F7F8FD",
        custom_dark_blue: "#3A4374",
        custom_very_dark_gray: "#647196",
        custom_orange: "#F49F85",
        custom_sky_blue: "#62BCFA",
      },
      fontFamily: {
        Jost: "Jost",
      },
      screens: {
        // md: "768px",
        // lg: "1024px",
        // xl: "1440px",
      },
      container: {
        sm: "375px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
      },
      backgroundImage: {
        backgroundHeaderMobile: "url('../public/assets/suggestions/mobile/background-header.png')",
        backgroundHeaderTable: "url('../public/assets/suggestions/tablet/background-header.png')",
        backgroundHeaderDesktop:
          "url('../public/assets/suggestions/desktop/background-header.png')",
      },
    },
  },
  plugins: [],
};
