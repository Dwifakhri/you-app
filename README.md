# You-App

You app using Next.js v13 with typescript. (https://nextjs.org/blog/next-13)
It is built with Nextjs with some tools: react cookie, context api, tailwind CSS and other nextjs feature.

---

## Architecture and Structure

This project follows the **Single Page Application (SPA)** architecture. The entire application is rendered on a single static page, providing a smooth user experience without full-page reloads.

---

## Technologies Used

This project uses the following technologies:

- **Next**: For building, layouting, and designing the user interface.
- **TypeScript**: For type-safe JavaScript development.
- **React Cookie**: For jwt management auth.
- **Use Context**: For state management.
- **Tailwind CSS**: For styling and utility-first CSS framework.

---

## Pre-requisite

1. Node.js version >= 20.10.0
2. Package manager (npm) (https://www.npmjs.com/)

---

## Account

```json
{
  "email": "admin@mail.com",
  "password": "123123123"
}
```

## Project Setup

```sh
cp .env.example .env.local
```

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

```sh
npm start
```
