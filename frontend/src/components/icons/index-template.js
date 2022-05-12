const path = require('path');
const fse = require('fs-extra');

const SOURCE_DIR = 'src/components/icons/build';
const OUT = 'src/components/icons';
const appDirectory = fse.realpathSync(process.cwd());

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function defaultIndexTemplate(filePaths) {
  const exportEntries = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = basename
      .split('-')
      .map((l) => capitalizeFirstLetter(l))
      .join('');
    return `export { default as Svg${exportName} } from './build/${basename}'`;
  });
  return exportEntries.join('\n');
}

(async () => {
  try {
    const source = path.join(appDirectory, SOURCE_DIR);

    if (fse.lstatSync(source).isDirectory()) {
      const exportsIcons = defaultIndexTemplate(fse.readdirSync(source));
      await fse.writeFileSync(path.join(OUT, 'index.ts'), exportsIcons);
    } else {
      console.log('not found dir', source);
    }
  } catch (error) {
    console.log(error);
  }
})();
