'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function ClientHome() {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [response, setResponse] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState([])

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
    const value = e.target.value
    setSelectedOptions(prevOptions =>
      prevOptions.includes(value)
        ? prevOptions.filter(option => option !== value)
        : [...prevOptions, value]
    )
  }

  const renderResponse = () => {
    if (!response) return null

    return selectedOptions.map(option => (
      <div key={option}>
        <h3>{option}</h3>
        <p>{JSON.stringify(response[option])}</p>
      </div>
    ))
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
          <h2>Select options to display:</h2>
          <div>
            <label>
              <input
                type="checkbox"
                value="alphabets"
                onChange={handleOptionChange}
                checked={selectedOptions.includes('alphabets')}
              />
              Alphabets
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="numbers"
                onChange={handleOptionChange}
                checked={selectedOptions.includes('numbers')}
              />
              Numbers
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="highest_lowercase_alphabet"
                onChange={handleOptionChange}
                checked={selectedOptions.includes('highest_lowercase_alphabet')}
              />
              Highest lowercase alphabet
            </label>
          </div>
        </div>
      )}
      {renderResponse()}
    </div>
  )
}