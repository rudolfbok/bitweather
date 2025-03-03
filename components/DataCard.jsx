import Image from 'next/image';

export default function DataCard({ icon, headline, data }) {
	return (
		<div className="flex flex-col bg-zinc-500/5 rounded-2xl h-full justify-between aspect-square p-6 md:p-3">
			<div className="flex flex-row items-start md:items-center">
				<Image src={icon} alt={headline} height={30} width={30} />
				<p className="text-xl md:text-sm font-semibold ml-1">{headline}</p>
			</div>
			<p className="text-3xl md:text-xl">{data}</p>
		</div>
	);
}
