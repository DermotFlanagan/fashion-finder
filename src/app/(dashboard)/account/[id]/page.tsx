import UserInfoSidebar from "@/app/components/social/UserInfoSidebar";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export default async function UserAccountPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      image: true,
      followers: true,
      following: true,
      emailVerified: true,
    },
  });
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex max-h-[80vh] h-[80vh] w-full gap-6">
      <UserInfoSidebar user={user} session={session} />

      <div className="flex-1 grid grid-cols-1 gap-6">
        <div className="bg-white rounded-2xl ring-1 ring-black/5 shadow-lg p-6">
          <h2 className="font-semibold text-lg mb-4">
            {user?.name}&apos;s top categories
          </h2>
          <div className="bg-neutral-300 w-full h-20 rounded-xl" />
        </div>

        <div className="bg-white rounded-2xl ring-1 ring-black/5 shadow-lg p-6">
          <h2 className="font-semibold text-lg mb-4">
            {user?.name}&apos;s wishlisted items
          </h2>
          <div className="bg-neutral-300 w-full h-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
