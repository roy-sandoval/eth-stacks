import { useState } from 'react'
import { BaseError } from 'viem'
import { encodeFunctionData } from 'viem'
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

export function WriteContractPrepared() {
  
  const abiPathToken = require(`../utils/deployments/${activeChain}/ERC20.json`);
  const abiPath = require(`../utils/deployments/${activeChain}/TBA.json`);
  const addresses = require(`../utils/deployments/${activeChain}/addresses.json`);

  //const [tokenId, setTokenId] = useState('')
  //const debouncedTokenId = useDebounce(tokenId)
  const { address } = useAccount();

  // Note: the tokens must already be in the TBA contract!!
  const amt = "10000";  // in wei -- TODO: get amount from UI form
  const tokenAddress = addresses.weth; // TODO: get desired ERC20 address from UI
  const txnData = encodeFunctionData({
    abi: abiPathToken.abi,
    functionName: 'transfer',
    args: [tokenAddress, amt]
  });
  const { config } = usePrepareContractWrite({
    address: "0x0000000000000000000000000000000000000000",  // TODO: need to get user's deployed TBA contract -- must be deployed for this one
    abi: abiPath.abi,
    functionName: 'executeCall',
    args: [tokenAddress, 0, txnData] 
  });
  const { write, data, error, isLoading, isError } = useContractWrite(config)
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <>
      <Button>Transfer</Button>
      {isLoading && <div>Transferring...</div>}
      {isPending && <div>Transferred!</div>}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  )
}
