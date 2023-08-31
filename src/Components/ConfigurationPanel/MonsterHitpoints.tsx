import * as React from 'react';
import {Stack, TextField, Tooltip} from "@mui/material";
import hitpointsIcon from '../../Images/Skills/Hitpoints_icon.png';

interface MonsterHitpointsProps {
    monsterName: string;
    currentHitpoints: number;
    maxHitpoints: number;
    handleCurrentHitpointsChange: (hitpoints: number) => void;
}

export default function MonsterHitpoints(props: MonsterHitpointsProps) {
    React.useEffect(() => {
        if (Number(props.currentHitpoints) !== Number(props.maxHitpoints)) {
            props.handleCurrentHitpointsChange(props.maxHitpoints);
        }
    }, [props.maxHitpoints]);

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '7px'}}>
            <Stack direction="row" alignItems="center" gap={0}>
                <TextField
                    value={props.currentHitpoints}
                    onChange={e => {
                        const newValue = Math.min(Number(e.target.value), props.maxHitpoints);
                        props.handleCurrentHitpointsChange(newValue);
                    }}
                    variant="outlined"
                    style={{...textFieldStyle, width: '60px'}}
                    inputProps={{
                        style: {padding: 0, fontSize: "18px", textAlign: "center"},
                        min: 0,
                        max: props.maxHitpoints
                    }}
                />
                <span style={labelStyle}>/{props.maxHitpoints}
                </span>
                <Tooltip title={"Hitpoints affects Ruby bolts (e) special effect damage"}>
                    <img src={hitpointsIcon} alt="Hitpoints" width="25" height="25"/>
                </Tooltip>
            </Stack>
        </div>
    );
}

const textFieldStyle = {
    color: "black",
    backgroundColor: "#d8ccb4",
    width: 60,
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
    marginRight: '5px',
    display: 'inline-block',
    textAlign: 'right',
    whiteSpace: 'nowrap',
};