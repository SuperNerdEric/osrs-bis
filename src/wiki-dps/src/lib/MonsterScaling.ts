import { Monster } from '../types/Monster';
import applyCoxScaling from './scaling/ChambersOfXeric';
import applyTobScaling from './scaling/TheatreOfBlood';
import applyToaScaling from './scaling/TombsOfAmascut';
import applyVardScaling from './scaling/Vardorvis';
import applyDefenceReductions from './scaling/DefenceReduction';
import applyMonsterPhases from './scaling/Phases';

type MonsterTransformer = (m: Monster) => Monster;
const ORDER_OF_OPERATIONS: MonsterTransformer[] = [
  applyCoxScaling,
  applyTobScaling,
  applyToaScaling,
  applyVardScaling,
  applyMonsterPhases,
  applyDefenceReductions,
];

export const scaleMonster = (m: Monster): Monster => {
  for (const transformer of ORDER_OF_OPERATIONS) {
    m = transformer(m);
  }
  return m;
};

// to save a lot of unneeded compute work if hp is the only thing that changes
export const scaleMonsterHpOnly = (m: Monster): Monster => {
  if (m.name === 'Vardorvis') {
    return applyVardScaling(m);
  }

  return m;
};
