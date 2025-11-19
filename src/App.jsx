import { useState } from 'react'
import UrlForm from './components/UrlForm'
import Results from './components/Results'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async ({ url, max_clips, clip_length }) => {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const res = await fetch(`${BACKEND_URL}/api/clip`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, max_clips, clip_length })
      })
      if (!res.ok) throw new Error(await res.text())
      const json = await res.json()
      setData(json)
    } catch (e) {
      setError('Gagal menganalisis video. Pastikan URL valid dan memiliki transkrip.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">AI YouTube Clipper</h1>
          <p className="text-blue-200/80 mt-2">Tempel URL YouTube → Dapatkan saran klip otomatis</p>
        </div>
        <UrlForm onSubmit={handleSubmit} loading={loading} />
        {error && (
          <div className="mt-4 bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-3">{error}</div>
        )}
        <Results data={data} />
      </div>
    </div>
  )
}

export default App
