import Image from "next/image";

export default function DataCard({ icon, headline, data }) {
  return (
    <div className="flex flex-col backdrop-blur-3xl bg-gray-50 rounded-3xl h-full justify-between aspect-square p-6 md:p-2">
      <div className="flex flex-row items-center rounded-3xl">
        <Image src={icon} alt={headline} height={30} width={30} />
        <p className="text-xl md:text-sm font-semibold ml-1">{headline}</p>
      </div>
      <p className="text-3xl md:text-xl">{data}</p>
    </div>
  );
}
