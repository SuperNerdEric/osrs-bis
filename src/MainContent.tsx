import {Tooltip} from "@mui/material";
import {Calculator} from "./Calculator/Calculator";
import {TargetMonster} from "./DataObjects/TargetMonster";
import {monsters} from "./DataObjects/Monsters";
import {GearSet, gearSets, GearSetType} from "./DataObjects/GearSets";
import {DiscreteSliderMarks} from "./Components/Slider";
import DefenceReduction from "./Components/ConfigurationPanel/DefenceReduction";
import React, {useEffect, useState} from 'react';
import {Raid} from "./DataObjects/Raid";
import OnTaskCheck from "./Components/ConfigurationPanel/OnTaskCheck";
import {GearTable} from "./Components/Table";
import {ColumnDef} from "@tanstack/react-table";
import MonsterSearch from "./Components/MonsterSearch";
import ConfigurationPanel from "./Components/ConfigurationPanel/ConfigurationPanel";
import {Player} from "./DataObjects/Player";

interface MainContentProps {
    target: string;
    invocationLevel: number;
    handleChange: (event: Event, newValue: number | number[]) => void;
    defenceReduction: number;
    handleDefenceReduction: (defenceReduction: number) => void;
    onTask: boolean;
    handleOnTask: (onTask: boolean) => void;
    setTargetMonster: (monster: TargetMonster) => void;

}

const MainContent: React.FC<MainContentProps> = ({
                                                     target,
                                                     invocationLevel,
                                                     handleChange,
                                                     defenceReduction,
                                                     handleDefenceReduction,
                                                     onTask,
                                                     handleOnTask,
                                                     setTargetMonster
                                                 }) => {

    const [results, setResults] = useState<Calculator[]>([]);
    const isToaBoss: boolean = (monsters.get(target) as TargetMonster).raid === Raid.TombsOfAmascut;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [player, setPlayer] = useState<Player>(new Player());

    useEffect(() => {
        handleOnTask(player.onTask);
    }, [player.onTask]);


    const handleMonsterSelect = (monster: TargetMonster) => {
        setTargetMonster(monster);
    };

    useEffect(() => {
        const results: Calculator[] = [];

        const shownGearSets: GearSet[] = [];

        if ((monsters.get(target) as TargetMonster).isKalphite) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Kalphites));
            shownGearSets.push(...slayerGearSets);
        }

        if ((monsters.get(target) as TargetMonster).isDemon) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Demon));
            shownGearSets.push(...slayerGearSets);
        }

        if ((monsters.get(target) as TargetMonster).isDraconic) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Draconic));
            shownGearSets.push(...slayerGearSets);
        }

        if ((monsters.get(target) as TargetMonster).isUndead) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Undead));
            shownGearSets.push(...slayerGearSets);
        }

        console.log(player);

        if ((monsters.get(target) as TargetMonster).slayerMonster && player.onTask) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Slayer));
            shownGearSets.push(...slayerGearSets);
        }

        const generalGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.General));
        shownGearSets.push(...generalGearSets);


        shownGearSets.forEach(gearSet => {
            gearSet.setRaid((monsters.get(target) as TargetMonster).raid);
            const calculator: Calculator = new Calculator(gearSet);
            calculator.targetMonster = monsters.get(target) as TargetMonster;
            calculator.defenceReduction = defenceReduction;
            calculator.player = player;

            if (isToaBoss) {
                calculator.calculateDPS(invocationLevel);
            } else {
                //Todo prevent use of salts outside toa
                calculator.calculateDPS();
            }

            results.push(calculator);
        })

        setResults(results);
    }, [target, invocationLevel, defenceReduction, player]);


    const columns = React.useMemo<ColumnDef<Calculator>[]>(
        () => [
            {
                header: () => <span>Style</span>,
                accessorKey: 'combatStyle',
                id: 'combatStyle',
                accessorFn: row => row.gearSet.combatStyle,
                cell: info => info.getValue(),
            },
            {
                header: () => <span>Gear</span>,
                accessorKey: 'gear',
                accessorFn: row => {
                    return (
                        <div>
                            {
                                <Tooltip title={row.gearSet.weapon.name}>
                                    <a href={row.gearSet.weapon.wikiLink} target="_blank" rel="noreferrer">
                                        <img src={require(`${row.gearSet.weapon.imagePath}`)}
                                             style={{width: `${imageSize}px`, height: `${imageSize}px`}}
                                             alt={row.gearSet.weapon.name}/>
                                    </a>
                                </Tooltip>
                            }
                            {
                                row.gearSet.items.map(item => (
                                    <Tooltip title={item.name}>
                                        <a href={item.wikiLink} target="_blank" rel="noreferrer">
                                            <img src={require(`${item.imagePath}`)}
                                                 style={{width: `${imageSize}px`, height: `${imageSize}px`}}
                                                 alt={item.name}/>
                                        </a>
                                    </Tooltip>
                                ))
                            }
                        </div>
                    )
                },
                id: 'gear',
                cell: info => info.getValue(),
            },
            {
                header: () => <span>DPS</span>,
                accessorKey: 'dps',
                accessorFn: row => (Math.round(row.dps * 1000) / 1000),
                id: 'dps',
                cell: info => info.getValue(),
            },
            {
                header: () => <span>Max Hit</span>,
                accessorKey: 'maxHit',
                accessorFn: row => row.maxHit,
                id: 'maxHit',
                cell: info => info.getValue(),
            },
            {
                header: () => <span>Hit Chance</span>,
                accessorKey: 'hitChance',
                accessorFn: row => `${Math.round(row.hitChance * 100 * 100) / 100}%`,
                id: 'hitChance',
                cell: info => info.getValue(),
            },
        ],
        []
    )


    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const imageSize = Math.max(20, Math.min(50, windowWidth / 20));


    const isSlayerMonster: boolean = (monsters.get(target) as TargetMonster).slayerMonster;

    return (
        <main className="App-main">
            <h2 className="monsterName">{(monsters.get(target) as TargetMonster).name}</h2>
            <div className="monsterSearch">
                <MonsterSearch onSelect={handleMonsterSelect} />
            </div>
            <img src={require(`${(monsters.get(target) as TargetMonster).imagePath}`)} width="auto"
                 height="150" alt={target}/>
            {
                isToaBoss &&
                <DiscreteSliderMarks defaultValue={invocationLevel} handleChange={handleChange}/>
            }
            <caption>
                {isToaBoss && `${invocationLevel} Invocation   `}
            </caption>
            <DefenceReduction bossName={target}
                              defenceLevel={(monsters.get(target) as TargetMonster).defenceLevel}
                              maxReduction={(monsters.get(target) as TargetMonster).maxDefenceReduction}
                              handleChange={handleDefenceReduction}/>
            <div className="configurationPanel">
                <ConfigurationPanel
                    player={player}
                    setPlayer={setPlayer}
                    targetMonster={monsters.get(target) as TargetMonster}
                    defenceReduction={defenceReduction}
                    handleDefenceReduction={handleDefenceReduction}
                />
            </div>
            <GearTable data={results} columns={columns}/>
        </main>
    )
}

export default MainContent;
