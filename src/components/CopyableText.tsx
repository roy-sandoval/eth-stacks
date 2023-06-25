import { CopyIcon } from "public/icons/CopyIcon";

export const CopyableText = ({
  children,
  copyText,
}: {
  children: React.ReactNode;
  copyText?: string;
}) => {
  function copyToClipboard() {
    console.log("copying: ", copyText);
    // navigator.clipboard.writeText(copyText);
  }

  return (
    <div
      className="flex cursor-pointer items-center gap-2"
      onClick={copyToClipboard}
    >
      {children}
      <div>
        <CopyIcon />
      </div>
    </div>
  );
};

export default CopyableText;
