import { Heart, LogOut, Settings, User } from "lucide-react";
import DropdownItem from "./DropdownItem";
import { signOut } from "next-auth/react";

function UserDropdown() {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="bg-white px-2 py-3 rounded-2xl rounded-tr-none rounded-bl-none shadow-lg border border-gray-200 gap-2 flex flex-col items-center justify-center">
      <DropdownItem icon={User} title="Account" href="/account" />
      <DropdownItem icon={Heart} title="Wishlist" href="/account/liked" />
      <DropdownItem icon={Settings} title="Settings" href="/account/settings" />
      <DropdownItem icon={LogOut} title="Log Out" onClick={handleSignOut} />
    </div>
  );
}

export default UserDropdown;
