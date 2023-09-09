import React from 'react';
import { Stack, FormControlLabel, Checkbox } from '@mui/material';
import { Raid } from "../../Calculator/DataObjects/Raid";

interface BoostProps {
    potionStates: PotionStates;
    handlePotionChange: (potionKey: PotionKey, isChecked: boolean) => void;
    targetMonster: {
        raid: Raid;
    };
}

type PotionStates = {
    superCombat: boolean;
    rangingPotion: boolean;
    imbuedHeart: boolean;
    saturatedHeart: boolean;
    overloadPlus?: boolean;
    smellingSalts?: boolean;
};

type PotionKey = keyof PotionStates;

import SuperCombatPotionIcon from '../../Images/Boosts/Super_combat_potion.png';
import RangingPotionIcon from '../../Images/Boosts/Ranging_potion.png';
import ImbuedHeartIcon from '../../Images/Boosts/Imbued_heart.png';
import SaturatedHeartIcon from '../../Images/Boosts/Saturated_heart.png';
import OverloadIcon from '../../Images/Boosts/Overload_(+).png';
import SmellingSaltsIcon from '../../Images/Boosts/Smelling_salts.png';

const Boosts: React.FC<BoostProps> = ({ potionStates, handlePotionChange, targetMonster }) => {
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
            fontSize: 25 // Updated to match the iconSize
        }
    };

    const boostsArray = [
        { label: 'Super Combat', icon: SuperCombatPotionIcon, potionKey: 'superCombat' },
        { label: 'Ranging', icon: RangingPotionIcon, potionKey: 'rangingPotion' },
        { label: 'Imbued Heart', icon: ImbuedHeartIcon, potionKey: 'imbuedHeart' },
        { label: 'Saturated Heart', icon: SaturatedHeartIcon, potionKey: 'saturatedHeart' },
        ...(targetMonster.raid === Raid.ChambersOfXeric ? [{ label: 'Overload (+)', icon: OverloadIcon, potionKey: 'overloadPlus' }] : []),
        ...(targetMonster.raid === Raid.TombsOfAmascut ? [{ label: 'Smelling Salts', icon: SmellingSaltsIcon, potionKey: 'smellingSalts' }] : [])
    ];

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                {boostsArray.map(({ label, icon, potionKey }) => (
                    <div key={label}>
                        <Stack direction="row" alignItems="center" gap={2}>
                            <img src={icon} alt={label} style={iconSize} />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={label}
                                        color="primary"
                                        checked={potionStates[potionKey as PotionKey]}
                                        onChange={(event) => handlePotionChange(potionKey as PotionKey, event.target.checked)}
                                        sx={checkboxStyle}
                                    />
                                }
                                label={label}
                            />
                        </Stack>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Boosts;
