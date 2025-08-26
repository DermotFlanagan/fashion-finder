import { LucideIcon } from "lucide-react";
import React from "react";
import Link from "next/link";

function DropdownItem({
  icon,
  title,
  href,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  href?: string;
  onClick?: () => void;
}) {
  if (href) {
    return (
      <Link href={href}>
        <div className="w-full flex gap-4 rounded-xl hover:bg-neutral-300 px-5 py-2 font-semibold rounded-tr-none rounded-bl-none cursor-pointer items-start justify-between">
          {React.createElement(icon)} {title}
        </div>
      </Link>
    );
  }

  return (
    <div onClick={onClick}>
      <div className="w-full flex gap-4 rounded-xl hover:bg-neutral-300 px-5 py-2 font-semibold rounded-tr-none rounded-bl-none cursor-pointer items-start justify-between">
        {React.createElement(icon)} {title}
      </div>
    </div>
  );
}

export default DropdownItem;
