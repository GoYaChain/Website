import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HashStr } from 'src/app/Service/hash-str.service';
import { ReferralService } from '../referral/referral.service';
import { PresaleService } from './presale.service';

@Component({
  selector: 'app-presale',
  templateUrl: './presale.component.html',
  styleUrls: ['./presale.component.scss']
})
export class PresaleComponent implements OnInit {

 
  public connected = false;
  public error: any = null;
  public wallet: string = "";
  public url: string = "";
  public referral: string = ""
  public refUserWallet: string = "";
  public user: User;
  public refs: User[] = [];
  public isResponse = false;
  public LOA: number = 0;
  public follow: number = 0;
  public qulifid: boolean = false;
  public isTrusted: boolean = false;
  public showBox: boolean = false;

  isDisabled: boolean = true;

  @ViewChild("tooltip") tooltip: MatTooltip;


  constructor(private hashStr: HashStr, private service: PresaleService, private route: ActivatedRoute, private toastr: ToastrService) {
    this.route.queryParams.subscribe((params) => {
      this.referral = params["viHash"];
    });
  }

  ngOnInit(): void {
  
    if (this.referral != undefined || this.referral != null) {
      var base = atob(this.referral)
      this.refUserWallet = this.hashStr.decrypt(base)
    }
  

    if (this.getUserWallet() != null) {
      this.connected = true;
      this.wallet = this.getUserWallet();
      this.url = "https://goyachain.com/presale/?viHash=" + this.createUrl();


      this.getUser();
    }
  }

  showSuccess() {
    navigator.clipboard.writeText(this.url);
    var input = document.createElement('input');
    input.setAttribute('value', "this.url");
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    this.toastr.success('Link Copied!');
  }


  setUserWallet(wallet: string) {
    localStorage.setItem('__GW__', this.hashStr.encrypt(wallet));
  }
  getUserWallet() {
    if (localStorage.getItem('__GW__')) {
      var base = atob(localStorage.getItem('__GW__')||'')
      var decrypted = this.hashStr.decrypt(base)
      return decrypted
    }
    return null;
  }

  getUser = async () => {

    try {
    

    let res: any = await this.service.getUserPreslae(this.wallet);
    // let res: any = []
    this.user = res;
    this.refs = this.user.refs;

    console.log('res :>> ', res);
    this.setUserWallet(this.user.wallet_address)
    if (this.refs.length > 0) {
      this.isResponse = true;
    }
    if (this.refs.length > 9) {
      this.qulifid = true;
    }
    this.url = "https://goyachain.com/presale/?viHash=" + this.createUrl();

    
  } catch (error) {
    console.log('error :>> ', error);
  }
  }

  createUrl = () => {
    return this.hashStr.encrypt(this.wallet);
  }

  public async resolved(captchaResponse: string) {


  }

  homepage() {
    window.location.href = "https://leagueofancients.com"
  }
  scrolTo() {
    var elmnt = document.getElementById('invite');
    elmnt!.scrollIntoView();
  }

  onError(e: any) {
    this.isTrusted = false;
    console.log(e);
  }

  withdow() {
    this.toastr.success('Withdrawal only available after Listing on Pancakeswap. Vesting schedule applies.');
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  connectWallet = async () => {
    // this.scrolTo();
    var res = await this.service.connectAccount();

    if (res.status) {
      this.connected = true;
      this.wallet = res.wallet;

      var obj = {};
      if (this.refUserWallet != "" || this.refUserWallet != undefined || this.refUserWallet != null) {
        obj = {
          wallet_address: res.wallet,
          referral_link: this.createUrl(),
          presale_user_id: this.refUserWallet
        }
      } else {
        obj = {
          wallet_address: res.wallet,
          referral_link: this.createUrl(),
        }
      }
      this.createUser(obj);

    } else {
      console.log(this.error, 'error')
    }
  }
  website() {
    window.location.href = ""

  }
  witepaper() {
    window.location.href = "https://goyaref.roynex.com"
  }
  createUser = async (obj: any) => {
    try {
      
    
    let res: any = await this.service.createUserPresale(obj)

    console.log('createUser :>> ', res);
    if (res.msg == "User already exsist") {
      this.getUser()
    } else if (res.msg == "exceeded referral limit") {
      this.toastr.success('Congratulations! You have been whitelisted');
      await this.delay(5);
      localStorage.clear();
      window.location.href = "https://goyachain.com/referral";
      return;
    } else if (res.msg == "Scam Request") {
      this.toastr.error('Your wallets will be deleted for trying to scam');
      await this.delay(5);
      localStorage.clear();
      window.location.href = "https://goyachain.com/referral";
      return;
    }

    this.user = res;
    if (this.user.id != undefined) {
      this.setUserWallet(this.user.wallet_address)
      this.url = "https://goyachain.com/referral/?vHash=" + this.createUrl();
    }

  } catch (error) {
      
  }
  }
  home() {
    window.location.href = "https://goyachain.com/";
  }
  showUrl() {
    this.showBox = true;
  }

  copy() {
    this.isDisabled = false;
    this.tooltip.show();
    setTimeout(() => (this.isDisabled = true), 2000);
  }
}
interface User {
  id: number;
  wallet_address: string;
  ref_user_id: string;
  referral_link: string;
  refs: User[];
  created_at: string;
  event_3x: number;
}

class User implements User {

}
