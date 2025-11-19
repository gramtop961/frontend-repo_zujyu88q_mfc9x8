export default function Results({ data }) {
  if (!data) return null;

  const toTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-center gap-4">
        <img src={data.thumbnail} alt="thumb" className="w-28 h-20 object-cover rounded-lg border border-slate-700" />
        <div>
          <div className="text-white font-semibold leading-tight">{data.title || 'YouTube Video'}</div>
          <div className="text-blue-300/70 text-sm">{data.author || 'Unknown'}</div>
        </div>
      </div>

      {data.summary && (
        <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-4">
          <div className="text-blue-200 text-sm">Ringkasan</div>
          <div className="text-white mt-1">{data.summary}</div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {data.suggestions?.map((s, i) => (
          <a key={i} href={`${data.url}&t=${Math.floor(s.start)}s`} target="_blank" rel="noreferrer" className="group block bg-slate-800/60 border border-slate-700 hover:border-blue-500/50 rounded-2xl p-4 transition-colors">
            <div className="text-xs text-blue-300/80">{toTime(s.start)} - {toTime(s.end)}</div>
            <div className="text-white font-medium mt-1 group-hover:text-blue-200 transition-colors">{s.title}</div>
            <div className="text-blue-200/80 text-sm line-clamp-3 mt-1">{s.text}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
