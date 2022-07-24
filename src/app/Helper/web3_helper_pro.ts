import  Web3Modal from 'web3modal';
import { Injectable } from "@angular/core";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
// import Web3 from "web3";

import Web3  from 'web3';

@Injectable({
    providedIn: "root",
})
export class Web3HelperPro {
    private web3js: any;
    private provider: any;
    private accounts: any;
    private web3Modal: any;
    private accountStatusSource = new Subject<any>();
    private accountStatus$ = this.accountStatusSource.asObservable();
    private _wallet: string = "";
    private isConnected: boolean = false;

    constructor(private toastr: ToastrService) {
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
    }

    /**
     *
     * @param abi string[] Contract functions
     * @param address string Contract Address
     * @return Contract Object
     */
    public async contract(abi: any, address: string) {
        this.provider = await this.web3Modal.connect();
        this.web3js = new Web3(this.provider);
        let contract = await new this.web3js.eth.Contract(abi, address);
        return contract;
    }

    /**
     * Connect Wallet
     * @return Object Contains connect status
     */
    public async connectWallet(): Promise<Object> {
        try {
            let networkId = window.ethereum.networkVersion;
            const switchNetwork = await this.addNetwork(networkId);

            if (switchNetwork) {
                this.provider = await this.web3Modal.connect();
                this.web3js = new Web3(this.provider);
                this.accounts = await this.web3js.eth.getAccounts();
                this.accountStatusSource.next(this.accounts);
                this.isConnected = true;
                this._wallet = this.accounts[0];
                return { status: this.isConnected, wallet: this.accounts[0] };
            } else {
                this.isConnected = false;
                this.toastr.error('Please Switch to BSC Network!')
                return { status: this.isConnected, wallet: null };
            }

        } catch (e) {
            return { status: false, wallet: null };
        }
    }

    /**
     * @dev force swich to BSC network (can put any network)
     * @param id number networkId
     * @return booelan switched or not
     */
    private async addNetwork(id: any) {

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

    /**
     * @dev return the connected wallet Address
     * @return string wallet
     */
    public getConnectedWallet = () => this._wallet;

    /**
     *
     * @param contract Object contract Object
     * @param T Genaric Function from the contract
     * @param address string wallet Address
     * @param _value number amount of BNB/USDT
     * @param _param any function params
     * @return any send result
     */
    public contractSend = async (contract: any, T: any, address: string, _value: string, _param: any[]) => {
        if (_param.length > 1)
            return await contract.methods[T](_param[0], _param[1]).send({ from: address, value: _value, gas: 300000 })
        if (_param.length == 1)
            return await contract.methods[T](_param[0]).send({ from: address, value: _value, gas: 500000 })
        return await contract.methods[T]().send({ from: address, value: _value, gas: 300000 })
    }
    /**
     *
     * @param contract Object contract Object
     * @param T Genaric Function from the contract
     * @param address string wallet Address
     * @param _param any function params
     * @return any call result
     */
    public contractCall = async (contract: any, T: any, address: string, _param: any[]) => {

        if (_param.length > 1)
            return await contract.methods[T](_param[0], _param[1]).call({ from: address })
        if (_param.length == 1)
            return await contract.methods[T](_param[0]).call({ from: address })
        return await contract.methods[T]().call({ from: address })
    }

    /**
     *
     * @param amount BNB amout to cnvert
     * @return number in wei
     */
    public convertToWei = (amount: string) => new this.web3js.utils.BN(this.web3js.utils.toWei(amount.toString(), "ether"));

    public disconnectWallet = async () => {
      const provider = await this.web3Modal.connect();
      provider.on("disconnect", (error: { code: number; message: string }) => {
        console.log(error);
      });
      // await this.web3Modal.disconnect();
      // web3.eth.accounts.wallet.remove(account);
  }


  }
