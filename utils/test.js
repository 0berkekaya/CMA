const { fs, path } = require('./library/fileStream');

// const parentDir = path.join(__dirname, '../src/app/modules/base/');
// const modulesRoutingModulePath = path.join(parentDir, 'modules-routing.module.ts');

// // modules-routing.module.ts dosyasını içe aktar
// const modulesRoutingModule = require(modulesRoutingModulePath);
// try {
//   // Yeni path'i ekleyin
//   modulesRoutingModule.routes.push({
//     path: 'yeniPath',
//     component: YeniComponent, // YeniComponent'i uygun bir şekilde değiştirin
//     loadChildren: () =>
//       import('../yeni-modul/yeni-modul-routing.module').then(
//         (m) => m.YeniModulRoutingModule
//       ),
//   });

//   // modules-routing.module.ts dosyasını güncelle
//   fs.writeFileSync(modulesRoutingModulePath, 'export const routes = ' + JSON.stringify(modulesRoutingModule.routes, null, 2) + ';');
// } catch (error) {
//   console.log(error);
// }


const dosyaYolu = path.join(__dirname, '../src/app/module-provider/base/module-provider-routing.module.ts');

// Dosyanın mevcut içeriğini oku
fs.readFile(dosyaYolu, 'utf8', (hata, data) => {
  if (hata) {
    console.error('Dosya okuma hatası:', hata);
  } else {
    // Route_Definition_Key'i içeren indeksi bul
    const indeks = data.indexOf('//Route_Definition_Key');

    if (indeks !== -1) {
      // İstediğiniz veriyi ekleyin
      const yeniVeri = `  {
        path:'acente',
        component:AcenteContent,
        loadChildren: () =>
        import('../acente/acente-routing.module').then(
          (m) => m.AcenteRouting
        ),
      },`;
      const yeniIcerik = `${data.slice(0, indeks)}${yeniVeri}${data.slice(indeks)}`;

      // Dosyaya yazma işlemi
      fs.writeFile(dosyaYolu, yeniIcerik, (hata) => {
        if (hata) {
          console.error('Dosyaya yazma hatası:', hata);
        } else {
          console.log('Dosyaya ekleme başarılı!');
        }
      });
    } else {
      console.log('Route_Definition_Key bulunamadı.');
    }
  }
});

