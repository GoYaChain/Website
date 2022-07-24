import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, MyAppConfig } from 'src/app/config/config';

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Subject } from 'rxjs';
import { HttpHelper } from 'src/app/Helper/http-helper';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {

  private web3js: any;
  private provider: any;
  private accounts: any;
  web3Modal

  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();
  constructor(private httpHelper: HttpHelper, @Inject(APP_CONFIG) private config: MyAppConfig) {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "6baccb990682e95bd107324f3b8f2c95" // required
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });

  }

  createUser = async (obj: any) => {
    return this.httpHelper.post(this.config.baseUrl + this.config.paths.user, obj, "", "");
  }

  getUser = async (wallet: string) => {
    return this.httpHelper.post(this.config.baseUrl + this.config.paths.getUser, { wallet_address: wallet }, "", "");
  }
  async connectAccount() {
    this.web3Modal.clearCachedProvider();
    try {
      this.provider = await this.web3Modal.connect(); // set provider
      this.web3js = new Web3(this.provider); // create web3 instance
      this.accounts = await this.web3js.eth.getAccounts();
      this.accountStatusSource.next(this.accounts);
      return { status: true, wallet: this.accounts[0] };
    } catch (e) {
      console.log('Error');
      return { status: false, wallet: null };
    }
  }

}

