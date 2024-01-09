const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('Modül adını girmelisiniz. Örnek: node generate-routing.js berke');
  process.exit(1);
}

const moduleName = process.argv[2];
const modulePath = path.join('src/app/modules', moduleName);
const componentsFolder = 'components';

const componentFiles = fs.readdirSync(path.join(modulePath, componentsFolder))
  .filter(file => file.endsWith('.component.ts'));

const imports = componentFiles.map(file => {
  const componentName = file.split('.')[0];
  return `import { ${componentName} } from './${componentsFolder}/${componentName}';`;
}).join('\n');

const declarations = componentFiles.map(file => {
  const componentName = file.split('.')[0];
  return `${componentName},`;
}).join('\n');

const routes = componentFiles.map(file => {
  const componentName = file.split('.')[0];
  return `{
    path: '${componentName}',
    component: ${componentName},
  },`;
}).join('\n');

const moduleFilePath = path.join(modulePath, `${moduleName}.module.ts`);
let moduleFileContent = fs.readFileSync(moduleFilePath, 'utf8');
moduleFileContent = moduleFileContent.replace('// COMPONENT_IMPORTS', imports);
moduleFileContent = moduleFileContent.replace('// COMPONENT_DECLARATIONS', `declarations: [${declarations}],`);

fs.writeFileSync(moduleFilePath, moduleFileContent);

const routingFilePath = path.join(modulePath, `${moduleName}-routing.module.ts`);
let routingFileContent = fs.readFileSync(routingFilePath, 'utf8');
routingFileContent = routingFileContent.replace('// COMPONENT_ROUTES', routes);

fs.writeFileSync(routingFilePath, routingFileContent);

console.log(`Modül "${moduleName}" içindeki componentler düzenlendi.`);
