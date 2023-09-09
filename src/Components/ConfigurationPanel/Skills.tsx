import React from 'react';
import {TextField, Stack} from '@mui/material';
import {Player} from "../../Calculator/DataObjects/Player";
import AttackIcon from '../../Images/Skills/Attack_icon.png';
import MagicIcon from '../../Images/Skills/Magic_icon.png';
import RangedIcon from '../../Images/Skills/Ranged_icon.png';
import StrengthIcon from '../../Images/Skills/Strength_icon.png';


interface SkillsPanelProps {
    player: Player;
    handlePlayerUpdate: (skillName: SkillName, newValue: number) => void;
}

type SkillName = 'attack' | 'strength' | 'ranged' | 'magic';

const skillsArray: { icon: string, skillName: SkillName }[] = [
    {icon: AttackIcon, skillName: 'attack'},
    {icon: StrengthIcon, skillName: 'strength'},
    {icon: RangedIcon, skillName: 'ranged'},
    {icon: MagicIcon, skillName: 'magic'}
];

const iconSize = {
    width: '25px',
    height: '25px'
};

const labelStyle: React.CSSProperties = {
    fontSize: '18px',
    width: '50px',
    display: 'inline-block',
    textAlign: 'right',
};

const textFieldStyle = {
    backgroundColor: '#d8ccb4',
    color: 'black',
    width: '40px'
};

const SkillsPanel: React.FC<SkillsPanelProps> = ({player, handlePlayerUpdate}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                {skillsArray.map(skill => (
                    <Stack direction="row" alignItems="center" gap={0} key={skill.skillName}>
                        <img src={skill.icon} alt={skill.skillName} style={iconSize}/>
                        <span style={labelStyle}>
                            {player.skills[skill.skillName].level + player.skills[skill.skillName].boost}/
                        </span>
                        <TextField
                            value={player.skills[skill.skillName].level}
                            onChange={e => {
                                const newValue = Math.min(Number(e.target.value), 99);
                                handlePlayerUpdate(skill.skillName, newValue);
                            }}
                            variant="outlined"
                            style={textFieldStyle}
                            inputProps={{style: {padding: 3}, max: 99}}
                        />
                    </Stack>
                ))}
            </div>
        </div>
    );
}

export default SkillsPanel;
