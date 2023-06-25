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
  
  const abiPath = require(`../utils/deployments/${activeChain}/TBA.json`);
  const addresses = require(`../utils/deployments/${activeChain}/addresses.json`);

  //const [tokenId, setTokenId] = useState('')
  //const debouncedTokenId = useDebounce(tokenId)
  const { address } = useAccount();

  // Note: the tokens must already be in the TBA contract!!
  const executorAddress = "0x0000000000000000000000000000000000000000";  // TODO: get from user
  const callers = [executorAddress];
  const permissions = [true];
  const { config } = usePrepareContractWrite({
    address: "0x0000000000000000000000000000000000000000",  // TODO: need to get user's deployed TBA contract -- must be deployed for this one
    abi: abiPath.abi,
    functionName: 'setPermissions',
    args: [callers, permissions] 
  });
  const { write, data, error, isLoading, isError } = useContractWrite(config)
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <>
      <Button>Add User</Button>
      {isLoading && <div>Adding...</div>}
      {isPending && <div>Added!</div>}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  )
}
