/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { init, useQuery } from "@airstack/airstack-react";
import Head from "next/head";
import Image from "next/image";
import { useAccount } from "wagmi";
import Button from "~/components/Button";
import Contact from "~/components/Contact";
import Header from "~/components/Header";
import Spacer from "~/components/Spacer";
import TokenCard from "~/components/Token";

init(process.env.AIRSTACK_API_KEY || "4cc56fba40604ef3b4bcb0ae34784293");

const NFT = () => {
  const query = `query GetSpecificNftMetadata {
    TokenNft(
      input: {address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", tokenId: "5256", blockchain: ethereum}
    ) {
      contentValue {
        image {
          original
        }
      }
      token {
        name
      }
    }
  }
      `;

  const { data } = useQuery(query);

  return (
    <div className="flex items-center gap-8">
      <div className="relative aspect-[5/6] w-[25vw] overflow-hidden rounded-md">
        <Image
          src={data?.TokenNft.contentValue.image.original}
          alt={data?.TokenNft.token.name}
          fill
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-beni text-[5rem] tracking-[0.04em]">
          {data?.TokenNft.token.name}
        </span>
        <div className="flex gap-4">
          <Button>Deposit</Button>
          <Button>Transfer Account</Button>
        </div>
      </div>
    </div>
  );
};

const NFTBalance = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <span>Total Balance</span>
          <span className="font-beni text-[3rem] leading-none tracking-[0.04em]">
            $1,000.00
          </span>
        </div>
        <TokenCard amount={432.9004} token="APE" tokenPrice={2.31} />
      </div>
    </div>
  );
};

const NFTAssetCard = () => {
  return (
    <div className="relative flex flex-col gap-2 bg-gray-100 p-4">
      <div className="relative flex h-[13rem] rounded-md ">
        <Image
          src="/gold-chain.png"
          alt="Gold chain"
          fill
          className="object-fit"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-bold uppercase">Gold Chain</span>
        <span>1ETH</span>
      </div>
    </div>
  );
};

const NFTAssets = () => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold uppercase">Assets</span>
      <div className="grid grid-cols-3 gap-4">
        <NFTAssetCard />
        <NFTAssetCard />
        <NFTAssetCard />
      </div>
    </div>
  );
};

const NFTView = () => {
  const { address } = useAccount();
  return (
    <div className="absolute right-0 h-screen w-[50vw] overflow-y-auto  bg-white p-8">
      <>
        {" "}
        <Header address={address} subdirectory="title" />
        <Spacer height={2.5} />
        <NFT />
        <Spacer height={2} />
        <NFTBalance />
        <Spacer height={2} />
        <NFTAssets />
      </>
    </div>
  );
};

export default function NFTPage() {
  return (
    <>
      <Head>
        <title>ETH Stacks</title>
        <meta name="description" content="All of your token bound accounts in one place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f6f6f6]">
        <div className="relative flex h-full w-full items-center justify-center ">
          <NFTView />
        </div>
        <Contact />
      </main>
    </>
  );
}
