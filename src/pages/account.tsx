import Head from "next/head";
import { useAccount } from "wagmi";
import Balance from "~/components/Balance";
import Divider from "~/components/Divider";
import Header from "~/components/Header";
import Spacer from "~/components/Spacer";
import { init, useQuery } from "@airstack/airstack-react";

init(process.env.AIRSTACK_API_KEY || "4cc56fba40604ef3b4bcb0ae34784293");

const DisplayNFTs = () => {
  const query = `query GetAllNFTsOwnedByVitalik {
    TokenBalances(input: {filter: {owner: {_in: ["vitalik.eth"]}, tokenType: {_in: [ERC1155, ERC721]}}, blockchain: ethereum, limit: 10}) {
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
        }
      }
    }
  }
  `;

  const { data, loading } = useQuery(query);
  console.log(data);

  return (
    <div>{loading ? <p>Loading...</p> : <div>{JSON.stringify(data)}</div>}</div>
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
