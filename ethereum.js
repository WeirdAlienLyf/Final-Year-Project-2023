import detectEthereumProvider from "@metamask/detect-provider";
import { ethers, Contract } from "ethers";
import FactoryContract from "./contracts/FactoryContract.json";

const getBlockchain = () =>
  new Promise(async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if (provider) {
      await provider.request({ method: "eth_requestAccounts" });
      const networkId = await provider.request({ method: "net_version" });
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();
      const factoryContract = new Contract(
        FactoryContract.networks[networkId].address,
        FactoryContract.abi,
        signer
      );
      resolve({ factoryContract });
      return;
    }
    reject("Install Metamask");
  });

export default getBlockchain;
