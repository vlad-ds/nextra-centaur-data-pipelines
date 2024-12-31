import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from 'fs'

// Helper function to read file content
const readFileContent = (filePath: string): string => {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return `Error reading file: ${filePath}`
  }
}

// Recursive function to process directory
const processDirectory = (dirPath: string, baseDir: string = ''): string => {
  let output = ''
  const items = fs.readdirSync(dirPath)

  for (const item of items) {
    const fullPath = path.join(dirPath, item)
    const relativePath = path.join(baseDir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      // Skip special directories
      if (item.startsWith('_') || item === 'api') continue
      
      output += processDirectory(fullPath, relativePath)
    } else {
      // Only process .mdx files
      if (item.endsWith('.mdx')) {
        const urlPath = relativePath
          .replace(/\.mdx$/, '')
          .replace(/\\/g, '/')
        
        output += `\n=== ${urlPath} ===\n\n`
        output += readFileContent(fullPath)
        output += '\n\n'
      }
    }
  }

  return output
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const pagesDir = path.join(process.cwd(), 'pages')
    const content = processDirectory(pagesDir)
    
    // Just send as plain text
    res.setHeader('Content-Type', 'text/plain')
    res.status(200).send(content)
  } catch (error) {
    console.error('Export error:', error)
    res.status(500).json({ message: 'Error generating export' })
  }
} 