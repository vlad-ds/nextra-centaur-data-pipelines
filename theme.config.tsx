import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { CopyPageButton } from './components/CopyPageButton'

const config: DocsThemeConfig = {
  logo: <span>My Project</span>,
  project: {
    link: 'https://github.com/shuding/nextra-docs-template',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    text: 'Nextra Docs Template',
  },
  main: ({ children }) => {
    return (
      <>
        <CopyPageButton />
        {children}
      </>
    )
  }
}

export default config