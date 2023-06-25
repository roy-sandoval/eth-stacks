import Head from "next/head";
import CopyableText from "~/components/CopyableText";
import Header from "~/components/Header";
import { useWalletClient } from "wagmi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Balance from "~/components/Balance";
import { TokenboundClient } from "@tokenbound/sdk";
import { api } from "~/utils/api";
import type { Subdirectories } from "@prisma/client";
import {
  Types,
  ConnectKitButton,
  Avatar,
  SIWEButton,
  ChainIcon,
  type SIWESession,
  useChains,
  useModal,
  useSIWE,
} from 'connectkit';

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
} from 'wagmi';

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

const Button = ({
  icon,
  children,
}: {
  icon?: any;
  children: React.ReactNode;
}) => {
  return (
    <button className="rounded-full bg-black px-12 py-5 text-white">
      {icon && <div>{icon}</div>}
      <span className="leading-none">{children}</span>
    </button>
  );
};

const Spacer = ({ height }: { height: number }) => {
  return <div style={{ height: `${height}rem` }} />;
};

const Divider = () => {
  return <div className="h-[1px] w-full bg-gray-200" />;
};

const AccountCard = ({ accountData }: { accountData: Subdirectories }) => {
  //onClick run animation then navigate to account page
  const router = useRouter();


  if (status !== "authenticated") return null;

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
      className={`card relative flex h-[14rem] w-[26rem] cursor-pointer flex-col justify-between rounded-md p-4 transition-all hover:translate-y-[-60%]`}
      layout
      data-open={open}
      data-fade={fade}
      transition={{ duration: 0.5 }}
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

const Accounts = () => {
  const { isSignedIn, data } = useSIWE();
  const { data: accounts } = api.subdirectory.getAll.useQuery();
  const gradients = [
    "bg-gradient-to-b from-[rgba(234,8,184,1)] to-[rgba(255,201,243,1)]",
    "bg-gradient-to-b from-[rgba(8,30,234,1)] to-[rgba(201,206,255,1)]",
    "bg-gradient-to-b from-[rgba(234,198,8,1)] to-[rgba(255,237,201,1)]",
    "bg-gradient-to-b from-[rgba(8,234,61,1)] to-[rgba(201,255,213,1)]",
  ];

  const { data: walletClient } = useWalletClient();

  const nftContract = "0x3f74F59fcD89c08CB0a29a08042ccd84E26F624D";

  function handleCreateAccount() {
    if (walletClient) {
      const tokenboundClient = new TokenboundClient({
        walletClient,
        chainId: 1,
      });

      const preparedAccount = tokenboundClient.getAccount({
        tokenContract: nftContract,
        tokenId: "0",
      });

      console.log(preparedAccount);
    }
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex flex-col gap-10">
      <SIWEButton showSignOutButton />
             {accounts &&
          accounts.map((account) => (
            <div
              key={account.id}
              className={`"mt-[-12rem]"
                relative`}
            >
              <AccountCard accountData={account} />
            </div>
          ))}
        <div onClick={() => handleCreateAccount()}>
          <Button>Add Account</Button>
        </div>
      </div>
    </div>
  );
};


const EthStacks = () => {
  const {
    address,
    connector,
    isConnected,
    isConnecting,
    isDisconnected,
    isReconnecting,
  } = useAccount();

  const { data: balanceData } = useBalance({ address });
  const { chain } = useNetwork();
  const { isSignedIn, signOut } = useSIWE({
    onSignIn: (data?: SIWESession) => {
      console.log('onSignIn', data);
    },
    onSignOut: () => {
      console.log('onSignOut');
    },
  });

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
          <Accounts />
        </>
      )}
    </div>
  );
};

export default function Home() {

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { chain } = useNetwork();
  const chains = useChains();

  const { open, setOpen, openSIWE, openAbout } = useModal({
    onConnect: () => {
      console.log('onConnect Hook');
    },
    onDisconnect: () => {
      console.log('onDisconnect Hook');
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
}
