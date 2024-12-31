import { useState } from 'react'

export function CopyPageButton() {
  const [copied, setCopied] = useState(false)

  const copyPageContent = () => {
    const mainElement = document.querySelector('main')
    if (!mainElement) return

    const content = Array.from(mainElement.children)
      .map(element => {
        // Get text content while handling code blocks specially
        if (element.querySelector('pre')) {
          // Handle code blocks
          const codeBlocks = Array.from(element.querySelectorAll('pre'))
          return codeBlocks
            .map(block => {
              const filename = block.querySelector('[data-filename]')?.textContent
              const code = block.querySelector('code')?.textContent?.trim() || ''
              return `${filename ? `File: ${filename}\n` : ''}${code}\n`
            })
            .join('\n')
        }

        // Get regular text content
        const text = element.textContent?.trim() || ''
        
        // Add double line breaks after headings
        if (element.tagName.match(/^H[1-6]$/)) {
          return `${text}\n\n`
        }
        
        // Skip empty elements
        if (!text) return ''
        
        // Add single line break after paragraphs and other elements
        return `${text}\n`
      })
      .join('')
      .replace(/\n{3,}/g, '\n\n') // Replace multiple line breaks with double line breaks
      .trim()
    
    // Copy to clipboard
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={copyPageContent}
      className="fixed top-4 right-4 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
    >
      {copied ? '✅ Copied!' : '📋 Copy Page'}
    </button>
  )
}