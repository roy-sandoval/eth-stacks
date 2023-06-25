import {  type AppProps } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { WagmiConfig, createConfig } from 'wagmi';
import { ConnectKitProvider, type SIWESession } from 'connectkit';
import { siweClient } from "@/utils/siweClient";
import { getDefaultConfig } from "connectkit";

import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
const chains = [mainnet, polygon, optimism, arbitrum];

const config = createConfig(
  getDefaultConfig({
    chains,
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,

    // Required
    appName: "Stacks",

    // Optional
    appDescription: "All of your token bound accounts in one place",
    appUrl: "https://family.co", // your app's url
    appLogo: "https://family.co/logo.png",
  }),);
  /*
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),});

  */

  function App({ Component, pageProps }: AppProps) {
    return (
      <siweClient.Provider
        onSignIn={(data?: SIWESession) => {
          console.log('onSignIn Provider', data);
        }}
        onSignOut={() => {
          console.log('onSignOut Provider');
        }}
      >
        <ConnectKitProvider
          onConnect={(data) => {
            console.log('onConnect Provider', data);
          }}
          onDisconnect={() => {
            console.log('onDisconnect Provider');
          }}
          debugMode
        >
          <Component {...pageProps} />
        </ConnectKitProvider>
      </siweClient.Provider>
    );
  }
function MyApp(appProps: AppProps) {
  return (
    <>
      <WagmiConfig config={config}>
          <App {...appProps} />
      </WagmiConfig>
    </>
  );
}
export default api.withTRPC(MyApp);
/*const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps }, }) => {
  return (

    <siweClient.Provider
  // Optional parameters
  enabled={true} // defaults true
  nonceRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
  sessionRefetchInterval={300000}// in milliseconds, defaults to 5 minutes
  signOutOnDisconnect={true} // defaults true
  signOutOnAccountChange={true} // defaults true
  signOutOnNetworkChange={true} // defaults true
  onSignIn={(session?: SIWESession) => void}
  onSignOut={() => void}
  >

    <WagmiConfig config={config}>
      <ConnectKitProvider debugMode>
      <SessionProvider session={session}>

        <Component {...pageProps} />
        </SessionProvider>

        </ConnectKitProvider>
    </WagmiConfig>
    </siweClient.Provider>

  );
};
*/

