import { HttpHelper } from '../../Helper/http-helper';
import { Web3HelperPro } from './../../Helper/web3_helper_pro';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, MyAppConfig } from 'src/app/config/config';

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { uDonate_address, uDonate_abi, contract_address, PRODUCTION_PRESALE_ADDRESS, contract_abi, nftPrivateSaleAddress, nftPrivateSaleAbi } from 'src/abis.js';
import { _wallets } from './wallets';



@Injectable({
  providedIn: 'root'
})
export class PresaleService {
  uDonate: any;
  loaContract: any;
  nftPrivateSale: any;
  private web3js: any;
  private provider: any;
  private accounts: any;
  web3Modal
  private isConnected = false;
  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();
  private _wallet: string = "";
  public _decimals: number = 1000000000000000000;
  public _w_w: string[] = [];
  public unListed: string[] = [];
  constructor(private httpHelper: HttpHelper, @Inject(APP_CONFIG) private config: MyAppConfig,
    private toastr: ToastrService, private web3Helper: Web3HelperPro) {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: {
            56: "https://bsc-dataseed.binance.org",
          },
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
    // this.loaContractConnection();
    // this.whiteListAddress();
  }

  async whiteListAddress() {

    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();
    this.accountStatusSource.next(this.accounts);
    this.web3js.eth.defaultAccount = this.web3js.eth.accounts[0];
    this.uDonate = await new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
    this._wallet = this.accounts[0];
    // console.log( await this.web3js.eth.net.getId)
    // this.loaContract = await new this.web3js.eth.Contract(contract_abi, contract_address);
    // let status = await this.uDonate.methods._depositAddressesStatus("0x0723584d36f9E4907FAfA9f639164992a99455f8").call({ from: this._wallet })
    // console.log(status)
    // let status = await this.web3js.eth.getBalance(this._wallet);
    // console.log(status);
    this._w_w =_wallets;

    for (var index = 0; index < this._w_w.length; index++) {
      let status = await this.uDonate.methods._depositAddressesStatus(this._w_w[index]).call({ from: this._wallet })
      console.log(status);
      if (status != true) {
        this.unListed.push(this._w_w[index]);
      }
    }
    console.log(this.unListed);
  }

  async loaContractConnection() {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();
    this.accountStatusSource.next(this.accounts);
    this.web3js.eth.defaultAccount = this.web3js.eth.accounts[0];
    this.loaContract = await new this.web3js.eth.Contract(contract_abi, contract_address);
    this.uDonate = await new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
    this._wallet = this.accounts[0];
    // let setWhiteListAddress = await this.loaContract.methods.monthlyTransfer().send({ from: this._wallet })
    // console.log(setWhiteListAddress, 'xxxxx');

    // const create = await this.uDonate.methods.addDepositAddress(['0xD2eCFbb2A94431Da360f267eAa9183E53FDdeaE2', '0x38B5E5BAA865DeF1Fa60D4E5226567aa1459A6a3', '0xf94cC9f3EA8D6f2758c79c5C4ff96F633755B836'
    //   , '0xdaEef1322dF4D3471eBb4A0ED559dB88b15829bC', '0x5a14bcdc93d04Cd4D4F2897a26D5075D5522aCED', '0x2652294786Da5c6B7263Ec09Fdc69AA1B508f496', '0x3A951B6687a9CAB8aD1ab0c139C7Df7E35D4074D', '0xdB2ac00169552eb8Ea49dF90baa4f79a4EBa9B64',
    //   '0x01716ac71F85736652e53DFcd69CE90607BD63e4', '0x0E26f85dAc99B19bBAc247c06e366E5e665f97d8', '0x74ACCeB137BC7eF365555A59c6039b39AEb15b7B', '0xFa6EC5ff960c7fc750779DF036859ef4D65a06Ef', '0xdB2ac00169552eb8Ea49dF90baa4f79a4EBa9B64', '0x64EB707836481C79fd80d0B6cD6BF126009189F1',
    //   '0x61C561370C902A4AB4CC25A430dAB025E5A0EbAA']).send({ from: this._wallet })
    // const getWhiteListed = await this.uDonate.methods.getWhiteListedWallets().call({ from: "0x38B5E5BAA865DeF1Fa60D4E5226567aa1459A6a3" })
    // console.log(getWhiteListed);
    let refund = await this.uDonate.methods.returnBNB(25).send({ from: this._wallet });
    console.log(refund, 1);

    // let awardedIndexXx = await this.uDonate.methods.withdrawAll().send({ from: this._wallet })
    // console.log(awardedIndexXx, 'refund')


    // let awardedIndex = await this.uDonate.methods._depositAddressesAwardedErc20CoinIndex(this._wallet).call({ from: this._wallet })
    // console.log(awardedIndex, 'awardedIndex')
    // let awardedIndex_x = await this.uDonate.methods._depositAddressesAwardedErc20CoinAmount(this._wallet).call({ from: this._wallet })
    // console.log(awardedIndex_x / this._decimals, 'awardedIndex_x')
  }


  async getTotalDepositByAddress() {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts();
    this.uDonate = await new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
    console.log(this.uDonate);
    this._wallet = this.accounts[0];

    let myDeposit = await this.uDonate.methods._depositAddressesBNBAmount(this._wallet).call({ from: this._wallet });
    return myDeposit;
  }

  async getTotalDeposit() {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts();
    this.uDonate = await new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
    this._wallet = this.accounts[0];
    this.uDonate = await new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
    let totalDeposit = await this.uDonate.methods._totalAddressesDepositAmount().call({ from: this._wallet });
    // console.log(totalDeposit);
    return totalDeposit;

  }

  async getEcr20AwardedDay() {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts();
    this.uDonate = await new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
    this._wallet = this.accounts[0];
    this.uDonate = await new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
    let daily = await this.uDonate.methods._depositAddressesAwardedErc20CoinIndex(this._wallet).call({ from: this._wallet });
    // console.log(daily);
    return daily;
  }

  async getTotalClaim() {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts();
    this.uDonate = await new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
    this._wallet = this.accounts[0];
    this.uDonate = await new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
    let daily = await this.uDonate.methods._depositAddressesAwardedErc20CoinAmount(this._wallet).call({ from: this._wallet });
    return daily;
  }


  // async claimLoa() {
  //   this.provider = await this.web3Modal.connect();
  //   this.web3js = new Web3(this.provider);
  //   this.accounts = await this.web3js.eth.getAccounts();
  //   this.uDonate = await new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
  //   this._wallet = this.accounts[0];
  //   this.uDonate = await new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
  //   let daily = await this.uDonate.methods.distribute().call({ from: this._wallet });
  //   return daily;

  // }

  createUser = async (obj: any) => {
    return this.httpHelper.post(this.config.baseUrl + this.config.paths.user, obj, '', "");
  }

  getUser = async (wallet: string) => {
    return this.httpHelper.get(this.config.baseUrl + this.config.paths.getUser + '?wallet_address=' + wallet, "", [])
  }

  createUserPresale = async (obj: any) => {
    return this.httpHelper.post(this.config.baseUrl + this.config.paths.userPresale, obj, '', "");
  }

  getUserPreslae = async (wallet: string) => {
    return this.httpHelper.get(this.config.baseUrl + this.config.paths.getUserPresale + '?wallet_address=' + wallet, "", [])
  }
  async connectAccount() {

    try {
      let networkId = window.ethereum.networkVersion;
      const switchNetwork = await this.addNetwork(networkId);

      if (switchNetwork) {
        this.provider = await this.web3Modal.connect(); // set provider
        this.web3js = new Web3(this.provider); // create web3 instance
        this.accounts = await this.web3js.eth.getAccounts();
        this.accountStatusSource.next(this.accounts);
        this.isConnected = true;
        this._wallet = this.accounts[0];
        return { status: true, wallet: this.accounts[0] };
      } else {
        this.isConnected = false;
        this.toastr.error('Please Switch to BSC Network!')
        return { status: false, wallet: null };
      }

    } catch (e) {
      // console.log('Error');
      return { status: false, wallet: null };
    }
  }

  async addNetwork(id: any) {

    let networkData: any;

    if (id == 56) {
      return true;
    }
    else {
      networkData = [
        {
          chainId: "0x38",
          // chainId: "0x61"
        },

      ];
    }

    try {
      await window.ethereum.request({
        id: 2,
        jsonrpc: "2.0",
        method: "wallet_switchEthereumChain",
        params: networkData,
      });
      return true;
    } catch (e) {
      return false;
    }

  }



  async claimLoa() {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts();
    this.uDonate = await new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
    this._wallet = this.accounts[0];
    // console.log(this.uDonate);
    let loaClaim = await this.uDonate.methods.distribute().send({ from: this._wallet });
    // console.log(loaClaim);
    location.reload();
    return true;
  }

  async deposit(amount: string) {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts();
    this.uDonate = await new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
    this._wallet = this.accounts[0];
    // console.log(this.uDonate);
    let send = await this.web3js.eth.sendTransaction({
      from: this._wallet,
      to: uDonate_address, //confirm
      value: this.web3js.utils.toWei(String(amount), "ether"),
      gas: 300000
    });

    location.reload();

  }
  async getWalletBalance() {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts();
    this.uDonate = await new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
    this._wallet = this.accounts[0];
    return this.web3js.eth.getBalance(this._wallet);
  }

  async connectToProvider() {

  }


  async testNftPrivateSale() {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts();
    this.nftPrivateSale = await new this.web3js.eth.Contract(nftPrivateSaleAbi, nftPrivateSaleAddress);
    this._wallet = this.accounts[0];
    // let loaClaim = await this.nftPrivateSale.methods.buy(1, 200).send({ from: this._wallet, value: this.web3js.utils.toWei(String(0.2), "ether") });
    // console.log(loaClaim);

    let loaClaim = await this.nftPrivateSale.methods.betaTotalSupply().call({ from: this._wallet });
    // console.log(loaClaim, 'total beta supply');


    let loaClaimx = await this.nftPrivateSale.methods.beta(this._wallet).call({ from: this._wallet });
    // console.log(loaClaimx, 'how much do I purchase (beta)');

    let loaClaimxX = await this.nftPrivateSale.methods.totalAmoutPaied(this._wallet).call({ from: this._wallet });
    // console.log(loaClaimxX / this._decimals, 'how much do I paid (beta)');

  }
}
