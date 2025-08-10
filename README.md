# Next.JS Event Calendar

An event calendar built with [Next.js](https://nextjs.org/). It uses App Router, [Tailwind CSS](https://tailwindcss.com) for styling, and a Prisma-powered backend backed by SQLite.

Same logic has implemented using [Next.js](https://github.com/tappiola/next-js-calendar) to compare capabilites of frameworks.

## Getting Started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Initialize the database**

   Create a `.env` file in the project root with:

   ```env
   DATABASE_URL="file:./dev.db"
   ```

   Then run:

   ```bash
   pnpm prisma db push
   pnpm prisma db seed
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Run the linter**

   ```bash
   pnpm lint
   ```

## Build

Create an optimized production build:

```bash
pnpm build
```

## License

This project is licensed under the ISC License.
