import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { CryptoService } from '../crypto/crypto.service';

@Injectable({
  providedIn: 'root',
})
export class HubService {
  constructor(private cryptoService: CryptoService) {}
  private moduleRequests: { [key: string]: any } = {};
  private endMinute: number = 5; // dakika cinsinden girilecek.

  private hashData(data: string): string {
    return CryptoJS.SHA256(data).toString();
  }

  request(key: string, data: any) {
    var hashKey = this.hashData(key);
    if (this.moduleRequests[hashKey] != null) {
      var data = this.cryptoService.decrypt(this.moduleRequests[hashKey]);
    } else {
      var thisTime = new Date();
      this.moduleRequests[hashKey] = this.cryptoService.encrypt({
        //ilgili data buraya gelecek.
        endTime: thisTime.setMinutes(thisTime.getMinutes() + this.endMinute),
      });
    }
  }

  /*
  Diyelim ki ben acente modülündeyim. Bana da kullanıcı modülünden bir veri gerekiyor.
  Bunun için acente modulünden hub'a kullanıcı bilgilerini isteyen bir istek atmalıyım.
  Bu isteği hub servis karşılamalı.
  Karşılanan bu istek bekletilmeye alınır.
  Beklemedeki istekler asenkron bir şekilde temin edilir ve temin edildikten sorna ilgili yere geri gönderilir.
  Bunun için yapmam gereken hub serviste bir istek oluşturmak.
  Hub servis gelen istekleri kaydedecek ve bu isteklerin sonuçlarını oluşturduktan sonra geri gönderecektir.
  Hub servis sadece gelen istekleri geri göndermekle kalmayacak, aynı zamanda başka modüllere de veri akışı sağlayacak.
  bu sayede isteklerin tekrar tekrar atılması önlenip süre kazancı sağlanmış olacak.
  Verilerin güncelliği de özel bir hash mekanizması ile hash'lenip kontrol edilecek.
  
  Örnek akış => 
        gelen iştek hash'lenerek hub serviste tutulacak. Bu hash değerine sahip herhangi bir çıktı yok ise yeni bir istek yaratılacak (key değeri hash değeri olacak.)
        sonrasında istek gerekli bilgileri elde ederek ilgili yere geri gönderilecek ve döngü tamamlanmış olacak.
        kaydedilen istekler 5 dakikada bir temizlenecek. (temizlenmez ise çok fazla veri tutulmuş olacak.)
        verilerin içerikleri şifreli bir şekilde gönderilip alınacak.(veri güvenliği açısından)

      
  
  Örnek data =>
              "hashKey": {
                endTime:Date()
                to:string;
                from:string;
                request:any;
                success:bool;
                message:string;
              }
  */
}
