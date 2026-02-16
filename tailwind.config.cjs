module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui", "sans-serif"]
      },
colors: {
  // Light
  app: "#f5f5f9",
  surface: "#ffffff",
  border: "rgba(3,3,3,0.08)",
  text: "#030303",
  muted: "rgba(3,3,3,0.60)",

  // 🔥 Better Dark Hierarchy
  appDark: "#0d0f14",          // page background (deep charcoal)
  surfaceDark: "#171c25",
  appDark: "#0d0f14",
  borderDark: "rgba(255,255,255,0.05)", // more subtle
  textDark: "#eef2f9",
  mutedDark: "rgba(232,237,245,0.68)"
}




    }
  },
  plugins: []
};
