import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private secretKey = 'cma_core_app_1.0.0';

  // Veriyi şifreleme
  encrypt(text: any): any {
    const encryptedText = CryptoJS.AES.encrypt(text, this.secretKey).toString();
    return encryptedText;
  }

  // Şifreli metni çözme
  decrypt(encryptedText: any): any {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, this.secretKey);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  }
}
