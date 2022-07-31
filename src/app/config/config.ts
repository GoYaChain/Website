import { InjectionToken, Injectable } from "@angular/core";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";


export let APP_CONFIG = new InjectionToken("config");
let base_url: string;
let client_id: number;
let rout_page_live: string;
base_url = "https://goyaref.roynex.com/"



export const APPCONFIG: MyAppConfig = {
  // clientId: client_id,
  baseUrl: base_url,
  // routPageLive: rout_page_live,
  cliperKey: "Roynex_404",
  urlPrefix: "v1/",
  paths: {
    
    send_email: 'auth/signup',
    send_code: 'auth/signin',
    user: 'api/create',
    getUser: 'api/user',
    
    userPresale: 'api/create/presale',
    getUserPresale: 'api/user/presale',
    getUserR: 'user',
    // getUserPresale: 'api/user/presale'
  },
  requestHeader: (token = "", params: any, url = false) => {
    if (token != null || token != "") {
      return {
        headers: new HttpHeaders({
          //auth, content type
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
          mode: "no-cors",
        }),
        params: params,
      };
    } else {
      return null;
    }
  },
  validateToken: (token: string): boolean => {
    // split the token to array.
    var tokenArr = token.split(".");
    // take the index 1 that hold the token information.
    var tokenData = JSON.parse(atob(tokenArr[1]));
    // take the expration date from the Data object.
    var exp = tokenData.exp;
    // return true if exp - date now > 0
    return exp - Math.round(new Date().getTime() / 1000) > 0 ? true : false;
  },
};

export interface MyAppConfig {
  // clientId: number;
  baseUrl: string;
  urlPrefix: string;
  requestHeader: any;
  paths: any;
  // routPageLive: string;
  validateToken: any;
  cliperKey: any;
}

export interface UserToken {
  name: string;
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export class UrlPrefixs {
  authToken = "";
}
