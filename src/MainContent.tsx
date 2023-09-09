import {Tooltip} from "@mui/material";
import {Calculator} from "./Calculator/Calculator";
import {TargetMonster} from "./Calculator/DataObjects/TargetMonster";
import {GearSet, gearSets, GearSetType} from "./Calculator/DataObjects/GearSets";
import {DiscreteSliderMarks} from "./Components/Slider";
import DefenceReduction from "./Components/ConfigurationPanel/DefenceReduction";
import React, {useEffect, useState} from 'react';
import {Raid} from "./Calculator/DataObjects/Raid";
import {GearTable} from "./Components/Table";
import {ColumnDef} from "@tanstack/react-table";
import ConfigurationPanel from "./Components/ConfigurationPanel/ConfigurationPanel";
import {Player} from "./Calculator/DataObjects/Player";
import MonsterVariantSelector from "./Components/MonsterVariantSelector";
import MonsterHitpoints from "./Components/ConfigurationPanel/MonsterHitpoints";

interface MainContentProps {
    targetMonster: TargetMonster;
    setTargetMonster: (monster: TargetMonster) => void,
    invocationLevel: number;
    handleSetInvocationLevel: (newValue: number) => void;
    onTask: boolean;
    handleOnTask: (onTask: boolean) => void;
}

const MainContent: React.FC<MainContentProps> = ({
                                                     targetMonster,
                                                     setTargetMonster,
                                                     invocationLevel,
                                                     handleSetInvocationLevel,
                                                     onTask,
                                                     handleOnTask,
                                                 }) => {


    const [results, setResults] = useState<Calculator[]>([]);
    const isToaBoss: boolean = targetMonster.raid === Raid.TombsOfAmascut;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [player, setPlayer] = useState<Player>(new Player());

    useEffect(() => {
        handleOnTask(player.onTask);
    }, [player.onTask]);

    console.log(targetMonster.activeVariant.variantName);

    useEffect(() => {
        const results: Calculator[] = [];

        const shownGearSets: GearSet[] = [];

        if (targetMonster.isKalphite) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Kalphites));
            shownGearSets.push(...slayerGearSets);
        }

        if (targetMonster.isDemon) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Demon));
            shownGearSets.push(...slayerGearSets);
        }

        if (targetMonster.isDraconic) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Draconic));
            shownGearSets.push(...slayerGearSets);
        }

        if (targetMonster.isUndead) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Undead));
            shownGearSets.push(...slayerGearSets);
        }

        if (targetMonster.isLeafy) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Leafy));
            shownGearSets.push(...slayerGearSets);
        }

        if (targetMonster.slayerMonster && player.onTask) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Slayer));
            shownGearSets.push(...slayerGearSets);
        }

        const generalGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.General));
        shownGearSets.push(...generalGearSets);


        shownGearSets.forEach(gearSet => {
            gearSet.setRaid(targetMonster.raid);
            const calculator: Calculator = new Calculator(gearSet);
            calculator.targetMonster = targetMonster;
            calculator.player = player;

            if (isToaBoss) {
                calculator.calculateDPS(invocationLevel);
            } else {
                calculator.calculateDPS();
            }


            results.push(calculator);
        })

        setResults(results);
    }, [targetMonster, targetMonster.name, targetMonster.activeVariant, targetMonster.hitpoints, targetMonster.defenceLevel, targetMonster.currentHitpoints, targetMonster.currentDefenceLevel, invocationLevel, player]);


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
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            {
                                row.gearSet.spell && (
                                    <Tooltip key={row.gearSet.spell.name} title={row.gearSet.spell.name}>
                                        <a href={row.gearSet.spell.wikiLink} target="_blank" rel="noreferrer">
                                            <img src={require(`./Images/Spells/${row.gearSet.spell.name}.png`)}
                                                 style={{width: `${imageSize}px`, height: `${imageSize}px`}}
                                                 alt={row.gearSet.spell.name}/>
                                        </a>
                                    </Tooltip>
                                )
                            }
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
            <h2 className="monsterName">{targetMonster.title}</h2>
            <img
                src={targetMonster.imagePath}
                width="auto"
                height="150"
                alt={targetMonster.name}
                style={{marginBottom: '5px'}}
            />

            <MonsterVariantSelector
                monster={targetMonster}
                setTargetMonster={(selectedVariant) => setTargetMonster(selectedVariant)}
            />

            {
                isToaBoss &&
                <DiscreteSliderMarks value={invocationLevel} handleChange={handleSetInvocationLevel}/>
            }
            <caption>
                {isToaBoss && `${invocationLevel} Invocation   `}
            </caption>
            <div className="hitpoints-defence-container">
                <DefenceReduction bossName={targetMonster.name}
                                  defenceLevel={targetMonster.defenceLevel}
                                  maxReduction={targetMonster.maxDefenceReduction}
                                  currentDefence={targetMonster.currentDefenceLevel}
                                  handleCurrentDefence={currentDefence => {
                                      targetMonster.currentDefenceLevel = currentDefence;
                                      setTargetMonster(targetMonster);
                                  }}/>
                <MonsterHitpoints
                    monsterName={targetMonster.name}
                    currentHitpoints={targetMonster.currentHitpoints}
                    maxHitpoints={targetMonster.hitpoints}
                    handleCurrentHitpointsChange={currentHitpoints => {
                        targetMonster.currentHitpoints = currentHitpoints;
                        setTargetMonster(targetMonster);
                    }}
                />
            </div>
            <div className="configurationPanel">
                <ConfigurationPanel
                    player={player}
                    setPlayer={setPlayer}
                    targetMonster={targetMonster}
                />
            </div>
            <GearTable data={results} columns={columns}/>
        </main>
    )
}

export default MainContent;

