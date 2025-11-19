import { useState } from "react";

export default function UrlForm({ onSubmit, loading }) {
  const [url, setUrl] = useState("");
  const [maxClips, setMaxClips] = useState(5);
  const [clipLength, setClipLength] = useState(30);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    onSubmit({ url, max_clips: Number(maxClips), clip_length: Number(clipLength) });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-4 md:p-6 flex flex-col gap-4">
      <div>
        <label className="block text-sm text-blue-200/80 mb-2">YouTube URL</label>
        <input
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full bg-slate-900/70 text-white border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-blue-200/80 mb-2">Jumlah Klip</label>
          <input
            type="number"
            min="1"
            max="10"
            value={maxClips}
            onChange={(e) => setMaxClips(e.target.value)}
            className="w-full bg-slate-900/70 text-white border border-slate-700 rounded-xl px-4 py-3 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-blue-200/80 mb-2">Durasi Klip (detik)</label>
          <input
            type="number"
            min="10"
            max="120"
            value={clipLength}
            onChange={(e) => setClipLength(e.target.value)}
            className="w-full bg-slate-900/70 text-white border border-slate-700 rounded-xl px-4 py-3 focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white rounded-xl px-5 py-3 transition-colors"
      >
        {loading ? "Menganalisis..." : "Analisa Video"}
      </button>
    </form>
  );
}
