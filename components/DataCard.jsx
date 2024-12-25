import Image from 'next/image';

export default function DataCard({ icon, headline, data }) {

  return (
        <div className="flex flex-col backdrop-blur-3xl bg-black/5 p-3 rounded-3xl justify-between w-full aspect-square text-white">
          <div className="flex flex-row items-center">
            <Image src={icon} alt={headline} height={25} width={25} />
            <p className="text-l ml-1 font-bold">{headline}</p>
          </div>
          <p className="text-2xl">{data}</p>
        </div>
  );
}
