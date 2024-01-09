const fs = require('fs');
const path = require('path');

const moduleName = "berke"; // Değişken olarak almak istediğiniz modül adı


const currentDir = __dirname;

// Bir üst dizine çıkmak için
const parentDir = path.join(currentDir, '../');




const modulePath = path.join(parentDir,'src','app', 'modules', moduleName, 'components');

function countComponents(directory) {
  const files = fs.readdirSync(directory);
  let componentCount = 0;

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      componentCount += countComponents(filePath);
    } else if (file.endsWith('.component.ts')) {
      componentCount++;
    }
  });

  return componentCount;
}

const totalComponents = countComponents(modulePath);

console.log(`"${modulePath}" klasörü altında toplam ${totalComponents} adet component bulunmaktadır.`);
