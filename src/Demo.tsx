import React, { useEffect, useRef, useState } from 'react'
import AirFryerForm from './AirFryerHome'
import { createRoot } from 'react-dom/client'

function Demo() {
    const [demoHtmlContent, setDemoHtmlContent] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const demoContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      // Fetch the demo.html content at runtime
      fetch('/design.html')
        .then(response => response.text())
        .then(htmlContent => {
          setDemoHtmlContent(htmlContent)
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Error loading demo.html:', error)
          // Fallback content if fetch fails
          setDemoHtmlContent('<div id="demo-content">Error loading demo content</div>')
          setIsLoading(false)
        })
    }, [])

    useEffect(() => {
      if (demoContainerRef.current && demoHtmlContent) {
        // Find the demo-content div within the rendered HTML
        const demoContentDiv = demoContainerRef.current.querySelector('#demo-content')
        if (demoContentDiv) {
          // Create a React root and render the AirFryerForm component
          const root = createRoot(demoContentDiv)
          root.render(<AirFryerForm />)
        }
      }
    }, [demoHtmlContent])
    
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        textAlign: 'center'
      }}>
        Your website is crawling to you just like spider
      </div>
    )
  }

  return (
    <div 
    ref={demoContainerRef}
    dangerouslySetInnerHTML={{ __html: demoHtmlContent }}
  />
  )
}

export default Demo;