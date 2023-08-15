import React, { useState } from 'react';
import { monsters } from '../DataObjects/Monsters';
import { TargetMonster } from "../DataObjects/TargetMonster";

interface MonsterSearchProps {
    onSelect: (monster: TargetMonster) => void;
}

const MonsterSearch: React.FC<MonsterSearchProps> = ({ onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMonsters, setFilteredMonsters] = useState<TargetMonster[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.trim().toLowerCase();
        setSearchTerm(term);

        if (term === "") {
            setIsOpen(false);
            setFilteredMonsters([]);
            return;
        }

        const filtered = Array.from(monsters.values()).filter(
            m => m.name.toLowerCase().includes(term) || m.shortName.toLowerCase().includes(term)
        );

        setFilteredMonsters(filtered);
        setIsOpen(true);
    };

    const handleMonsterClick = (monster: TargetMonster) => {
        onSelect(monster);
        setSearchTerm('');
        setIsOpen(false);
    };

    return (
        <div style={{ position: 'relative' }}>
            <input
                type="text"
                placeholder="Search monsters..."
                value={searchTerm}
                onChange={handleSearch}
                style={{
                    backgroundColor: '#d8ccb4',
                    border: '1px solid #ddd',
                    width: '100%',
                    fontSize: '22px',
                    padding: '5px',
                }}
            />
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    color: 'black',
                    backgroundColor: '#d8ccb4',
                    border: '1px solid #ddd',
                    fontSize: '22px',
                    zIndex: 1000
                }}>
                    {filteredMonsters.map(monster => (
                        <div
                            key={monster.name}
                            onClick={() => handleMonsterClick(monster)}
                            className="monsterItem"
                        >
                            {monster.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MonsterSearch;
