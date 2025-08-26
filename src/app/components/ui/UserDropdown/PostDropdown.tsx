import { Pen, Trash } from "lucide-react";
import DropdownItem from "./DropdownItem";

interface PostDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

function PostDropdown({ onEdit, onDelete }: PostDropdownProps) {
  return (
    <div className="bg-white px-2 py-3 rounded-2xl rounded-tr-none rounded-bl-none shadow-lg border border-gray-200 gap-2 flex flex-col">
      <DropdownItem icon={Pen} title="Edit post" onClick={onEdit} />
      <DropdownItem icon={Trash} title="Delete post" onClick={onDelete} />
    </div>
  );
}

export default PostDropdown;
