import truncateEthAddress from "truncate-eth-address";
import Image from "next/image";
import { UserPlaceholder } from "public/icons/UserPlaceholder";
import { useEnsAvatar, useEnsName } from "wagmi";
import CopyableText from "./CopyableText";
import Link from "next/link";

const Notifications = () => {
  return (
    <div>
      <Image
        src="/notifications.png"
        alt="Notifications"
        width={40}
        height={40}
      />
    </div>
  );
};

export const Header = ({
  address,
  subdirectory,
}: {
  address: `0x${string}`;
  subdirectory?: string;
}) => {
  const shortAddress = address ? truncateEthAddress(address) : "No address";

  const { data: ens } = useEnsName({
    address: address,
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
          {ens ? (
            <Link href="/">
              <span className="mt-2 text-xl">{ens}</span>
            </Link>
          ) : (
            <Link href="/">
              {" "}
              <span className="mt-2 text-xl">My Account</span>
            </Link>
          )}
          {subdirectory && <span className="text-xl"> / {subdirectory}</span>}
        </div>
      </div>
      <Notifications />
    </div>
  );
};

export default Header;
