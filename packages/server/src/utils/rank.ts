import { customAlphabet } from 'nanoid';

const alpha = '0123456789abcdefghijklmnopqrstuvwxyz';
const alphaReverse: string[] = [];
const alphaLength = alpha.length;
const rankLength = 64;

const rankRegex = new RegExp('^[' + alpha + ']{' + rankLength + '}$');
const nanoid = customAlphabet(alpha, rankLength);

for (let index = 0; index < alphaLength; index++) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  alphaReverse[alpha[index]] = index;
}

export function middleRank() {
  return (alpha[Math.trunc(alphaLength / 2)] + nanoid()).slice(
    0,
    Math.max(0, rankLength),
  );
}

export function nextRank(fromRank: string) {
  const newRank = step(fromRank, 1);

  if (newRank <= fromRank) {
    throw new Error('Failed rank: ' + newRank);
  }

  return newRank;
}

export function previousRank(fromRank: string) {
  const newRank = step(fromRank, -1);

  if (newRank >= fromRank) {
    throw new Error('Failed rank: ' + newRank);
  }

  return newRank;
}

export function betweenRank(a: string, b: string) {
  verifyRank(a);
  verifyRank(b);

  if (a === b) {
    throw new Error('Ranks are identical - there is nothing between.');
  }

  let newRank = '';

  for (let index = 0; index < rankLength; index++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    const ai = alphaReverse[a[index]];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const bi = alphaReverse[b[index]];

    if (bi - ai < 2) {
      newRank += a[index];
    } else {
      const newIndex = (ai < bi ? ai + bi : ai + alphaLength) / 2;

      newRank += alpha[Math.trunc(newIndex)];
      break;
    }
  }

  newRank = (newRank + nanoid()).slice(0, Math.max(0, rankLength));

  if (newRank <= a || newRank >= b) {
    throw new Error('Failed rank: ' + newRank);
  }

  return newRank;
}

function step(fromRank: string, steps: number) {
  verifyRank(fromRank);

  let toRank = '';
  let index = Math.trunc(rankLength / 2);

  while (index--) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newChar = alpha[alphaReverse[fromRank[index]] + steps];

    if (newChar) {
      toRank = newChar + toRank;
      break;
    }
  }

  return (fromRank.slice(0, Math.max(0, index)) + toRank + nanoid()).slice(
    0,
    Math.max(0, rankLength),
  );
}

function verifyRank(rank: string) {
  if (
    typeof rank !== 'string' ||
    rank.length !== rankLength ||
    !rankRegex.test(rank)
  ) {
    throw new Error('Invalid rank: ' + rank);
  }
}
