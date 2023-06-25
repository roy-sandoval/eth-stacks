import Image from "next/image";

export const TokenCard = ({
  amount,
  token,
  tokenPrice = 1800,
}: {
  amount: any;
  token: string;
  tokenPrice?: number;
}) => {
  const amountInUSD = (amount * tokenPrice).toLocaleString("en-US");
  return (
    <div className="text-primary-content flex items-center gap-4 rounded-[0.25rem] bg-gray-100 px-2 py-1">
      <div>
        <Image
          src={`/tokens/${token}.svg`}
          alt={token}
          width={24}
          height={24}
        />
      </div>
      <div className="flex flex-col">
        <span className="font-bold">
          {amount} {token}
        </span>
        <span className="text-sm opacity-60">${amountInUSD}</span>
      </div>
    </div>
  );
};

export default TokenCard;
