import { Inject, Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'

@Injectable({
    providedIn: "root",
})
export class HashStr {

    constructor() { }
    /**
     * 
     * @param  str string that you want to encrypt 
     */
    public encrypt(str: string) {
        var ctr = CryptoJS.AES.encrypt(str,"chain").toString()
        return btoa(ctr)
    }

    /**
     * 
     * @param str string that you want to decrypt
     */
    public decrypt(str: string) {
        return CryptoJS.AES.decrypt(str, "chain").toString(CryptoJS.enc.Utf8)
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