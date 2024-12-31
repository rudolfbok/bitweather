import Image from "next/image";

export default function DataCard({ icon, headline, data }) {
  return (
    <div className="flex flex-col backdrop-blur-3xl bg-black/5 rounded-3xl h-full justify-between aspect-square text-white">
      <div className="flex flex-row items-center rounded-bl-none border-b border-white rounded-3xl">
        <Image src={icon} alt={headline} height={25} width={25} />
        <p className="text-xl">{headline}</p>
      </div>
      <p className="text-2xl p-4">{data}</p>
    </div>
  );
}
