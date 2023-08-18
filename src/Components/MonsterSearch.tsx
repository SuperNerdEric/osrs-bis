import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { TargetMonster } from "../DataObjects/TargetMonster";
import {monsters} from "../Data/loadMonsters";

interface MonsterSearchProps {
    onSelect: (monster: TargetMonster) => void;
}

const MonsterSearch: React.FC<MonsterSearchProps> = ({ onSelect }) => {
    const monsterArray = Array.from(monsters.values());

    return (
        <div style={{ position: 'relative', width: '230px' }}>
            <Autocomplete
                options={monsterArray}
                getOptionLabel={(monster) => monster.name}
                onInputChange={(event, newValue) => {
                    const selectedMonster = monsterArray.find(m => m.name === newValue);
                    if (selectedMonster) {
                        onSelect(selectedMonster);
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search monsters..."
                        variant="outlined"
                        sx={{
                            height: '40px',
                            "& .MuiInputBase-root": {
                                backgroundColor: '#d8ccb4',
                                height: '100%',
                                padding: '0 14px'
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#ddd",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#ddd",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#ddd",
                            },
                            "& .MuiAutocomplete-popupIndicator": {
                                color: 'black'
                            }
                        }}
                    />
                )}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white"
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white"
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white"
                        }
                    }
                }}
                style={{
                    width: '100%',
                    zIndex: 1000
                }}
                ListboxProps={{
                    style: {
                        maxHeight: '200px',
                        overflow: 'auto',
                        backgroundColor: '#d8ccb4',
                        border: '1px solid #ddd',
                        fontSize: '16px',
                    }
                }}
            />
        </div>
    );
};

export default MonsterSearch;
