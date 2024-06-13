import { auth } from "@/lib/auth";

export const metadata = {
  title: "Guest Area",
};

async function Page() {
  const session = await auth();
  console.log(session);
  return <div>Welcome {session?.user?.name}</div>;
}

export default Page;
