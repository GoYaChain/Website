import { Inject, Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { APP_CONFIG, MyAppConfig } from '../config/config';

@Injectable({
    providedIn: "root",
})
export class HashStr {

    constructor(@Inject(APP_CONFIG) private config: MyAppConfig) { }


    /**
     * 
     * @param  str string that you want to encrypt 
     */
    public encrypt(str: string) {
        var ctr = CryptoJS.AES.encrypt(str, this.config.cliperKey).toString()
        return btoa(ctr)
    }

    /**
     * 
     * @param str string that you want to decrypt
     */
    public decrypt(str: string) {
        return CryptoJS.AES.decrypt(str, this.config.cliperKey).toString(CryptoJS.enc.Utf8)
    }


    /**
     * 
     * @param str take the key for the encrypted text (based on our format)
     */
    public key(str: string) {
        var t = str.substr(11, str.length)
        return t.substr(0, t.length - 1)
    }
}