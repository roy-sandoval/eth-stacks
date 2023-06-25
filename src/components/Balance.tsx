import { useBalance } from "wagmi";

export const Balance = ({ address }: { address: `0x${string}` }) => {
  const { data } = useBalance({ address });
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

export default Balance;
