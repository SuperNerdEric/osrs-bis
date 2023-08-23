import React from 'react';
import {TargetMonster} from "../DataObjects/TargetMonster";
import {MenuItem, Select, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {monsters} from "../Data/loadMonsters";

interface MonsterVariantSelectorProps {
    monster: TargetMonster;
    setTargetMonster: (monster: TargetMonster) => void;
}

const MonsterVariantSelector: React.FC<MonsterVariantSelectorProps> = ({ monster, setTargetMonster }) => {
    const { variants } = monster;
    const variantNames = Array.from(variants.keys());

    if (variantNames.length <= 1) {
        return null;
    }

    const handleVariantChange = (variantName: string) => {
        monster.setActiveVariant(variantName);
        setTargetMonster(monster);
    };

    const handleVariantChangeToggle = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        if (newAlignment !== null) {
            monster.setActiveVariant(newAlignment);
            setTargetMonster(monster);
        }
    };

    if (variantNames.length >= 2 && variantNames.length <= 3) {
        return (
            <ToggleButtonGroup
                color="primary"
                value={monster.activeVariant.variantName}
                exclusive
                onChange={handleVariantChangeToggle}
                aria-label="Monster Variants"
            >
                {variantNames.map((name) => (
                    <ToggleButton key={name} value={name}>
                        {name}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        );
    }

    return (
        <Select
            value={monster.activeVariant.variantName}
            onChange={(e) => handleVariantChange(e.target.value)}
            variant="outlined"
        >
            {variantNames.map((name) => (
                <MenuItem key={name} value={name}>
                    {name}
                </MenuItem>
            ))}
        </Select>
    );
};

export default MonsterVariantSelector;
