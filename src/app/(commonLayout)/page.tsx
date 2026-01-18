import { authClient } from '@/lib/auth-client';
import { headers } from 'next/headers';
export default async function Home() {
  const session = await authClient.getSession({
    headers: await headers(),
  });

  console.log('Session:', session);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h2>This is the Home page</h2>
      <h2>
          {session?.user ? `Hello, ${session.user.name}` : "Not logged in"}
      </h2>
    </div>
  );
}
