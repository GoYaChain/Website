import { Injectable } from '@angular/core';
import { HashStr } from './hash-str.service';


@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  constructor(private hashStr: HashStr) {}

  /**
   *
   * @param key
   * @param value
   * @dev saving the item in the localStorage (hashed)
   */
  setItemlocalStorage(key:string, value: any) {
    localStorage.setItem(key, this.hashStr.encrypt(JSON.stringify(value)));
  }

  /**
   * @dev getting the item from the localStorage
   * and decrypted it and return it as normal string
   * @return String item | null
   */
  getItemlocalStorage(key:string) {
    if (localStorage.getItem(key)) {
      var base = atob(localStorage.getItem(key)|| '{}');
      var decrypted = this.hashStr.decrypt(base);
      return JSON.parse(decrypted);
    }
    return null;
  }

  
}
