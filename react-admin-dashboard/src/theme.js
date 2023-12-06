import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        // no changes
        grey: {
          // original
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
          // changes
          // 100: "#4d0000", // Adjusted color
          // 200: "#990000", // Adjusted color
          // 300: "#e60000", // Adjusted color
          // 400: "#cc0000", // Adjusted color
          // 500: "#ff0000", // Adjusted color
          // 600: "#ff3333", // Adjusted color
          // 700: "#ff6666", // Adjusted color
          // 800: "#ff9999", // Adjusted color
          // 900: "#ffcccc", // Adjusted color
          // changes 1
          // 100: "#ff6666", // Brighter red
          // 200: "#ff8080", // Brighter red
          // 300: "#ff9999", // Brighter red
          // 400: "#ffb3b3", // Brighter red
          // 500: "#ffcccc", // Brighter red
          // 600: "#ffd1d1", // Brighter red
          // 700: "#ffd6d6", // Brighter red
          // 800: "#ffdbdb", // Brighter red
          // 900: "#ffe0e0", // Brighter red
        },
        primary: {
          // original
          // 100: "#d0d1d5",
          // 200: "#a1a4ab",
          // 300: "#727681",
          // 400: "#1F2A40",
          // 500: "#141b2d",
          // 600: "#101624",
          // 700: "#0c101b",
          // 800: "#080b12",
          // 900: "#040509",
          // changes
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#4d4d4d", // Adjusted color
          500: "#333333", // Adjusted color
          600: "#292929", // Adjusted color
          700: "#1f1f1f", // Adjusted color
          800: "#141414", // Adjusted color
          900: "#0a0a0a", // Adjusted color
        },
        greenAccent: {
          // original
          // 100: "#dbf5ee",
          // 200: "#b7ebde",
          // 300: "#94e2cd",
          // 400: "#70d8bd",
          // 500: "#4cceac",
          // 600: "#3da58a",
          // 700: "#2e7c67",
          // 800: "#1e5245",
          // 900: "#0f2922",
          // changes
          // 100: "#1a1a1a",
          // 200: "#1c1c1c",
          // 300: "#1f1f1f",
          // 400: "#222222",
          // 500: "#252525",
          // 600: "#282828",
          // 700: "#2c2c2c",
          // 800: "#303030",
          // 900: "#333333",
          // changes 1
          100: "#f0f0f0", // Brighter gray
          200: "#e0e0e0", // Brighter gray
          300: "#d1d1d1", // Brighter gray
          400: "#c1c1c1", // Brighter gray
          500: "#b2b2b2", // Brighter gray
          600: "#a2a2a2", // Brighter gray
          700: "#939393", // Brighter gray
          800: "#838383", // Brighter gray
          900: "#747474", // Brighter gray
        },
        redAccent: {
          // original
          // 100: "#f8dcdb",
          // 200: "#f1b9b7",
          // 300: "#e99592",
          // 400: "#e2726e",
          // 500: "#db4f4a",
          // 600: "#af3f3b",
          // 700: "#832f2c",
          // 800: "#58201e",
          // 900: "#2c100f",
          // changes
          // 100: "yellow",
          // 200: "yellow",
          // 300: "yellow",
          // 400: "yellow",
          // 500: "yellow",
          // 600: "yellow",
          // 700: "yellow",
          // 800: "yellow",
          // 900: "yellow",
          // changes 1
          100: "#b0b1b5", // Darker gray
          200: "#81848b", // Darker gray
          300: "#545662", // Darker gray
          400: "#3a3a3a", // Darker gray
          500: "#1f1f1f", // Darker gray
          600: "#151515", // Darker gray
          700: "#0b0b0b", // Darker gray
          800: "#000000", // Darker gray
          900: "#000000", // Darker gray
        },
        blueAccent: {
          // original
          // 100: "#e1e2fe",
          // 200: "#c3c6fd",
          // 300: "#a4a9fc",
          // 400: "#868dfb",
          // 500: "#6870fa",
          // 600: "#535ac8",
          // 700: "#3e4396",
          // 800: "#2a2d64",
          // 900: "#151632",
          // changes 1
          // 100: "#4d0000", // Adjusted color
          // 200: "#990000", // Adjusted color
          // 300: "#e60000", // Adjusted color
          // 400: "#cc0000", // Adjusted color
          // 500: "#ff0000", // Adjusted color
          // 600: "#ff3333", // Adjusted color
          // 700: "#ff6666", // Adjusted color
          // 800: "#ff9999", // Adjusted color
          // 900: "#ffcccc", // Adjusted color
          // changes 2
          // 100: "#330000", // Darker red
          // 200: "#660000", // Darker red
          // 300: "#990000", // Darker red
          // 400: "#800000", // Darker red
          // 500: "#cc0000", // Darker red
          // 600: "#bf0000", // Darker red
          // 700: "#b20000", // Darker red
          // 800: "#a50000", // Darker red
          // 900: "#990000", // Darker red
          // changes 3
          100: "#d2b48c", // Light brown
          200: "#c2a172", // Light brown
          300: "#b2925a", // Light brown
          400: "#a28442", // Medium brown
          500: "#916f30", // Medium brown
          600: "#7e5d20", // Medium brown
          700: "#6b4c10", // Dark brown
          800: "#593c00", // Dark brown
          900: "#472b00", // Dark brown
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0", // manually changed
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              // original
              main: colors.primary[500],
              // changes
              // main: colors.primary[100],
            },
            secondary: {
              // original
              main: colors.greenAccent[500],
              // changes
              // main: colors.greenAccent[900],
            },
            neutral: {
              // original
              dark: colors.grey[700],
              // dark: colors.grey[900],
              // original
              main: colors.grey[500],
              // main: colors.grey[100],
              // original
              light: colors.grey[100],
            },
            background: {
              // original
              // default: colors.primary[500],
              // changes
              default: colors.primary[600],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
