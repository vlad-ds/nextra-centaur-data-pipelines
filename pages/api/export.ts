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
  
  try {
    const items = fs.readdirSync(dirPath)

    for (const item of items) {
      const fullPath = path.join(dirPath, item)
      const relativePath = path.join(baseDir, item)
      
      try {
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
      } catch (error) {
        console.error(`Error processing ${fullPath}:`, error)
        continue // Skip files that can't be processed
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error)
    return output // Return whatever we've gathered so far
  }

  return output
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Try multiple possible locations for the pages directory
    const possiblePaths = [
      path.join(process.cwd(), 'pages'),
      path.join(process.cwd(), 'src', 'pages'),
      // Add more possible paths if needed
    ]

    let content = ''
    let foundValidPath = false

    for (const pagesPath of possiblePaths) {
      if (fs.existsSync(pagesPath)) {
        content = processDirectory(pagesPath)
        foundValidPath = true
        break
      }
    }

    if (!foundValidPath) {
      throw new Error('Could not find pages directory')
    }

    // Just send as plain text
    res.setHeader('Content-Type', 'text/plain')
    res.status(200).send(content || 'No content found')
  } catch (error) {
    console.error('Export error:', error)
    res.status(500).json({ 
      message: 'Error generating export',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}