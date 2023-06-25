import { useState } from "react";
import { BaseError } from "viem";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useDebounce } from "./useDebounce";
//import activeChain from '~/utils/activeChain'
import React from "react";
import abiPath from "../utils/deployments/goerli/FinanceNFTFactory.json";
import addresses from "../utils/deployments/goerli/addresses.json";
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
//const dockerNames = require('docker-names');

export function CreateStackButton() {
  const [tokenId, setTokenId] = React.useState("");
  const debouncedTokenId = useDebounce(tokenId);

  //const [tokenId, setTokenId] = useState('')
  //const debouncedTokenId = useDebounce(tokenId)
  const { address } = useAccount();
  const now = new Date();
  const { config, error } = usePrepareContractWrite({
    address: `0x${addresses.factoryAddress}`,
    abi: abiPath.abi,
    functionName: "createFinanceNFT",
    args: [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      `Eth-Stacks-${now.toString()}`,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      `Eth-Stacks-${now.toString()}`,
      address,
      addresses.uri,
      addresses.registryAddress,
      addresses.tbaImplementationAddress,
    ],
  });
  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div>
      <button
        className="w-full rounded-full bg-black px-12 py-4 text-white"
        disabled={!write || isLoading}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/require-await
        onClick={async () => write?.()}
      >
        {isLoading ? "Minting..." : "Mint"}
      </button>
      {error && (
        <div>An error occurred preparing the transaction: {error.message}</div>
      )}
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://goerli.etherscan.io/tx/${data?.hash}`}>
              Etherscan
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
