import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => [
  { title: 'chuquan' },
  { name: 'description', content: 'Welcome to chuquan' },
];

export default function Index() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center gap-4
        bg-background text-foreground"
    >
      <h1 className="text-3xl font-bold">chuquan</h1>
      <p className="text-muted-foreground">
        Remix + Vite + Prisma + Tailwind scaffold is ready.
      </p>
    </main>
  );
}
