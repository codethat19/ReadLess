# Sommaire

AI-powered PDF summarisation built with the **Next.js App Router**, **React 19** and **Tailwind CSS v4**. Upload any PDF and Sommaire will extract the text, send it to a Large Language Model (Gemini 1.5 Flash by default, falling back to GPT-4 o) and return an engaging, emoji-rich, markdown summary that you can read or copy in seconds.

![Sommaire hero screenshot](./public/window.svg)

---

## ✨ Features

-   🔐 **Authentication** – password-less sign-in with [Clerk](https://clerk.com)
-   📤 **Drag-and-drop upload** – handled by [UploadThing](https://uploadthing.com)
-   🧠 **AI summarisation** – Google Gemini with automatic fallback to OpenAI
-   🗄️ **Persistent storage** – Serverless Postgres on [Neon](https://neon.tech)
-   📚 **History** – personal dashboard to view, copy or delete previous summaries
-   🎨 **Beautiful UI** – Tailwind CSS, Radix UI primitives & dark-mode ready
-   ⚡ **Blazing fast** – built on the latest Next.js (v15) using the App Router

## 🏗️ Tech Stack

| Layer       | Technology                                                          |
| ----------- | ------------------------------------------------------------------- |
| Front-end   | Next.js 15 / React 19, TypeScript, Tailwind CSS 4, Radix UI, Sonner |
| Auth        | Clerk JS                                                            |
| File upload | UploadThing                                                         |
| AI / LLM    | Google Gemini 1.5 Flash, OpenAI GPT-4o                              |
| Database    | Neon Serverless Postgres (SQL)                                      |
| ORM         | Simple SQL tagged templates (`@neondatabase/serverless`)            |

---

## 🚀 Quick Start

> **Prerequisites**: Node >= 18, npm / pnpm / yarn, a Postgres database (Neon recommended) and API keys for Clerk, Google Gemini and OpenAI.

1. **Clone the repo**
    ```bash
    git clone https://github.com/your-username/sommaire.git && cd sommaire
    ```
2. **Install dependencies**
    ```bash
    npm install # or pnpm install / yarn
    ```
3. **Configure environment variables** – create a `.env.local` file in the project root:

    ```env
    # Clerk
    CLERK_SECRET_KEY=sk_test_...
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

    # OpenAI
    OPENAI_API_KEY=sk-...

    # Google Gemini
    GEMINI_API_KEY=...your-gemini-key...

    # UploadThing
    UPLOADTHING_SECRET=...
    UPLOADTHING_APP_ID=...

    # Database
    DATABASE_URL="postgresql://user:password@host/database"
    ```

4. **Create the database schema** (for Neon copy–paste in the SQL editor):
    ```sql
    \i schema.sql
    ```
5. **Run the development server**
    ```bash
    npm run dev
    # open http://localhost:3000
    ```

---

## 🗂️ Project Structure

```
├─ actions/          # Server actions (form / API logic)
├─ app/              # Next.js App Router routes
│  ├─ (logged-in)/   # Auth-protected routes (dashboard, upload, summaries)
│  └─ api/           # Route handlers (UploadThing)
├─ components/       # Re-usable UI and page components
├─ lib/              # Server-side helpers (DB, LLM, PDF utils)
├─ utils/            # Client & shared utilities (prompts, formatters…)
└─ schema.sql        # Postgres schema definition
```

The codebase follows the **conventional Next.js App Router layout**: every folder inside `app/` is a route, server components by default, `page.tsx` files mark entrypoints. Auth-protected routes live in the `(logged-in)` group.

---

## 🏗️ Build & Deployment

Sommaire runs anywhere Next.js does – Vercel, Netlify, your own server. On Vercel, simply set the same environment variables from `.env.local` in the dashboard, add your Neon connection string and click _Deploy_.

The project relies on experimental React 19 and Next.js 15 beta features. If you deploy to production ensure you pin the same versions (see `package.json`).

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m "feat: amazing feature"`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

Please follow the existing code-style and run `npm run lint` before submitting.

---

## 📄 License

This project is released under the [MIT](https://opensource.org/licenses/MIT) License.
