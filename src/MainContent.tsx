import { Tooltip } from "@mui/material";
import { Calculator } from "./Calculator/Calculator";
import { TargetMonster } from "./Calculator/DataObjects/TargetMonster";
import { GearSet, gearSets, GearSetType } from "./Calculator/DataObjects/GearSets";
import { DiscreteSliderMarks } from "./Components/Slider";
import DefenceReduction from "./Components/ConfigurationPanel/DefenceReduction";
import React, { startTransition, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Raid } from "./Calculator/DataObjects/Raid";
import { emptyGearFilterState, GearFilterState, GearTable, gearSetMatchesFilters } from "./Components/Table";
import { ColumnDef } from "@tanstack/react-table";
import ConfigurationPanel from "./Components/ConfigurationPanel/ConfigurationPanel";
import { Player } from "./Calculator/DataObjects/Player";
import MonsterVariantSelector from "./Components/MonsterVariantSelector";
import MonsterHitpoints from "./Components/ConfigurationPanel/MonsterHitpoints";
import { buildContext, gearRequestFromSet } from "./Calculator/WikiDps";
import { runDpsJob } from "./Calculator/dpsPool";

function gearImage(path: string): string {
    if (path.startsWith("http")) {
        return path;
    }
    return require(`${path}`);
}

function spellImage(name: string): string {
    try {
        return require(`./Images/Spells/${name}.png`);
    } catch {
        return `https://oldschool.runescape.wiki/images/${name.replace(/ /g, "_")}.png`;
    }
}

function gearSetsForFight(target: TargetMonster, onTask: boolean): GearSet[] {
    const shown: GearSet[] = [];
    const include = (type: GearSetType) => {
        for (const gearSet of gearSets) {
            if (gearSet.types.includes(type)) {
                shown.push(gearSet);
            }
        }
    };

    if (target.isKalphite) {
        include(GearSetType.Kalphites);
    }
    if (target.isDemon) {
        include(GearSetType.Demon);
    }
    if (target.isDraconic) {
        include(GearSetType.Draconic);
    }
    if (target.isUndead) {
        include(GearSetType.Undead);
    }
    if (target.isLeafy) {
        include(GearSetType.Leafy);
    }
    if (target.isVampyre1 || target.isVampyre2 || target.isVampyre3) {
        include(GearSetType.Vampyre);
    }
    if (target.slayerMonster && onTask) {
        include(GearSetType.Slayer);
    }
    include(GearSetType.General);

    for (const gearSet of shown) {
        gearSet.setRaid(target.raid);
    }
    return shown;
}

interface ActiveDpsJob {
    gearSets: GearSet[];
    reprioritize: (isPriority: (index: number) => boolean) => void;
}

interface MainContentProps {
    targetMonster: TargetMonster;
    setTargetMonster: (monster: TargetMonster) => void;
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
    handleOnTask,
}) => {
    const [results, setResults] = useState<Calculator[]>([]);
    const [calcStatus, setCalcStatus] = useState("");
    const isToaBoss: boolean = targetMonster.raid === Raid.TombsOfAmascut;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [player, setPlayer] = useState<Player>(new Player());
    const filtersRef = useRef<GearFilterState>(emptyGearFilterState());
    const activeJobRef = useRef<ActiveDpsJob | null>(null);

    const shownGearSets = useMemo(
        () => gearSetsForFight(targetMonster, player.onTask),
        [
            targetMonster.isKalphite,
            targetMonster.isDemon,
            targetMonster.isDraconic,
            targetMonster.isUndead,
            targetMonster.isLeafy,
            targetMonster.isVampyre1,
            targetMonster.isVampyre2,
            targetMonster.isVampyre3,
            targetMonster.slayerMonster,
            targetMonster.raid,
            player.onTask,
        ],
    );

    const onFiltersChange = useCallback((filters: GearFilterState) => {
        filtersRef.current = filters;
        const current = activeJobRef.current;
        if (!current) {
            return;
        }
        current.reprioritize((index) =>
            gearSetMatchesFilters(current.gearSets[index], filters.selected, filters.modes),
        );
    }, []);

    useEffect(() => {
        handleOnTask(player.onTask);
    }, [player.onTask]);

    useEffect(() => {
        const context = buildContext(targetMonster, player, isToaBoss ? invocationLevel : 0);
        const requests = shownGearSets.map(gearRequestFromSet);
        const rows: Calculator[] = [];
        const total = shownGearSets.length;
        let completed = 0;
        let alive = true;
        let publishVersion = 0;
        let publishTimer = 0;
        let lastPublish = 0;
        setResults([]);
        setCalcStatus(total ? `Calculating 0 / ${total.toLocaleString()}` : "");

        const publish = (final: boolean) => {
            if (!alive) {
                return;
            }
            const snapshot = rows.slice();
            const version = ++publishVersion;
            const status = final ? "" : `Calculating ${completed.toLocaleString()} / ${total.toLocaleString()}`;
            const apply = () => {
                if (!alive || version !== publishVersion) {
                    return;
                }
                setResults(snapshot);
                setCalcStatus(status);
            };
            if (final) {
                apply();
            } else {
                startTransition(apply);
            }
        };

        const schedulePublish = () => {
            const elapsed = performance.now() - lastPublish;
            if (elapsed >= 250) {
                if (publishTimer) {
                    window.clearTimeout(publishTimer);
                    publishTimer = 0;
                }
                lastPublish = performance.now();
                publish(false);
                return;
            }
            if (publishTimer) {
                return;
            }
            publishTimer = window.setTimeout(() => {
                publishTimer = 0;
                lastPublish = performance.now();
                publish(false);
            }, 250 - elapsed);
        };

        const filters = filtersRef.current;
        const filtersActive = Object.values(filters.selected).some((selected) => selected.length > 0);
        const job = runDpsJob(
            context,
            requests,
            (indices, batch) => {
                indices.forEach((gearIndex, resultIndex) => {
                    const result = batch[resultIndex];
                    const calculator = new Calculator(shownGearSets[gearIndex], String(gearIndex));
                    calculator.targetMonster = targetMonster;
                    calculator.player = player;
                    calculator.dps = result.dps;
                    calculator.maxHit = result.maxHit;
                    calculator.hitChance = result.hitChance;
                    calculator.attackRoll = result.attackRoll;
                    calculator.defenceRoll = result.defenceRoll;
                    calculator.averageDamagePerHit = result.averageDamage;
                    calculator.attackInterval = result.attackInterval;
                    rows.push(calculator);
                });
                completed += batch.length;
                schedulePublish();
            },
            () => {
                if (publishTimer) {
                    window.clearTimeout(publishTimer);
                    publishTimer = 0;
                }
                publish(true);
            },
            filtersActive
                ? (index) => gearSetMatchesFilters(shownGearSets[index], filters.selected, filters.modes)
                : undefined,
        );
        activeJobRef.current = { gearSets: shownGearSets, reprioritize: job.reprioritize };

        return () => {
            alive = false;
            activeJobRef.current = null;
            if (publishTimer) {
                window.clearTimeout(publishTimer);
            }
            job.cancel();
        };
    }, [shownGearSets, targetMonster, invocationLevel, player, isToaBoss]);

    const columns = React.useMemo<ColumnDef<Calculator>[]>(
        () => [
            {
                header: () => <span>Style</span>,
                accessorKey: "combatStyle",
                id: "combatStyle",
                accessorFn: (row) => {
                    return (
                        <Tooltip title={`${row.gearSet.weaponStyle} - ${row.gearSet.styleType}`}>
                            <div>{row.gearSet.combatStyle}</div>
                        </Tooltip>
                    );
                },
                cell: (info) => info.getValue(),
            },
            {
                header: () => <span>Gear</span>,
                accessorKey: "gear",
                accessorFn: (row) => {
                    return (
                        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                            {row.gearSet.spell && (
                                <Tooltip key={row.gearSet.spell.name} title={row.gearSet.spell.name}>
                                    <a href={row.gearSet.spell.wikiLink} target="_blank" rel="noreferrer">
                                        <img
                                            src={spellImage(row.gearSet.spell.name)}
                                            style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
                                            alt={row.gearSet.spell.name}
                                        />
                                    </a>
                                </Tooltip>
                            )}
                            {Array.from(row.gearSet.items.values())
                                .sort((a, b) => a.slot - b.slot)
                                .map((item) => (
                                    <Tooltip key={item.name} title={item.name}>
                                        <a href={item.wikiLink} target="_blank" rel="noreferrer">
                                            <img
                                                src={gearImage(item.imagePath)}
                                                style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
                                                alt={item.name}
                                            />
                                        </a>
                                    </Tooltip>
                                ))}
                        </div>
                    );
                },
                id: "gear",
                cell: (info) => info.getValue(),
            },
            {
                header: () => <span>DPS</span>,
                accessorKey: "dps",
                accessorFn: (row) => {
                    return (
                        <Tooltip
                            title={
                                <div>
                                    <div>
                                        Average damage per hit: {Math.round(row.averageDamagePerHit * 1000) / 1000}
                                    </div>
                                    <div>Attack interval: {row.attackInterval} seconds</div>
                                </div>
                            }
                        >
                            <div>{Math.round(row.dps * 1000) / 1000}</div>
                        </Tooltip>
                    );
                },
                id: "dps",
                cell: (info) => info.getValue(),
            },
            {
                header: () => <span>Max Hit</span>,
                accessorKey: "maxHit",
                accessorFn: (row) => row.maxHit,
                id: "maxHit",
                cell: (info) => info.getValue(),
            },
            {
                header: () => <span>Hit Chance</span>,
                accessorKey: "hitChance",
                accessorFn: (row) => {
                    return (
                        <Tooltip
                            title={
                                <div>
                                    <div>Max attack roll: {row.attackRoll.toLocaleString()}</div>
                                    <div>Max defence roll: {row.defenceRoll.toLocaleString()}</div>
                                </div>
                            }
                        >
                            <div>{Math.round(row.hitChance * 100 * 100) / 100}%</div>
                        </Tooltip>
                    );
                },
                id: "hitChance",
                cell: (info) => info.getValue(),
            },
        ],
        [],
    );

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
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
                style={{ marginBottom: "5px" }}
            />

            <MonsterVariantSelector
                monster={targetMonster}
                setTargetMonster={(selectedVariant) => setTargetMonster(selectedVariant)}
            />

            {isToaBoss && <DiscreteSliderMarks value={invocationLevel} handleChange={handleSetInvocationLevel} />}
            <caption>{isToaBoss && `${invocationLevel} Invocation   `}</caption>
            <div className="hitpoints-defence-container">
                <DefenceReduction
                    bossName={targetMonster.name}
                    defenceLevel={targetMonster.defenceLevel}
                    magicLevel={targetMonster.magicLevel}
                    maxReduction={targetMonster.maxDefenceReduction}
                    currentDefence={targetMonster.currentDefenceLevel}
                    handleCurrentDefence={(currentDefence) => {
                        targetMonster.currentDefenceLevel = currentDefence;
                        setTargetMonster(targetMonster);
                    }}
                />
                <MonsterHitpoints
                    monsterName={targetMonster.name}
                    currentHitpoints={targetMonster.currentHitpoints}
                    maxHitpoints={targetMonster.hitpoints}
                    handleCurrentHitpointsChange={(currentHitpoints) => {
                        targetMonster.currentHitpoints = currentHitpoints;
                        setTargetMonster(targetMonster);
                    }}
                />
            </div>
            <div className="configurationPanel">
                <ConfigurationPanel player={player} setPlayer={setPlayer} targetMonster={targetMonster} />
            </div>
            {calcStatus && <div className="monsterName">{calcStatus}</div>}
            <GearTable
                data={results}
                columns={columns}
                gearSets={shownGearSets}
                filterStateRef={filtersRef}
                onFiltersChange={onFiltersChange}
            />
        </main>
    );
};

export default MainContent;
