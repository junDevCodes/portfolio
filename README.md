# Portfolio v2 (Astro)

This project is a modern, static portfolio website built with **Astro**.
It includes a public resume page and a private "Hub" for content management, powered by AI.

## 🚀 Features

- **Public Resume**: Single-page resume with Tabs (About, Projects, Skills) and Modals.
- **Admin Hub**: Dashboard for managing TILs, Knowledge Base, and Bookmarks.
- **AI Knowledge Base**:
  - Auto-generated definitions and tags using **Gemini API**.
  - Auto-linking of related concepts based on shared tags.
- **Static & Fast**: Built with Astro + Cloudflare Pages.

## 🛠️ Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Development
```bash
npm run dev
```

### 3. Build
```bash
npm run build
```

## 🤖 AI Features Configuration (Gemini API)

To use the AI analysis feature in the Hub, you need a Gemini API Key.

### Local Development
Create a `.env` file or pass the variable:
```bash
# Windows PowerShell
$env:GEMINI_API_KEY="your-api-key"
npm run dev
```
*Note: In local dev, Astro might need special proxy config for Cloudflare functions depending on your environment.*

### Deployment (Cloudflare Pages)
1. Go to Cloudflare Dashboard > Pages > Your Project > Settings > Environment variables.
2. Add `GEMINI_API_KEY` with your key.

## 📂 Structure
- `src/pages/`: Page routes (`/`, `/hub`, etc.)
- `src/components/`: Reusable components
- `src/content/`: Markdown content (Blog, Knowledge)
- `functions/api/`: Cloudflare Functions (Serverless backend)
