import Head from "next/head";
import { useAccount } from "wagmi";
import Balance from "~/components/Balance";
import Header from "~/components/Header";

const DisplayNFTs = () => {
  return (
    <div>
      <div>Hi</div>
    </div>
  );
};

const AccountView = () => {
  const { address } = useAccount();
  return (
    <div className="absolute right-0 h-screen w-[50vw] overflow-y-auto  bg-white p-8">
      <Header address={address} subdirectory="title" />
      <Balance address={address} />
      <DisplayNFTs />
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-300">
        <div className="relative flex h-full w-full items-center justify-center ">
          <AccountView />
        </div>
      </main>
    </>
  );
}
