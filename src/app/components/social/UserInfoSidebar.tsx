import { BadgeCheck, PenSquare, ShieldAlert, UserPlus } from "lucide-react";
import Image from "next/image";
import React from "react";

function UserInfoSidebar({ user, session }) {
  return (
    <div className="w-80 flex-shrink-0">
      <div className="bg-white rounded-2xl ring-1 ring-black/5 shadow-lg h-full p-6 flex flex-col">
        <div className="flex flex-col items-center text-center mb-6">
          <Image
            src={user?.image}
            alt={user?.name}
            width={120}
            height={120}
            className="rounded-full mb-4"
          />
          <div className="flex items-center gap-2 mb-2 justify-center">
            <h1 className="font-semibold text-2xl">{user?.name}</h1>
            {user?.emailVerified && <BadgeCheck className="w-5 h-5" />}
          </div>
        </div>

        <div className="flex justify-center gap-8 mb-6 py-4 border-y border-gray-100">
          <div className="text-center">
            <div className="font-bold text-xl">{user?.followers.length}</div>
            <div className="text-gray-500 text-sm">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-xl">{user?.following.length}</div>
            <div className="text-gray-500 text-sm">Following</div>
          </div>
        </div>

        <div className="flex justify-center mb-8 py-4 flex-col">
          <h1 className="text-green-600 font-bold text-2xl text-center">76%</h1>
          <h2 className="text-center font-light text-sm">
            Sustainability Score
          </h2>
        </div>

        <div className="space-y-3 mt-auto">
          <button className="w-full bg-purple-400 cursor-pointer text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition flex items-center relative">
            <span className="absolute left-4">
              {session?.user?.id == user?.id ? <PenSquare /> : <UserPlus />}
            </span>
            <span className="mx-auto">
              {session?.user?.id == user?.id ? "Edit Profile" : "Follow"}
            </span>
          </button>
          {session?.user?.id == user?.id ? (
            ""
          ) : (
            <button className="w-full border border-gray-300 cursor-pointer py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center relative">
              <span className="absolute left-4">
                <ShieldAlert />
              </span>
              <span className="mx-auto">Report</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInfoSidebar;
