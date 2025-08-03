export default function SourceInfo({ fileName }: { fileName: string }) {
	return (
		<div className="flex flex-col gap-2">
			<p className="text-sm text-gray-500">Source: {fileName}</p>
		</div>
	);
}
