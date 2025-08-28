import { prisma } from "@/lib/db";
import { BadgeCheck, EllipsisIcon } from "lucide-react";
import Image from "next/image";

export default async function UserAccountPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      name: true,
      image: true,
      followers: true,
      following: true,
      emailVerified: true,
    },
  });

  return (
    <div className="flex max-h-[80vh] h-[80vh] w-full">
      <div className="bg-white rounded-2xl ring-1 ring-black/5 shadow-lg h-full w-full p-12">
        <div className="flex relative w-full h-40 bg-[url('https://images.unsplash.com/photo-1669053871927-3df53c13194d?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] ">
          <div className="rounded-full absolute bottom-0 left-8 translate-y-10 flex gap-8">
            <Image
              src={user?.image}
              width={512}
              height={512}
              alt="User avatar"
              className="rounded-full w-35 h-35 outline-8 outline-white"
            />
            <div className="bg-white px-4 py-6 rounded-t-2xl">
              <h1 className="font-semibold text-2xl flex gap-2 items-center justify-start">
                {user?.name} {user?.emailVerified && <BadgeCheck />}
              </h1>
              <div className="flex gap-4">
                <h2>
                  <span className="font-bold">{user?.followers.length}</span>{" "}
                  followers
                </h2>
                <h2>
                  <span className="font-bold">{user?.following.length}</span>{" "}
                  following
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
