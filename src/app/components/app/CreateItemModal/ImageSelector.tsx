import { ImageUp } from "lucide-react";
import React from "react";

function ImageSelector({
  onChange,
}: {
  onChange: (files: FileList | null) => void;
}) {
  return (
    <div className="group relative rounded-2xl bg-gray-200 w-40 h-40 group flex items-center justify-center">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => onChange(e.target.files)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="transition group-hover:border-gray-600 border-l-6 border-t-6 border-gray-400 absolute top-5 left-5 w-5 h-5 " />
      <div className="transition group-hover:border-gray-600 border-l-6 border-b-6 border-gray-400 absolute bottom-5 left-5 w-5 h-5 " />
      <div className="transition group-hover:border-gray-600 border-r-6 border-t-6 border-gray-400 absolute top-5 right-5 w-5 h-5 " />
      <div className="transition group-hover:border-gray-600 border-r-6 border-b-6 border-gray-400 absolute bottom-5 right-5 w-5 h-5 " />
      <ImageUp className="transition group-hover:text-gray-600 text-gray-400" />
    </div>
  );
}

export default ImageSelector;
