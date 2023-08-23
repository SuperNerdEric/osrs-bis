import {Box, Slider} from "@mui/material";
import React from "react";

const marks = [
    {
        value: 0,
        label: 0,
    },
    {
        value: 50,
        label: 50,
    },
    {
        value: 100,
        label: 100,
    },
    {
        value: 150,
        label: 150,
    },
    {
        value: 200,
        label: 200,
    },
    {
        value: 250,
        label: 250,
    },
    {
        value: 300,
        label: 300,
    },
    {
        value: 350,
        label: 350,
    },
    {
        value: 400,
        label: 400,
    },
    {
        value: 450,
        label: 450,
    },
    {
        value: 500,
        label: 500,
    },
    {
        value: 550,
        label: 550,
    },
    {
        value: 600,
        label: 600,
    },
];

function valuetext(value: number) {
    return `${value} Invocation level`;
}

export function DiscreteSliderMarks(props: { handleChange: (value: number) => void, value: number }) {
    const [sliderValue, setSliderValue] = React.useState(props.value);

    React.useEffect(() => {
        setSliderValue(props.value);
    }, [props.value]);

    return (
        <Box sx={{width: "90%", maxWidth: "1000px", mx: "auto"}}>
            <Slider
                aria-label="Custom marks"
                value={sliderValue}
                getAriaValueText={valuetext}
                step={5}
                valueLabelDisplay="auto"
                marks={marks}
                max={600}
                onChange={(event, value) => setSliderValue(value as number)}
                onChangeCommitted={(event, value) => props.handleChange(value as number)}
            />
        </Box>
    );
}
