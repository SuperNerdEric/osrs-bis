import * as React from 'react';
import {Checkbox, Stack, TextField, Tooltip, Button, Typography, Grid, Container} from "@mui/material";
import bandosGodsword from './Images/Bandos_godsword_small.png';
import dragonWarhammer from './Images/Dragon_warhammer_small.png';
import {useMediaQuery} from '@mui/material';
import { useTheme } from '@mui/material/styles';



export default function DefenceReduction(props: { bossName: string, defenceLevel: number, maxReduction: number, handleChange: any }) {
    const [isChecked, setIsChecked] = React.useState<boolean>(false);
    const [localDefenceReduction, setLocalDefenceReduction] = React.useState(props.maxReduction);
    const [localDefenceReductionText, setLocalDefenceReductionText] = React.useState(String(props.maxReduction));
    const [tooltipOpen, setTooltipOpen] = React.useState<boolean>(false);

    const adjustDefenceReduction = (adjustment: number) => {
        const newValue = localDefenceReduction + adjustment;
        setDefenceReduction(newValue);
    };

    const setDefenceReductionExact = (newValue: string) => {
        if(newValue === "") {
            setLocalDefenceReductionText("");
            setLocalDefenceReduction(0);
        } else {
            setDefenceReduction(Number(newValue));
        }
    };

    const setDefenceReduction = (newValue: number) => {
        if (newValue > props.maxReduction) {
            newValue = props.maxReduction;
            setTooltipOpen(true);
            setTimeout(() => {
                setTooltipOpen(false);
            }, 3000);
        }
        if (newValue < 0) {
            newValue = 0;
        }
        setLocalDefenceReduction(newValue);
        setLocalDefenceReductionText(String(newValue));

        if (isChecked) {
            props.handleChange(newValue);
        }
    };

    React.useEffect(() => {
        if(localDefenceReduction > props.maxReduction) {
            setLocalDefenceReduction(props.maxReduction);
            setLocalDefenceReductionText(String(props.maxReduction));
        }
        if (isChecked) {
            props.handleChange(localDefenceReduction);
        }
    }, [localDefenceReduction, props.maxReduction, isChecked]);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Container maxWidth="sm">
                <Stack
                    key={`${props.bossName}-stack`}
                    direction={isSmallScreen ? "column" : "row"}
                    alignItems="center"
                    gap={2}
                    justifyContent="center"
                >
                    <Stack direction="row" alignItems="center" gap={2}>
                        {props.defenceLevel - (isChecked ? localDefenceReduction : 0)}/{props.defenceLevel} Defence
                        <img src={bandosGodsword} width="auto" height="45" alt="logo"/>
                        <img src={dragonWarhammer} width="auto" height="45" alt="logo"/>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={2}>
                        <Button sx={buttonStyle}
                                onClick={() => adjustDefenceReduction(-1)}>-</Button>
                        <Tooltip open={tooltipOpen}
                                 title={`Max defence reduction for ${props.bossName} is ${props.maxReduction}`}
                                 onClose={() => setTooltipOpen(false)}
                                 onOpen={() => setTooltipOpen(true)}>
                            <TextField
                                key={`${props.bossName}-textfield`}
                                id="outlined-number"
                                type="number"
                                color="warning"
                                value={localDefenceReductionText}
                                defaultValue={localDefenceReduction}
                                onChange={e => setDefenceReductionExact(e.target.value)}
                                InputProps={{
                                    style: {
                                        fontSize: 22,
                                    },
                                    inputProps: {
                                        min: 0,
                                        max: props.maxReduction,
                                    },
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={textFieldStyle}
                            />
                        </Tooltip>
                        <Button
                            sx={buttonStyle}
                            onClick={() => adjustDefenceReduction(1)}
                            onMouseLeave={() => setTooltipOpen(false)}
                        >
                            +
                        </Button>
                        <Tooltip title="Lower Defence">
                            <Checkbox
                                checked={isChecked}
                                onChange={e => {
                                    if (e.target.checked) {
                                        props.handleChange(localDefenceReduction);
                                    } else {
                                        props.handleChange(0);
                                    }
                                    setIsChecked(e.target.checked)
                                }}
                                sx={{
                                    color: "#d8ccb4",
                                    '&.Mui-checked': {
                                        color: '#d8ccb4',
                                    },
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 50
                                    }
                                }}
                            />
                        </Tooltip>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}

const textFieldStyle = {
    color: "black",
    backgroundColor: "#d8ccb4",
    width: 100,
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
    },
}

const buttonStyle = {
    color: "black",
    backgroundColor: '#d8ccb4',
    '&:hover': {
        backgroundColor: 'white',
        color: 'black',
    }
}