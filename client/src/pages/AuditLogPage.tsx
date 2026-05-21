import { useEffect, useState } from 'react'

interface AuditEntry {
  timestamp: string
  session_id: string
  tool: string
  file: string
  command: string
  exit_code: string
  skill: string
}

export default function AuditLogPage() {
  const [files, setFiles] = useState<string[]>([])
  const [selected, setSelected] = useState<string>('')
  const [entries, setEntries] = useState<AuditEntry[]>([])
  const [toolFilter, setToolFilter] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/audit-logs')
      .then((r) => r.json())
      .then((data: string[]) => {
        setFiles(data)
        if (data.length > 0) setSelected(data[0])
      })
  }, [])

  useEffect(() => {
    if (!selected) return
    setLoading(true)
    fetch(`/api/audit-logs/${selected}`)
      .then((r) => r.json())
      .then((data: AuditEntry[]) => setEntries([...data].reverse()))
      .finally(() => setLoading(false))
  }, [selected])

  const visibleEntries = toolFilter ? entries.filter((e) => e.tool === toolFilter) : entries

  const cellStyle = { border: '1px solid #e0e0e0', padding: '0.4rem 0.6rem' }
  const thStyle = { ...cellStyle, textAlign: 'left' as const }
  const tdStyle = cellStyle

  return (
    <div style={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)', padding: '0 20px' }}>
      <h2>Audit Logs</h2>
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
        <div>
          <label htmlFor="log-select">Log file: </label>
          <select
            id="log-select"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {files.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tool-filter">Tool: </label>
          <select
            id="tool-filter"
            value={toolFilter}
            onChange={(e) => setToolFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Edit">Edit</option>
            <option value="Bash">Bash</option>
            <option value="Skill">Skill</option>
            <option value="Read">Read</option>
          </select>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Timestamp</th>
              <th style={thStyle}>Tool</th>
              <th style={thStyle}>File</th>
              <th style={thStyle}>Command</th>
            </tr>
          </thead>
          <tbody>
            {visibleEntries.map((entry, i) => (
              <tr key={i}>
                <td style={tdStyle}>{new Date(entry.timestamp).toLocaleTimeString()}</td>
                <td style={tdStyle}>{entry.tool}{entry.skill ? `: ${entry.skill}` : ''}</td>
                <td style={{ ...tdStyle, wordBreak: 'break-all', maxWidth: '200px' }}>{entry.file}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '0.8em', maxWidth: '300px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{entry.command}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
