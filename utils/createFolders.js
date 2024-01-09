const {fs} = require('./library/fileStream');
const appPath = require('./library/path');

const folderNames = ['services', 'pipes', 'components','directives','models'];

folderNames.forEach(folderName => {
  const folderPath = `${appPath()}/${folderName}`;
  
  // Klasörü oluştur
  fs.mkdir(folderPath, (err) => {
    if (err) {
      console.error(`Hata: ${folderName} klasörü oluşturulamadı.`);
    } else {
      console.log(`${folderName} klasörü oluşturuldu.`);
    }
  });
});
