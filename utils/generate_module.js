#!/usr/bin/env node
const { fs, path } = require('./library/fileStream');

const parentDir = path.join(__dirname, '../');

// const moduleName = process.argv[2]; // Modül adını komut satırından al
// if (!moduleName) {
//   console.error('Modül adı belirtmelisiniz.');
//   process.exit(1);
// }

const moduleName = process.argv.slice(2)[0];
if (!moduleName) {
  console.error('Modül adı belirtmelisiniz.');
  process.exit(1);
}

const firstCharUpModuleName =
  moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

// Modül dizini oluştur
const moduleDirectory = path.join(parentDir, 'src/app/module-provider', moduleName);
fs.mkdirSync(moduleDirectory, { recursive: true });


// Routing dosyası oluştur
const moduleRoutingContent = `
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ${firstCharUpModuleName}HomeComponent } from './components/base/home/home.component';

const routes: Routes = [
    {
        path:'',
        component:${firstCharUpModuleName}HomeComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ${firstCharUpModuleName}Routing {}`;

fs.writeFileSync(
  path.join(moduleDirectory, `${moduleName}-routing.module.ts`),
  moduleRoutingContent
);

//Content dosyası oluştur
const contentComponent = `
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  // selector: '${moduleName}-content',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: '<div class="row"><div class="col-md-3">genelde leftbar girilir </div><div class="col-md-9"><router-outlet></router-outlet></div></div>',
  styles: '',
})
export class ${firstCharUpModuleName}Content {}
`;

// Home Sayfa içeriği
const homeComponent = `
import { Component } from '@angular/core';

@Component({
  selector: '${moduleName}-home-component',
  standalone: true,
  imports: [],
  template: '${firstCharUpModuleName} Home Componente Hoş Geldiniz.',
  styleUrl: './home.component.scss',
})
export class ${firstCharUpModuleName}HomeComponent {}

`;


// Component dizini oluştur
const componentDirectory = path.join(moduleDirectory, 'components');
fs.mkdirSync(componentDirectory);

const baseComponentDirectory = path.join(componentDirectory, 'base');
fs.mkdirSync(baseComponentDirectory);

fs.writeFileSync(
  path.join(moduleDirectory + '/components/base/', `content.component.ts`),
  contentComponent
);

const homeComponentDirectory = path.join(baseComponentDirectory, 'home');
fs.mkdirSync(homeComponentDirectory);



fs.writeFileSync(
  path.join(homeComponentDirectory + '/', `home.component.ts`),
  homeComponent
);


fs.writeFileSync(
  path.join(homeComponentDirectory + '/', `home.component.scss`),
  ''
);



const modelsDirectory = path.join(moduleDirectory, 'models');
fs.mkdirSync(modelsDirectory);

const servicesDirectory = path.join(moduleDirectory, 'services');
fs.mkdirSync(servicesDirectory);



const dosyaYolu = path.join(__dirname, '../src/app/module-provider/base/module-provider-routing.module.ts');

// Dosyanın mevcut içeriğini oku
fs.readFile(dosyaYolu, 'utf8', (hata, data) => {
  if (hata) {
    console.error('Dosya okuma hatası:', hata);
  } else {
    // Route_Definition_Key'i içeren indeksi bul
    const routeDefinitionKey = data.indexOf('//Route_Definition_Key');

    if (routeDefinitionKey !== -1) {
      // İstediğiniz veriyi ekleyin
      const yeniVeri = `{
        path:'${moduleName}',
        component:${firstCharUpModuleName}Content,
        loadChildren: () =>
        import('../${moduleName}/${moduleName}-routing.module').then(
          (m) => m.${firstCharUpModuleName}Routing
        ),
      },\n`;
      const yeniIcerik = `${data.slice(0, routeDefinitionKey)}${yeniVeri}${data.slice(routeDefinitionKey)}`;

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

console.log(`Oluşturulan Dizin :  ${'module-provider/' + moduleName}`)
console.log(`Oluşturulanlar : [Modül Klasörü, Routing Dosyası, Components Klasörü, Models Klasörü, Services Klasörü, Content Component ]`);