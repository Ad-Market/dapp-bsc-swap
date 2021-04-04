import { ethers, Contract } from 'ethers';
import Web3 from 'web3';
import SimpleStorage from './contracts/SimpleStorage.json';
import EthSwap from './contracts/EthSwap.json';
import Token from './contracts/Token.json';

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if (window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log('SIGNER', signer)
        const simpleStorage = new Contract(
          SimpleStorage.networks[window.ethereum.networkVersion].address,
          SimpleStorage.abi,
          signer
        );

        resolve({ simpleStorage });
      } else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
      //resolve({ simpleStorage: undefined });
    });
  });

export default getBlockchain;
