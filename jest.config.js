const { paths } = require('./tsconfig.json').compilerOptions;

const makeModuleNameMapper = (srcPath) => {
  return Object.keys(paths).reduce((acc, item) => {
    const key = item.replace('/*', '/(.*)');
    const path = paths[item][0].replace('/*', '/$1');

    acc[key] = `${srcPath}/${path}`;
    return acc;
  }, {});
};

module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
  moduleNameMapper: makeModuleNameMapper('<rootDir>')
};
