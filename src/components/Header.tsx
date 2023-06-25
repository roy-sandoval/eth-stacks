import truncateEthAddress from "truncate-eth-address";
import Image from "next/image";
import { UserPlaceholder } from "public/icons/UserPlaceholder";
import { useEnsAvatar, useEnsName } from "wagmi";
import CopyableText from "./CopyableText";

const Notifications = () => {
  return (
    <div>
      <div>image</div>
      <div>counter</div>
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
    address: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
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
            <span className="mt-2 text-xl">{ens}</span>
          ) : (
            <span className="mt-2 text-xl">My Account</span>
          )}
          {subdirectory && <span className="text-xl"> / {subdirectory}</span>}
        </div>
      </div>
      <Notifications />
    </div>
  );
};

export default Header;
