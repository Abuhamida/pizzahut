import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 py-28 text-center ">
      <h2 className="font-fugaze text-4xl font-bold">Coming Soon</h2>
      <Link
        href="/"
        className="text-white bg-[#ee3a43] text-xl font-nunito font-bold rounded-2xl cursor-pointer px-4 py-2 mt-2"
      >
        Go back to Home
      </Link>
    </div>
  );
}
