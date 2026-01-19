import { userService } from '@/services/user.service';

export default async function Home() {
  const { data, error } = await userService.getSession();

  console.log(data, error);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h2>This is the Home page</h2>
    </div>
  );
}
