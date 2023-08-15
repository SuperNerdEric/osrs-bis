import {useState, useEffect} from 'react';
import {Player} from "../DataObjects/Player";
import {Raid} from "../DataObjects/Raid";

interface PotionStates {
    superCombat: boolean;
    rangingPotion: boolean;
    imbuedHeart: boolean;
    saturatedHeart: boolean;
    overloadPlus: boolean;
    smellingSalts: boolean;
}

type PotionKey = keyof PotionStates;

export const usePotionLogic = (player: Player, setPlayer: React.Dispatch<React.SetStateAction<Player>>, targetMonsterRaid: Raid) => {
    const getDefaultPotionStates = (raid: Raid): PotionStates => {
        switch (raid) {
            case Raid.TombsOfAmascut:
                return {
                    imbuedHeart: false,
                    overloadPlus: false,
                    rangingPotion: false,
                    saturatedHeart: false,
                    superCombat: false,
                    smellingSalts: true
                };
            case Raid.ChambersOfXeric:
                return {
                    imbuedHeart: false,
                    rangingPotion: false,
                    saturatedHeart: false,
                    smellingSalts: false,
                    superCombat: false,
                    overloadPlus: true
                };
            default:
                return {
                    imbuedHeart: false, overloadPlus: false, smellingSalts: false,
                    superCombat: true,
                    rangingPotion: true,
                    saturatedHeart: true
                };
        }
    };

    const [potionStates, setPotionStates] = useState<PotionStates>(getDefaultPotionStates(targetMonsterRaid));

    const dependentPotions: Record<PotionKey, PotionKey[]> = {
        overloadPlus: ['superCombat', 'rangingPotion', 'imbuedHeart', 'saturatedHeart', 'smellingSalts'],
        smellingSalts: ['superCombat', 'rangingPotion', 'imbuedHeart', 'saturatedHeart', 'overloadPlus'],
        imbuedHeart: ['saturatedHeart', 'overloadPlus', 'smellingSalts'],
        saturatedHeart: ['imbuedHeart', 'overloadPlus', 'smellingSalts'],
        superCombat: ['overloadPlus', 'smellingSalts'],
        rangingPotion: ['overloadPlus', 'smellingSalts'],
    };

    function calculateBoost(base: number, percentage: number, additional: number): number {
        return Math.floor(base * percentage) + additional;
    }

    function setSkillBoost(player: Player, skill: keyof Player['skills'], boost: number): void {
        setPlayer(prevPlayer => ({
            ...prevPlayer,
            skills: {
                ...prevPlayer.skills,
                [skill]: {
                    ...prevPlayer.skills[skill],
                    boost
                }
            }
        }));
    }

    const potionHandlers: Record<PotionKey, (isChecked: boolean) => void> = {
        imbuedHeart(isChecked) {
            setSkillBoost(player, 'magic', isChecked ? calculateBoost(player.skills.magic.level, 1 / 10, 1) : 0);
        },
        overloadPlus(isChecked) {
            const skills = ['attack', 'strength', 'ranged', 'magic'] as const;
            for (const skill of skills) {
                setSkillBoost(player, skill, isChecked ? calculateBoost(player.skills[skill].level, 16 / 100, 6) : 0);
            }
        },
        saturatedHeart(isChecked) {
            setSkillBoost(player, 'magic', isChecked ? calculateBoost(player.skills.magic.level, 1 / 10, 4) : 0);
        },
        smellingSalts(isChecked) {
            const skills = ['attack', 'strength', 'ranged', 'magic'] as const;
            for (const skill of skills) {
                setSkillBoost(player, skill, isChecked ? calculateBoost(player.skills[skill].level, 16 / 100, 11) : 0);
            }
        },
        superCombat(isChecked) {
            const skills = ['attack', 'strength'] as const;
            for (const skill of skills) {
                setSkillBoost(player, skill, isChecked ? calculateBoost(player.skills[skill].level, 15 / 100, 5) : 0);
            }
        },
        rangingPotion(isChecked) {
            setSkillBoost(player, 'ranged', isChecked ? calculateBoost(player.skills.ranged.level, 1 / 10, 4) : 0);
        }
    };


    const handlePotionChange = (key: PotionKey, isChecked: boolean) => {
        const newState = {...potionStates, [key]: isChecked};

        if (isChecked && dependentPotions[key]) {
            dependentPotions[key].forEach(dependentKey => {
                if (potionStates[dependentKey]) {
                    newState[dependentKey] = false;
                    if (potionHandlers[dependentKey]) {
                        potionHandlers[dependentKey](false);
                    }
                }
            });
        }

        setPotionStates(newState);
        if (potionHandlers[key]) {
            potionHandlers[key](isChecked);
        }
    };

    useEffect(() => {
        const newPotionStates = getDefaultPotionStates(targetMonsterRaid);
        setPotionStates(newPotionStates);
        Object.keys(newPotionStates).forEach((potionKey) => {
            const isPotionActive = newPotionStates[potionKey as PotionKey];
            const handler = potionHandlers[potionKey as PotionKey];

            if (isPotionActive && handler) {
                handler(true);
            }
        });
    }, [targetMonsterRaid]);

    useEffect(() => {
        Object.keys(potionStates).forEach((potionKey) => {
            if (potionStates[potionKey as PotionKey] && potionHandlers[potionKey as PotionKey]) {
                potionHandlers[potionKey as PotionKey](true);
            }
        });
    }, [player.skills.attack.level, player.skills.strength.level, player.skills.ranged.level, player.skills.magic.level]);


    return {potionStates, handlePotionChange};
}

export default usePotionLogic;
