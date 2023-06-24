import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { CopyIcon } from "public/icons/CopyIcon";
import { UserPlaceholder } from "public/icons/UserPlaceholder";
import { useAccount, useBalance, useEnsAvatar, useEnsName } from "wagmi";
import truncateEthAddress from "truncate-eth-address";
import Image from "next/image";

const CopyableText = ({
  children,
  copyText,
}: {
  children: React.ReactNode;
  copyText?: string;
}) => {
  function copyToClipboard() {
    console.log("copying: ", copyText);
    // navigator.clipboard.writeText(copyText);
  }

  return (
    <div
      className="flex cursor-pointer items-center gap-2"
      onClick={copyToClipboard}
    >
      {children}
      <div>
        <CopyIcon />
      </div>
    </div>
  );
};

const Notifications = () => {
  return (
    <div>
      <div>image</div>
      <div>counter</div>
    </div>
  );
};

const Header = ({ address }) => {
  const shortAddress = address ? truncateEthAddress(address) : "No address";

  const { data: ens } = useEnsName({
    address: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ens,
  });

  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-4">
        <div>
          {ensAvatar ? (
            <Image
              src={ensAvatar}
              className="h-20 w-20 rounded-full"
              alt="avatar"
              height={80}
              width={80}
            />
          ) : (
            <UserPlaceholder />
          )}
        </div>
        <div>
          <CopyableText copyText={address?.toString()}>
            <span>
              <strong>Main Address:</strong> {shortAddress}
            </span>
          </CopyableText>
          {ens && <span className="mt-2 text-xl">{ens}</span>}
        </div>
      </div>
      <Notifications />
    </div>
  );
};

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

const Balance = ({ address }) => {
  const { data } = useBalance(address);
  const balance = data?.formatted || "$0.00";
  return (
    <div className="flex w-full flex-col items-center">
      <span className="uppercase">Total balance</span>
      <span className="font-beni text-[5rem] leading-none ">
        {balance} {data?.symbol}
      </span>
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

const AccountCard = ({ accountData }) => {
  //onClick run animation then navigate to account page

  return (
    <div
      className={`relative flex h-[14rem] w-[26rem] cursor-pointer flex-col justify-between rounded-md p-4 transition-all hover:translate-y-[-15%] ${accountData.gradient}`}
    >
      <div className="flex w-full items-center justify-between">
        <div>
          <CopyableText>Address</CopyableText>
          {accountData.type !== "normal" && <span>{accountData.type}</span>}
        </div>
        {accountData.tag === "ai" && <AITag />}
        {accountData.tag === "sponsor" && <SponsorTag />}
        {accountData.tag === "user" && <UserTag />}
      </div>
      <div className="flex w-full items-center justify-between">
        <span>
          <span className="text-[1.5rem]">{accountData.icon}</span>
          <span className="font-beni text-[3rem]">{accountData.title}</span>
        </span>
        <span className="font-beni text-[2.5rem]">Balance</span>
      </div>
    </div>
  );
};

const Accounts = () => {
  const accounts = [
    {
      id: 1,
      address: "0x123",
      tag: "sponsor",
      type: "normal",
      title: "My NFTs",
      icon: "🔥",
      gradient:
        "bg-gradient-to-b from-[rgba(234,8,184,1)] to-[rgba(255,201,243,1)]",
    },
    {
      id: 2,
      address: "0x123",
      tag: "ai",
      type: "normal",
      title: "My NFTs",
      icon: "🔥",
      gradient:
        "bg-gradient-to-b from-[rgba(234,198,8,1)] to-[rgba(255,237,201,1)]",
    },
    {
      id: 3,
      address: "0x123",
      tag: "user",
      type: "joint account",
      title: "My NFTs",
      icon: "🔥",
      gradient:
        "bg-gradient-to-b from-[rgba(8,30,234,1)] to-[rgba(201,206,255,1)]",
    },
    {
      id: 4,
      address: "0x123",
      tag: "none",
      type: "normal",
      title: "My NFTs",
      icon: "🔥",
      gradient:
        "bg-gradient-to-b from-[rgba(8,234,61,1)] to-[rgba(201,255,213,1)]",
    },
  ];
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex flex-col gap-10">
        {accounts.map((account) => (
          <div
            key={account.id}
            className={`relative ${account.id !== 1 ? "mt-[-12rem]" : "mt-0"}`}
          >
            <AccountCard accountData={account} />
          </div>
        ))}
        <Button>Add Account</Button>
      </div>
    </div>
  );
};

const EthStacks = () => {
  const { address } = useAccount();
  return (
    <div className="absolute right-0 h-screen w-[50vw] overflow-y-auto bg-white p-8">
      <Header address={address} />
      <Spacer height={2} />
      <Balance address={address} />
      <Spacer height={1.5} />
      <Divider />
      <Spacer height={2.5} />
      <Accounts />
    </div>
  );
};

export default function Home() {
  const { isConnected } = useAccount();

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
              <ConnectButton />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
