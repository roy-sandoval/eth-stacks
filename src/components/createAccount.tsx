import { useState } from 'react'
import { BaseError } from 'viem'
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
  
  const abiPath = require(`../utils/deployments/${activeChain}/FinanceNFT.json`);
  const addresses = require(`../utils/deployments/${activeChain}/addresses.json`);

  //const [tokenId, setTokenId] = useState('')
  //const debouncedTokenId = useDebounce(tokenId)
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: "0x0000000000000000000000000000000000000000",  // TODO: need to get user's deployed NFT contract
    abi: abiPath.abi,
    functionName: 'createAccount',
    args: [addresses.registryAddress, addresses.tbaImplementationAddress, 1]  // TODO: instead of 1 we need tokenId from UI or button
  });
  const { write, data, error, isLoading, isError } = useContractWrite(config)
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <>
      <Button>Deploy Account</Button>
      {isLoading && <div>Creating...</div>}
      {isPending && <div>Created!</div>}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  )
}
