import {createTheme} from "@mui/material";

export function getTheme() {
    return createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 1000,
                md: 1080,
                lg: 1280,
                xl: 1920,
            },
        },
        components: {
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        backgroundColor: '#d8ccb4',
                        color: 'black',
                        fontSize: '22px',
                        border: '1px solid #dadde9',
                        maxWidth: 'unset !important',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        backgroundColor: "black",
                        color: "white",
                        fontSize: '22px',
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        backgroundColor: "black",
                        color: "white",
                        '&:hover': {
                            backgroundColor: 'grey',
                        },
                    },
                },
            },
            MuiMenu: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        "& .MuiPaper-root": {
                            backgroundColor: "black",
                            minWidth: 175,
                        }
                    },
                },
            },
            MuiSlider: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        color: "white",
                        fontSize: '22px',
                    },
                    markLabel: {
                        color: "white"
                    }
                },
            },
        },
    });
}