import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="">Page Admin</div>
      <Link href={"/public"}>Back</Link>
    </>
  );
};

export default Page;
