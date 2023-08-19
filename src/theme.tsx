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
                        fontSize: '18px',
                        border: '3px solid black',
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
            MuiSelect: {
                styleOverrides: {
                    select: {
                        color: "black",
                        backgroundColor: "#d8ccb4",
                        "&:hover": {
                            backgroundColor: "#d8ccb4",
                            color: "white",
                        }
                    },
                    icon: {
                        color: "black",  // adjust as needed
                    },
                },
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        color: "#d8ccb4",
                        '&.Mui-checked': {
                            color: '#d8ccb4',
                        },
                        '& .MuiSvgIcon-root': {
                            fontSize: 25 // Updated to match the iconSize
                        }
                    },
                },
                variants: [
                    {
                        props: { size: 'small' },
                        style: {
                            padding: '0px',
                            '& .MuiSvgIcon-root': {
                                fontSize: 25  // reduced font size for the icon
                            }
                        }
                    }
                ]
            }
        },
    });
}