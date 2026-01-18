import { authClient } from '@/lib/auth-client';

export default async function Home() {
  const session = await authClient.getSession();

  console.log('Session:', session);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h2>This is the Home page</h2>
    </div>
  );
}
