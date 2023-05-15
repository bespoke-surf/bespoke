import Names from './names.json';
import Patterns from './patterns.json';

export const isReservedSubdomain = (name: string) => {
  if (nameMap.hasOwnProperty(name)) {
    return true;
  }

  for (let i = 0; i < patternsRegex.length; ++i) {
    const regex = patternsRegex[i];
    if (regex?.test(name)) {
      return true;
    }
  }

  return false;
};

const patternsRegex = Patterns.map((pattern) => {
  return new RegExp(pattern);
});

const nameMap = Names.reduce((accumulator: any, name) => {
  accumulator[name] = true;
  return accumulator;
}, {});
