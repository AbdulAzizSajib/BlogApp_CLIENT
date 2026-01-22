import BlogCard from '@/components/modules/homepage/BlogCard';
import { blogService } from '@/services/blog.service';
import { BlogPost } from '@/types';
// import { userService } from '@/services/user.service';

export default async function Home() {
  // const { data, error } = await userService.getSession();

  const { data } = await blogService.getBlogPosts(
    {
      isFeatured: undefined,
      search: '',
    },
    {
      cache: 'no-store',
    }
  );

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-3 gap-6 px-4">
      {data?.data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
