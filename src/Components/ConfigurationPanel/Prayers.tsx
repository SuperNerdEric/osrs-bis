import React from 'react';
import {Stack, FormControlLabel, Checkbox} from '@mui/material';
import {Prayer} from "../../Calculator/DataObjects/Prayer";


interface PrayersProps {
    prayersData: {
        label: Prayer,
        displayName: string,
        icon: string
    }[];
    player: {
        prayers: Record<Prayer, boolean>
    };
    handlePrayerChange: (label: Prayer, isChecked: boolean) => void;
}

const Prayers: React.FC<PrayersProps> = ({prayersData, player, handlePrayerChange}) => {
    const iconSize = {
        width: '25px',
        height: '25px'
    };

    const checkboxStyle = {
        color: "#d8ccb4",
        '&.Mui-checked': {
            color: '#d8ccb4',
        },
        '& .MuiSvgIcon-root': {
            fontSize: 25 // Match the iconSize
        }
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                {prayersData.map(({label, displayName, icon}) => (
                    <Stack direction="row" alignItems="center" gap={2} key={displayName}>
                        <img src={icon} alt={displayName} style={iconSize}/>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name={displayName}
                                    color="primary"
                                    checked={player.prayers[label]}
                                    onChange={(event) => handlePrayerChange(label, event.target.checked)}
                                    sx={checkboxStyle}
                                />
                            }
                            label={displayName}
                        />
                    </Stack>
                ))}
            </div>
        </div>
    );
}

export default Prayers;
