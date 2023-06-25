import Head from "next/head";
import type { NextPage } from "next";
import CopyableText from "~/components/CopyableText";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { motion } from "framer-motion";
import React, { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import Balance from "~/components/Balance";
import Spacer from "~/components/Spacer";
import Divider from "~/components/Divider";
import { api } from "~/utils/api";
import Header from "~/components/Header";
import type { Subdirectories } from "@prisma/client";
import {
  Types,
  Avatar,
  useSIWE,
  SIWEButton,
  ChainIcon,
  type SIWESession,
  useChains,
  useModal,
} from "connectkit";

import {
  useAccount,
  useBalance,
  useSendTransaction,
  useNetwork,
  useSignMessage,
  useSignTypedData,
  usePrepareSendTransaction,
  useConnect,
  useDisconnect,
} from "wagmi";
import Button from "~/components/Button";

const UserTag = () => {
  return (
    <div className="flex items-center gap-2">
      <div>img</div>
      <div>User</div>
    </div>
  );
};

const AITag = () => {
  return (
    <div className="rounded-md border border-black px-2 py-1">
      <div>AI Powered</div>
    </div>
  );
};

const SponsorTag = () => {
  return (
    <div className="rounded-md bg-black px-2 py-1 text-white">
      <div>Gasless</div>
    </div>
  );
};
interface FormValues {
  label: string;
  icon: string;
}

const AddAccount = ({
  formState,
  handleFormChange,
}: {
  formState: FormValues;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative  w-[36rem] rounded-lg bg-gradient-to-b from-[rgba(8,30,234,1)] to-[rgba(201,206,255,1)] p-4  ">
        {/* <div className="absolute top-[-10px] -z-10 h-full w-full rounded-lg bg-pink-500 content-['']" /> */}
        <span className="font-beni text-[6rem] leading-none text-white">
          Create A Stack
        </span>
        <div className="mt-4 flex flex-col gap-4">
          <input
            type="text"
            name="label"
            value={formState.label}
            onChange={handleFormChange}
            className="rounded-md border border-black p-2"
            placeholder="Title"
          />
          <input
            type="text"
            name="icon"
            value={formState.icon}
            onChange={handleFormChange}
            className="mb-8 rounded-md border border-black p-2"
            placeholder="Choose an emoji"
          />
        </div>
      </div>
    </div>
  );
};

const AccountCard = ({ accountData }: { accountData: Subdirectories }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [fade, setFade] = useState(false);

  const toggleSwitch = () => setOpen(!open);

  useEffect(() => {
    if (open === true) {
      //after 1.3 seconds, navigate to account page
      setTimeout(() => {
        setFade(true);
        router.push("/account").catch((err) => console.error(err));
        setOpen(false);
        setFade(false);
      }, 1100);
    }
  }, [open]);

  return (
    <motion.div
      className={`card relative flex h-[14rem] w-[26rem] cursor-pointer flex-col justify-between p-4  `}
      layout
      data-open={open}
      data-fade={fade}
      transition={{ duration: 0.5 }}
      onClick={() => toggleSwitch}
    >
      <div className="flex w-full items-center justify-between">
        <div>
          <CopyableText>Address</CopyableText>
          {accountData.type !== "NORMAL" && <span>{accountData.type}</span>}
        </div>
        {accountData.tag === "AI" && <AITag />}
        {accountData.tag === "SPONSOR" && <SponsorTag />}
        {accountData.tag === "USER" && <UserTag />}
      </div>
      <div
        className="flex w-full items-center justify-between"
        onClick={toggleSwitch}
      >
        <span>
          <span className="text-[1.5rem]">{accountData.icon}</span>
          <span className="font-beni text-[3rem]">{accountData.title}</span>
        </span>
        <span className="font-beni text-[2.5rem]">Balance</span>
      </div>
    </motion.div>
  );
};

const Accounts = ({
  formState,
  handleFormChange,
}: {
  formState: FormValues;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { data: accounts } = api.subdirectory.getAll.useQuery();
  const factoryAddress = "0xA556719b7b297a7ba14ebC539Ad5360587858669";
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const ctx = api.useContext();

  const { mutate } = api.subdirectory.add.useMutation({
    onSuccess: () => {
      ctx.subdirectory.getAll.invalidate();
      setIsAddingAccount(false);
    },
  });

  const createStack = () => {
    console.log("Creating stack");
    if (formState.label !== "" && formState.icon !== "") {
      console.log("Working on it");
      mutate({ title: formState.label, icon: formState.icon });
    }
  };

  const { config } = usePrepareContractWrite({
    address: factoryAddress,
    abi: [
      {
        name: "createFinanceNFT",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [],
        outputs: [],
      },
    ],
    functionName: "deploy",
    value: BigInt(0),
  });

  const { data, write } = useContractWrite(config);

  const { isSuccess, isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  const gradients = [
    "bg-gradient-to-b from-[rgba(234,8,184,1)] to-[rgba(255,201,243,1)]",
    "bg-gradient-to-b from-[rgba(8,30,234,1)] to-[rgba(201,206,255,1)]",
    "bg-gradient-to-b from-[rgba(234,198,8,1)] to-[rgba(255,237,201,1)]",
    "bg-gradient-to-b from-[rgba(8,234,61,1)] to-[rgba(201,255,213,1)]",
  ];

  return (
    <>
      {isAddingAccount ? (
        <div className="flex flex-col items-end gap-4">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => setIsAddingAccount(!isAddingAccount)}
          >
            Cancel
          </span>
          <AddAccount
            formState={formState}
            handleFormChange={handleFormChange}
          />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col">
            {accounts &&
              accounts.map((account, i) => (
                <div
                  key={account.id}
                  className={`relative
                mt-[-10rem]  rounded-md transition-all first-of-type:mt-0 hover:translate-y-[-60%] last-of-type:hover:translate-y-[-20%] ${
                  gradients[i] ||
                  "bg-gradient-to-b from-[rgba(8,234,61,1)] to-[rgba(201,255,213,1)]"
                } `}
                >
                  <AccountCard accountData={account} />
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="mt-10 flex w-full items-center justify-center">
        {isAddingAccount ? (
          <div onClick={() => createStack()}>
            <Button>Save Stack</Button>
          </div>
        ) : (
          <div
            className="flex flex-col gap-2"
            onClick={() => setIsAddingAccount(!isAddingAccount)}
          >
            <Button>Add Stack</Button>
            <Button>Create Root</Button>
          </div>
        )}
      </div>
      {isLoading && <span>Loading...</span>}
      {isSuccess && <span>Minted!</span>}
    </>
  );
};

const EthStacks = () => {
  const { address } = useAccount();

  const initialValues = {
    label: "",
    icon: "",
  };

  const [formState, dispatch] = useReducer(
    (state: FormValues, newState: Partial<FormValues>) => ({
      ...state,
      ...newState,
    }),
    initialValues
  );

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ [name]: value });
  };

  return (
    <div className="absolute right-0 h-screen w-[50vw] overflow-y-auto  bg-white p-8">
      {address && (
        <>
          <Header address={address} />
          <Spacer height={2} />
          <Balance address={address} />
          <Spacer height={1.5} />
          <Divider />
          <Spacer height={2.5} />
          <Accounts formState={formState} handleFormChange={handleFormChange} />
        </>
      )}
    </div>
  );
};

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { chain } = useNetwork();
  const chains = useChains();

  const { open, setOpen, openSIWE, openAbout } = useModal({
    onConnect: () => {
      console.log("onConnect Hook");
    },
    onDisconnect: () => {
      console.log("onDisconnect Hook");
    },
  });
  const { reset } = useConnect();
  const { isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const handleDisconnect = () => {
    disconnect();
    reset();
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-300">
        <div className="relative flex h-full w-full items-center justify-center ">
          {isConnected ? (
            <EthStacks />
          ) : (
            <div>
              {" "}
              <h1 className="text-4xl font-bold">ETH Stacks</h1>
              <SIWEButton showSignOutButton />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
