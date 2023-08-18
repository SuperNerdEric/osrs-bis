import {Tooltip} from "@mui/material";
import {Calculator} from "./Calculator/Calculator";
import {TargetMonster} from "./DataObjects/TargetMonster";
import {GearSet, gearSets, GearSetType} from "./DataObjects/GearSets";
import {DiscreteSliderMarks} from "./Components/Slider";
import DefenceReduction from "./Components/ConfigurationPanel/DefenceReduction";
import React, {useEffect, useState} from 'react';
import {Raid} from "./DataObjects/Raid";
import {GearTable} from "./Components/Table";
import {ColumnDef} from "@tanstack/react-table";
import ConfigurationPanel from "./Components/ConfigurationPanel/ConfigurationPanel";
import {Player} from "./DataObjects/Player";
import MonsterVariantSelector from "./Components/MonsterVariantSelector";
import { monsters } from "./Data/loadMonsters";

interface MainContentProps {
    target: string;
    invocationLevel: number;
    handleChange: (event: Event, newValue: number | number[]) => void;
    currentDefence: number;
    handleCurrentDefence: (defenceReduction: number) => void;
    onTask: boolean;
    handleOnTask: (onTask: boolean) => void;
    setTargetMonster: (monster: TargetMonster) => void;

}

const MainContent: React.FC<MainContentProps> = ({
                                                     target,
                                                     invocationLevel,
                                                     handleChange,
                                                     currentDefence,
                                                     handleCurrentDefence,
                                                     onTask,
                                                     handleOnTask,
                                                     setTargetMonster
                                                 }) => {


    const [results, setResults] = useState<Calculator[]>([]);
    const isToaBoss: boolean = (monsters.get(target) as TargetMonster).raid === Raid.TombsOfAmascut;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [player, setPlayer] = useState<Player>(new Player());
    const [activeVariant, setActiveVariant] = useState<string>('default');

    useEffect(() => {
        handleOnTask(player.onTask);
    }, [player.onTask]);


    const handleMonsterSelect = (monster: TargetMonster) => {
        setTargetMonster(monster);
    };

    useEffect(() => {
        console.log(JSON.stringify(monsters.get(target) as TargetMonster));

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
            calculator.targetMonster.currentDefenceLevel = currentDefence;
            calculator.player = player;

            if (isToaBoss) {
                calculator.calculateDPS(invocationLevel);
            } else {
                calculator.calculateDPS();
            }



            results.push(calculator);
        })

        setResults(results);
    }, [target, activeVariant, invocationLevel, currentDefence, player]);


    const columns = React.useMemo<ColumnDef<Calculator>[]>(
        () => [
            {
                header: () => <span>Style</span>,
                accessorKey: 'combatStyle',
                id: 'combatStyle',
                accessorFn: row => {
                    return (
                        <Tooltip title={`${row.gearSet.weaponStyle} - ${row.gearSet.styleType}`}>
                            <div>{row.gearSet.combatStyle}</div>
                        </Tooltip>
                    )
                },
                cell: info => info.getValue(),
            },
            {
                header: () => <span>Gear</span>,
                accessorKey: 'gear',
                accessorFn: row => {
                    return (
                        <div>
                            {
                                Array.from(row.gearSet.items.values())
                                    .sort((a, b) => a.slot - b.slot)
                                    .map(item => (
                                        <Tooltip key={item.name} title={item.name}>
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
                accessorFn: row => {
                    return (
                        <Tooltip title={
                            <div>
                                <div>Average damage per hit: {Math.round(row.averageDamagePerHit * 1000) / 1000}</div>
                                <div>Attack interval: {row.attackInterval} seconds</div>
                            </div>
                        }>
                            <div>{Math.round(row.dps * 1000) / 1000}</div>
                        </Tooltip>
                    )
                },
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
                accessorFn: row => {
                    return (
                        <Tooltip title={
                            <div>
                                <div>Max attack roll: {row.attackRoll.toLocaleString()}</div>
                                <div>Max defence roll: {row.defenceRoll.toLocaleString()}</div>
                            </div>
                        }>
                            <div>{Math.round(row.hitChance * 100 * 100) / 100}%</div>
                        </Tooltip>
                    )
                },
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

    return (
        <main className="App-main">
            <h2 className="monsterName">{(monsters.get(target) as TargetMonster).name}</h2>
            <img
                src={(monsters.get(target) as TargetMonster).imagePath}
                width="auto"
                height="150"
                alt={target}
                style={{ marginBottom: '5px' }}
            />

            <MonsterVariantSelector
                monster={(monsters.get(target) as TargetMonster)}
                onVariantChange={(selectedVariant) => setActiveVariant(selectedVariant)}
            />

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
                              handleCurrentDefence={handleCurrentDefence}/>
            <div className="configurationPanel">
                <ConfigurationPanel
                    player={player}
                    setPlayer={setPlayer}
                    targetMonster={monsters.get(target) as TargetMonster}
                    defenceReduction={currentDefence}
                    handleDefenceReduction={handleCurrentDefence}
                />
            </div>
            <GearTable data={results} columns={columns}/>
        </main>
    )
}

export default MainContent;
