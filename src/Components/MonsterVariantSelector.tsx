import React from 'react';
import {TargetMonster} from "../DataObjects/TargetMonster";
import {MenuItem, Select, ToggleButton, ToggleButtonGroup} from "@mui/material";

interface MonsterVariantSelectorProps {
    monster: TargetMonster;
    onVariantChange: (variantName: string) => void;
}

const MonsterVariantSelector: React.FC<MonsterVariantSelectorProps> = ({ monster, onVariantChange }) => {
    const { variants } = monster;
    const variantNames = Array.from(variants.keys());

    if (variantNames.length <= 1) {
        return null; // No toggle needed for one variant
    }

    const handleVariantChange = (variantName: string) => {
        monster.setActiveVariant(variantName);
        onVariantChange(variantName);
    };

    const handleVariantChangeToggle = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        if (newAlignment !== null) {
            monster.setActiveVariant(newAlignment);
            onVariantChange(newAlignment);
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
