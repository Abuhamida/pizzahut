import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <Image
        src={"/main-1.png"}
        alt=""
        width={500}
        height={500}
        className=" w-full object-cover bg-center bg-no-repeat h-full min-h-screen"
      />
    </div>
  );
}
