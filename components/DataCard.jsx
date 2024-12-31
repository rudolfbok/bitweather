import Image from "next/image";

export default function DataCard({ icon, headline, data }) {
  return (
    <div className="flex flex-col backdrop-blur-3xl bg-black/5 rounded-3xl justify-between aspect-square text-white">
      <div className="flex flex-row items-center backdrop-blur-sm rounded-bl-none rounded-br-none rounded-3xl p-3">
        <Image src={icon} alt={headline} height={25} width={25} />
        <p className="text-xl ml-1 font-semibold">{headline}</p>
      </div>
      <p className="text-2xl p-4">{data}</p>
    </div>
  );
}
