import * as React from "react";

const ThemeContext = React.createContext();

const ThemeProvider = React.memo(({ initialTheme = "light", children }) => {
    const [theme, setTheme] = React.useState(initialTheme);

    const value = React.useMemo(
        () => ({
            theme,
            toggleTheme: () => setTheme((prev) => (prev === "light" ? "dark" : "light")),
        }),
        [theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
});

const useTheme = () => {
    const context = React.useContext(ThemeContext);
    if (!context) throw Error("ThemeContext need to be used in a ThemeProvider");
    return context;
};

export { ThemeProvider, useTheme };
