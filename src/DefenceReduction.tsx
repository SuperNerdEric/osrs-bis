import * as React from 'react';
import {Checkbox, Stack, TextField, Tooltip, Button, Typography, Grid, Container} from "@mui/material";
import bandosGodsword from './Images/Bandos_godsword_small.png';
import dragonWarhammer from './Images/Dragon_warhammer_small.png';
import {useMediaQuery} from '@mui/material';
import { useTheme } from '@mui/material/styles';



export default function DefenceReduction(props: { bossName: string, defenceLevel: number, maxReduction: number, handleChange: any }) {
    const [isChecked, setIsChecked] = React.useState<boolean>(false);
    const [localDefenceReduction, setLocalDefenceReduction] = React.useState(props.maxReduction);
    const [tooltipOpen, setTooltipOpen] = React.useState<boolean>(false);

    const handleTextFieldChange = (e: any) => {
        let setValue: number = e.target.value;
        if (setValue > props.maxReduction) {
            setValue = props.maxReduction;
            setTooltipOpen(true);
        }
        if (setValue < 0) {
            setValue = 0;
        }
        setLocalDefenceReduction(setValue);
        if (isChecked) {
            props.handleChange(setValue);
        }
    };

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
                                onClick={() => {
                                    setLocalDefenceReduction(Math.max(localDefenceReduction - 1, 0));
                                    props.handleChange(localDefenceReduction);
                                }}>-</Button>
                        <Tooltip open={tooltipOpen}
                                 title={`Max defence reduction for ${props.bossName} is ${props.maxReduction}`}
                                 onClose={() => setTooltipOpen(false)}
                                 onOpen={() => setTooltipOpen(true)}>
                            <TextField
                                key={`${props.bossName}-textfield`}
                                id="outlined-number"
                                type="number"
                                color="warning"
                                value={localDefenceReduction}
                                defaultValue={localDefenceReduction}
                                onChange={handleTextFieldChange}
                                onInvalid={handleTextFieldChange}
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
                            onClick={() => {
                                if (localDefenceReduction >= props.maxReduction) {
                                    setTooltipOpen(true);
                                    setTimeout(() => {
                                        setTooltipOpen(false);
                                    }, 3000);
                                } else {
                                    setLocalDefenceReduction(localDefenceReduction + 1);
                                    props.handleChange(localDefenceReduction);
                                }
                            }}
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