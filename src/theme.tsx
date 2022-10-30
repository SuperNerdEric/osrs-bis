import {createTheme} from "@mui/material";

export function getTheme() {
    return createTheme({
        components: {
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        backgroundColor: '#d8ccb4',
                        color: 'black',
                        fontSize: '22px',
                        border: '1px solid #dadde9',
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
                        }
                    },
                },
            },
            MuiMenu: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        "& .MuiPaper-root": {
                            backgroundColor: "black"
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