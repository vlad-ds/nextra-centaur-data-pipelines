# Nextra-Centaur Docs Template 

Nextra-Centaur is a fork of [Nextra](https://nextra.site) tuned for human-AI collaboration! 

Use it to create public knowledge bases that are easy to read and edit by humans and AIs alike.

How it works:
- Fork this repository 
- Create your knowledge base (in collaboration with your AI) by writing markdown files in the `pages` folder. Read the [Nextra documentation](https://nextra.site/docs) for more information.
- Deploy your knowledge base on Vercel or any other platform that supports Next.js.
- Every page has a copy button that allows you to copy the page content to your clipboard. This makes it easy to share the page content with your AI!
- Once you deploy your site, go to `<your-homepage>/api/export` to get the whole knowledge base in a single plaintext file! Paste this in your AI chat or directly provide the link to your AI.

TODO: add live demo link

## Centaur features
- Copy button on every page to easily share the page content with your AI
- Export button to get the whole knowledge base in a single plaintext file

## Future Centaur features
A lot needs to be done! Here are some ideas:
- Integrate directly with Nextra
- Improve the copy page feature: exclude nav data and fix how code blocks are handled
- Better support for code blocks, images and other components
- Improve the export feature: pick the order of the pages and get markdown instead of plaintext
- Add API endpoint to expose a sitemap. For each page, include a description and a count of words / tokens
- Add API endpoint to get the content of a single page
- Claude MCP and Custom GPTs integrations
- Add chatbot support into the website

Feel free to contribute!

## AI prompt to write your knowledge base

Use this prompt to get help writing your knowledge base:

> You are going to write a knowledge base on the topic of `TOPIC`. The knowledge base will be implemented in Nextra-Centaur, an AI-friendly fork of Nextra. The knowledge base contains articles in MDX format. They are organized in nested folders. First, define the structure of the knowledge base. Then, write each article in MDX format. The articles must be added to the `pages/` folder of the repository. Each folder has a `_meta.json` file that defines the metadata for the pages in that folder. Guide the user to add the articles to the `pages/` folder and to define the metadata for each page.

In the future, it would be great to have a scaffolding that will allow the AI to write the knowledge base automatically.

## Quick Start

Click the button to clone this repository and deploy it on Vercel:

[![](https://vercel.com/button)](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2Fvlad-ds%2Fnextra-centaur-docs-template&showOptionalTeamCreation=false)

## Local Development

First, run `pnpm i` to install the dependencies.

Then, run `pnpm dev` to start the development server and visit localhost:3000.

## License

This project is licensed under the MIT License.
