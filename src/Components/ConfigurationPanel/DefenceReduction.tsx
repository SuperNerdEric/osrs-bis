import * as React from 'react';
import {Stack, TextField, Tooltip} from "@mui/material";
import bandosGodsword from '../../Images/Bandos_godsword_small.png';
import dragonWarhammer from '../../Images/Dragon_warhammer_small.png';
import {calculateDefenceLevel, calculateHits, DefenceReductionSummary} from "../../Calculator/DefenceCalculator";

export default function DefenceReduction(props: { bossName: string, defenceLevel: number, maxReduction: number, handleCurrentDefence: any }) {
    const [dwhHits, setDwhHits] = React.useState(0);
    const [bgsDamage, setBgsDamage] = React.useState(0);
    const [currentDefence, setCurrentDefence] = React.useState(props.defenceLevel);
    const [tooltipOpen, setTooltipOpen] = React.useState<boolean>(false);

    const handleDWHChange = (newValue: number) => {
        const newSummary: DefenceReductionSummary = {
            dragonWarhammer: newValue,
            bandosGodsword: bgsDamage
        };
        const newDefence = calculateDefenceLevel(props.defenceLevel, newSummary, props.maxReduction);
        setCurrentDefence(newDefence);
        props.handleCurrentDefence(newDefence);
        setDwhHits(newValue);
    };

    const handleBGSChange = (newValue: number) => {
        const newSummary: DefenceReductionSummary = {
            dragonWarhammer: dwhHits,
            bandosGodsword: newValue
        };
        const newDefence = calculateDefenceLevel(props.defenceLevel, newSummary, props.maxReduction);
        setCurrentDefence(newDefence);
        props.handleCurrentDefence(newDefence);
        setBgsDamage(newValue);
    };

    const handleCurrentDefenceChange = (newValue: number) => {
        if (newValue < (props.defenceLevel - props.maxReduction)) {
            newValue = props.defenceLevel - props.maxReduction;
            setTooltipOpen(true);
            setTimeout(() => {
                setTooltipOpen(false);
            }, 2000);
        }

        const hits = calculateHits(newValue, props.defenceLevel);
        setCurrentDefence(newValue);
        props.handleCurrentDefence(newValue);
        setDwhHits(hits.dragonWarhammer);
        setBgsDamage(hits.bandosGodsword);
    };

    React.useEffect(() => {
        setDwhHits(0);
        setBgsDamage(0);
        setCurrentDefence(props.defenceLevel);
        props.handleCurrentDefence(props.defenceLevel);
    }, [props.defenceLevel]);

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '7px'}}>
            <Stack spacing={2} alignItems="center" direction="row">
                <Stack direction="row" alignItems="center" gap={1}>
                    <img src={dragonWarhammer} alt="Dragon Warhammer" width="30" height="30"/>
                    <TextField
                        type="number"
                        value={dwhHits}
                        onChange={e => {
                            const newValue = Math.min(Number(e.target.value), 99);
                            handleDWHChange(newValue);
                        }}
                        variant="outlined"
                        style={textFieldStyle}
                        inputProps={{style: {padding: 5}, min: 0, max: 99}}
                    />
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <img src={bandosGodsword} alt="Bandos Godsword" width="30" height="30"/>
                    <TextField
                        type="number"
                        value={bgsDamage}
                        onChange={e => {
                            const newValue = Math.min(Number(e.target.value), props.maxReduction);
                            handleBGSChange(newValue);
                        }}
                        variant="outlined"
                        style={textFieldStyle}
                        inputProps={{style: {padding: 5}, min: 0, max: props.maxReduction}}
                    />
                </Stack>
                <Stack direction="row" alignItems="center" gap={0}>
                <Tooltip
                    title={`Max defence reduction for ${props.bossName} is ${props.maxReduction}`}
                    open={tooltipOpen}
                    disableHoverListener
                    arrow
                >
                    <TextField
                        type="number"
                        value={currentDefence}
                        onChange={e => {
                            const newValue = Math.min(Number(e.target.value), props.defenceLevel);
                            handleCurrentDefenceChange(newValue);
                        }}
                        variant="outlined"
                        style={textFieldStyle}
                        inputProps={{style: {padding: 5}, min: 0, max: props.defenceLevel}}
                    />
                </Tooltip>
                <span style={labelStyle}>
                    /{props.defenceLevel} Defence
                </span>
                </Stack>
            </Stack>
        </div>
    );
}

const textFieldStyle = {
    color: "black",
    backgroundColor: "#d8ccb4",
    width: 75,
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
        '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
        '& input[type="number"]': {
            '-moz-appearance': 'textfield',
        },
    },
    '& .MuiInputLabel-root': {
        whiteSpace: 'nowrap',
    },
}

const labelStyle: React.CSSProperties = {
    fontSize: '18px',
    width: '50px',
    display: 'inline-block',
    textAlign: 'right',
    whiteSpace: 'nowrap',
};