import { AfterViewInit, Component, OnInit, Injectable, NgModule, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { HashStr } from "src/app/Service/hash-str.service";
import { ReferralService } from './referral.service';


@Component({
  selector: "app-referral",
  templateUrl: "./referral.component.html",
  styleUrls: ["./referral.component.scss"],
})
export class ReferralComponent implements OnInit {
  @ViewChild("tooltip") tooltip: MatTooltip;

  public connected = false;
  public error: any = null;
  public wallet: any;
  public url: string = "";
  public referral: string = ""
  public refUserWallet: string = "";
  public user: User;
  public refs: User[] = [];
  public isResponse = false;
  public LOA: number = 0;
  public follow: number = 0;
  public isTrusted: boolean = false;
  isDisabled: boolean = true;
  isResponseRefs: boolean = true;
  constructor(private hashStr: HashStr, private service: ReferralService, private route: ActivatedRoute, private toastr: ToastrService, private cd: ChangeDetectorRef,) {
    this.route.queryParams.subscribe((params) => {
      this.referral = params["vHash"];

    });


  }


  ngOnInit(): void {

    if (this.getCounter() == null) {
      this.setCounter('0')
    }
    if (this.referral != undefined || this.referral != null) {
      var base = atob(this.referral)
      this.refUserWallet = this.hashStr.decrypt(base)
    }
    if (this.getUserWallet() != null) {
      this.connected = true;
      this.wallet = this.getUserWallet();
      this.url = "https://goyachain.com/?vHash=" + this.createUrl();
      this.getUser();
    }

  }
  ngAfterViewInit(): void {

  }

  connectWallet = async () => {

    var xNumber = this.getCounter();

    if (Number(xNumber) <= 0 || Number(xNumber) < 9) {
      this.toastr.error('Join our Discord & Twitter', 'Complete your tasks first!');
      return;
    }
    this.isTrusted = true;
    this.resolved();

  }

  setUserWallet(wallet: string) {
    localStorage.setItem('__W__', this.hashStr.encrypt(wallet));
  }
  getUserWallet() {
    if (localStorage.getItem('__W__')) {
      var base = atob(localStorage.getItem('__W__')!)
      var decrypted = this.hashStr.decrypt(base)
      return decrypted
    }
    return null;
  }

  createUrl = () => {
    return this.hashStr.encrypt(this.wallet);
  }
  showSuccess() {
    // navigator.clipboard.writeText(this.url);
    var input = document.createElement('input');
    input.setAttribute('value', this.url);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    this.toastr.success('Link Copied!');
  }

  copy() {
    this.isDisabled = false;
    this.tooltip.show();
    this.cd.detectChanges();
    setTimeout(() => (this.isDisabled = true), 2000);
  }

  getUser = async () => {
    let res: any = await this.service.getUser(this.wallet);
    this.user = res;
    this.refs = this.user.refs;
    this.setUserWallet(this.user.wallet_address)
    if (this.refs.length > 0) {
      this.isResponse = true;
      var loa = this.refs.length * 10;
      var event = this.user.event_3x
      this.LOA = Number(loa) + Number(event);
    }
    this.url = "https://goyachain.com/referral/?vHash=" + this.createUrl();
  }

  createUser = async (obj: any) => {
    let res: any = await this.service.createUser(obj)
    if (res.msg == "User already exsist") {
      this.getUser()
    } else if (res.msg == "exceeded referral limit") {
      this.toastr.error('Exceeded referral limit');
      await this.delay(5);
      localStorage.clear();
      window.location.reload()
      // window.location.href = "https://goyaref.roynex.com/referral";
      return;
    } else if (res.msg == "Scam Request") {
      this.toastr.error('Your wallets will be deleted for trying to scam');
      await this.delay(5);
      localStorage.clear();
      window.location.reload()
      // window.location.href = "https://goyaref.roynex.com/referral";
      return;
    }

    this.user = res;
    if (this.user.id != undefined) {
      this.setUserWallet(this.user.wallet_address)
      this.url = "https://goyachain.com/referral/?vHash=" + this.createUrl();
    }
  }

  async dis() {
    window.open("https://discord.gg/NXB4rwKyZf", "_blank");
    this.follow += 3
    this.setCounter(String(this.follow))
  }

  async tw() {
    window.open(
      'https://twitter.com/GoyaChain/',
      '_blank'
    );

    this.follow += 7
    this.setCounter(String(this.follow))
  }

  setCounter(followUs: string) {
    localStorage.setItem('__F__', this.hashStr.encrypt(followUs));
  }


  getCounter() {
    if (localStorage.getItem('__F__')) {
      var base = atob(localStorage.getItem('__F__')!)
      var decrypted = this.hashStr.decrypt(base)
      return decrypted
    }
    return null;
  }


  witepaper() {
    window.location.href = "https://goyaref.roynex.com"
  }

  public async resolved() {

    this.isTrusted = false;
    this.scrolTo();
    var res = await this.service.connectAccount();

    if (res.status) {
      this.connected = true;
      this.wallet = res.wallet;
      var obj = {};
      if (this.refUserWallet != "" || this.refUserWallet != undefined || this.refUserWallet != null) {
        obj = {
          wallet_address: res.wallet,
          referral_link: this.createUrl(),
          ref_user_id: this.refUserWallet
        }
      } else {
        obj = {
          wallet_address: res.wallet,
          referral_link: this.createUrl(),
        }
      }
      this.createUser(obj);

    } else {

    }
  }

  homepage() {
    window.location.href = "https://goyachain.com/"
  }
  scrolTo() {
    var elmnt: HTMLElement = document.getElementById('how-inv')!;
    elmnt.scrollIntoView();
  }

  onError(e: any) {
    this.isTrusted = false;

  }

  withdow() {
    this.toastr.success('Withdrawal only available after Listing on Pancakeswap. Vesting schedule applies.');
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
