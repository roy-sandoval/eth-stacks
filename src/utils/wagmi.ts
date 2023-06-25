import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const WALLET_CONNECT_PROJECT_ID = "b216b99e502e3a8eaeffce841fdce927";

const { chains, publicClient } = configureChains(
  [
    goerli,
    // ...(process.env.NODE_ENV === 'development' ? [optimismGoerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Hackathon Template",
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains,
});

export const config = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

export { chains };
