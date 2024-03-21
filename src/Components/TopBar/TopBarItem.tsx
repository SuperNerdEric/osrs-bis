import React, { useState } from "react";
import "../../App.css";
import {TargetMonster} from "../../Calculator/DataObjects/TargetMonster";
import {Button} from "@mui/material";

interface TopBarProps {
    setTargetMonster: (targetMonster: TargetMonster) => void;
    monsterList: TargetMonster[];
    sectionName: string;
}

const TopBarItem: React.FC<TopBarProps> = ({setTargetMonster, monsterList, sectionName}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="dropdown"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <Button style={{ fontSize: '20px' }}>{sectionName}</Button>
            {isOpen && (
                <div className="dropdown-content">
                    {monsterList.map((monster, index) => (
                        <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => {
                                setTargetMonster(monster);
                                setIsOpen(false);
                            }}
                        >
                            {monster.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopBarItem;
