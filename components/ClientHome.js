'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function ClientHome() {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [response, setResponse] = useState(null)
  const [selectedOption, setSelectedOption] = useState('')

  useEffect(() => {
    document.title = '21BRS1114'
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResponse(null)

    try {
      const parsedInput = JSON.parse(input)
      console.log(parsedInput)
      const res = await fetch('https://bfhl-main-aditya-mahapatras-projects.vercel.app/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      })

      if (!res.ok) {
        throw new Error('API request failed')
      }

      const data = await res.json()
      setResponse(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
  }

  const renderResponse = () => {
    if (!response || !selectedOption) return null

    return (
      <div>
        <h3>{selectedOption}</h3>
        <p>{JSON.stringify(response[selectedOption])}</p>
      </div>
    )
  }

  return (
    <div className="container">
      <Head>
        <title>21BRS1114</title>
      </Head>

      <h1>BFHL Frontend - 21BRS1114</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input (e.g., { "data": ["A","C","z"] })'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <h2>Select option to display:</h2>
          <select onChange={handleOptionChange} value={selectedOption}>
            <option value="">Choose an option</option>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest lowercase alphabet</option>
          </select>
        </div>
      )}
      {renderResponse()}
    </div>
  )
}