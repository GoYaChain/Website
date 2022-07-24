
import { Injectable } from "@angular/core";
import { HashStr } from "./hash-str.service";
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: "root",
})
export class WalletService {
  constructor(private hashStr: HashStr) { }

  /**
   * @param wallet string User wallet
   * @dev saving the wallet in the localStorage (hashed)
   * @return void
   */
  setUserWallet(wallet: string) {
    localStorage.setItem("__W__", this.hashStr.encrypt(wallet));
  }

  /**
   * @dev getting the wallet from the localStorage
   * and decrypted it and return it as normal string
   * @return String Wallet | null
   */
  getUserWallet() {
    if (localStorage.getItem("__W__")) {
      var base = atob(localStorage.getItem("__W__")|| '{}');
      var decrypted = this.hashStr.decrypt(base);
      return decrypted;
    }
    return null;
  }
  /**
   * @dev getting the wallet from the localstorage
   * but this time is encrypted wallet
   * @return string Wallet | null
   */
  getRawWallet() {
    if (localStorage.getItem("__W__")) {
      return localStorage.getItem("__W__")
    }
    return null;
  }

  /**
 * @dev check if wallet has previous connected
 * @return Boolean true | false
 */

  checkWallet() {

    if (this.getUserWallet() != null) {


      return true;
    }

    return false;
  }




  /**
   * @returns wallet address
  */
  cutAddress() {
    let addres = { fiveDigit: "", lastSixDigit: "" }

    let wallet = this.getUserWallet();
    if (wallet) {

      addres.fiveDigit = wallet.slice(0, 7);
      addres.lastSixDigit = wallet.slice(wallet.length - 7, wallet.length);

      return addres;
    }

    return addres
  }
}
