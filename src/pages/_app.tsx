import { type AppType } from "next/app";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { api } from "~/utils/api";
import "@rainbow-me/rainbowkit/styles.css";

import "~/styles/globals.css";
import { WagmiConfig } from "wagmi";
import { chains, config } from "~/utils/wagmi";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
