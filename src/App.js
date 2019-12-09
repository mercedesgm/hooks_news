import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios'

export default function App() {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('react hooks')
  const searchInputRef = useRef()
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)
  
  useEffect(() => {
    getResults()
  }, [])

  const getResults = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`)
      setErr(null)
      setResults(response.data.hits)
    } catch (error) {
      setErr(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = event => {
    event.preventDefault()
    getResults()
  }

  const handleClearSearch = () => {
    setQuery("")
    searchInputRef.current.focus()
  }

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-blue-200 shadow-lg">
    <img src="https://icon.now.sh/react/c0c" className="float-right h-12" alt="react"/>
    <h1 className="text-grey-darkest font-thin">My Hooks News</h1>
    <form onSubmit={handleSearch} className="mb-2">
      <input type="text" ref={searchInputRef} onChange={event => setQuery(event.target.value)} value={query} className="border p-1 rounded"/>
      <button type="submit" className="bg-orange-500 rounded m-1 p-1">Search</button>
      <button type="button" className="bg-teal-500 text-white rounded m-1 p-1" onClick={handleClearSearch}>Clear</button>
    </form>
    {loading ? (
      <div>Loading...</div>
    ) : 
    (<ul className="leading-normal">
    {results.map(result => (
      <li key={result.ObjectID}>
        <a 
          href={result.url}
          className="text-indigo-900 hover:text-indigo-300"
        >{result.title}</a>
      </li>
    ))}
    </ul>)}
    {err && <div className="text-red-500 font-bold">{err.message}</div>}
    </div>

  )
}
