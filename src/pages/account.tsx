/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// @ts-nocheck
import Head from "next/head";
import { useAccount, useBalance } from "wagmi";
import Balance from "~/components/Balance";
import Divider from "~/components/Divider";
import Header from "~/components/Header";
import Spacer from "~/components/Spacer";
import { init, useQuery } from "@airstack/airstack-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TokenCard from "~/components/Token";
import Contact from "~/components/Contact";

init(process.env.AIRSTACK_API_KEY || "4cc56fba40604ef3b4bcb0ae34784293");

const DisplayNFTs = () => {
  const query = `query GetAllNFTsOwnedByUser {
    TokenBalances(input: {filter: {owner: {_in: ["5256.eth"]}, tokenType: {_in: [ERC1155, ERC721]}}, blockchain: ethereum, limit: 10}) {
      TokenBalance {
        owner {
          addresses
        }
        tokenNfts {
          address
          tokenId
          blockchain
          contentValue {
            image {
              original
            }
          }
          metaData {
            name
          }
        }
      }
    }
  }
  `;

  const [userNFTs, setUserNFTs] = useState();
  const { data, loading } = useQuery(query);

  useEffect(() => {
    if (data) {
      setUserNFTs(data.TokenBalances.TokenBalance);
    }
  }, [data, userNFTs]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-8 ">
          {userNFTs &&
            userNFTs.map((nft, i) => {
              return (
                <div key={i}>
                  {nft.tokenNfts.contentValue.image !== null && (
                    <Link href={`/nft/${nft.tokenNfts.address}`}>
                      <div className="flex flex-col gap-2">
                        <div className="relative aspect-[5/6] w-full overflow-hidden rounded-md">
                          <Image
                            src={nft.tokenNfts.contentValue.image.original}
                            alt={nft.tokenNfts.address}
                            fill
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="font-bold">
                          {nft.tokenNfts.metaData.name}
                        </span>
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

const DisplayERC20s = ({ address }: { address: `0x${string}` }) => {
  const { data: ethBalance } = useBalance({
    address: address,
  });

  return (
    <div>
      <div className="flex items-center justify-center gap-8">
        <TokenCard amount={ethBalance?.formatted} token={ethBalance?.symbol} />
      </div>
    </div>
  );
};

const AccountView = () => {
  const { address } = useAccount();
  return (
    <div className="absolute right-0 h-screen w-[50vw] overflow-y-auto  bg-white p-8">
      <>
        {" "}
        <Header address={address} subdirectory="title" />
        <Spacer height={2.5} />
        <Balance address={address} />
        <Spacer height={1} />
        <Divider />
        <Spacer height={2} />
        <DisplayERC20s address={address} />
        <Spacer height={2} />
        <Divider />
        <Spacer height={3} />
        <DisplayNFTs />
      </>
    </div>
  );
};

export default function Account() {
  return (
    <>
      <Head>
        <title>ETH Stacks</title>
        <meta name="description" content="All of your token bound accounts in one place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f6f6f6]">
        <div className="relative flex h-full w-full items-center justify-center ">
          <AccountView />
        </div>
        <Contact />
      </main>
    </>
  );
}
