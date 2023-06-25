import { useState } from 'react';
import { BaseError } from 'viem';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import activeChain from '~/utils/activeChain'


import { useDebounce } from '../hooks/useDebounce'
import { stringify } from '../utils/stringify'
import Button from './Button'
import React from 'react';

export function CreateStackButton() {
  
  const abiPath = import(`../utils/deployments/${activeChain}/FinanceNFTFactory.json`);
  const addresses = import(`../utils/deployments/${activeChain}/addresses.json`);

  //const [tokenId, setTokenId] = useState('')
  //const debouncedTokenId = useDebounce(tokenId)
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: addresses.factoryAddress,
    abi: abiPath.abi,
    functionName: 'createFinanceNFT',
    args: ["ETH Stacks NFT", "STACK", address, addresses.uri , addresses.registryAddress, addresses.tbaImplementationAddress ]
  });
  const { write, data, error, isLoading, isError } = useContractWrite(config)
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <>
      <button 
  disabled={!write || isLoading}
  onClick={() => write?.()}

>
  {isLoading ? "Creating Stack..." : "Create Stack"}
  </button>
      {isLoading && <div>Creating...</div>}
      {isPending && <div>Created!</div>}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  )
}
