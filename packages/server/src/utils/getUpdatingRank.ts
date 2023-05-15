/* eslint-disable @typescript-eslint/ban-ts-comment */
import { betweenRank, nextRank, previousRank } from './rank';

export const getUpdatingRank = (
  destinationIndex: number,
  sourceIndex: number,
  entity: { rank: string }[],
  movingEntityRank: string,
): string | null => {
  try {
    if (destinationIndex === 0) {
      //@ts-ignore
      return previousRank(entity[0].rank);
    } else if (destinationIndex === entity.length - 1) {
      //@ts-ignore
      return nextRank(entity[entity.length - 1].rank);
    } else {
      // the current destination index
      //@ts-ignore
      const stationaryRank = entity[destinationIndex].rank;
      // the index left side of the rank
      //@ts-ignore
      const belowRank = entity[destinationIndex - 1].rank;
      //@ts-ignore
      const afterRank = entity[destinationIndex + 1].rank;
      if (belowRank === movingEntityRank) {
        // the index right side of the rank
        return betweenRank(stationaryRank, afterRank);
      } else if (destinationIndex > sourceIndex) {
        //@ts-ignore
        const afterRank = entity[destinationIndex + 1].rank;
        return betweenRank(stationaryRank, afterRank);
      } else {
        return betweenRank(belowRank, stationaryRank);
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
