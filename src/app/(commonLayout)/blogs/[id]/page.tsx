import { blogService } from '@/services/blog.service';
import { BlogPost, Comment } from '@/types';
import React from 'react';

/* ---------- Comment Item (Recursive) ---------- */
function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="mt-4 border-l pl-4">
      <div className="rounded-md bg-gray-50 p-3">
        <p className="text-sm text-gray-800">{comment.content}</p>

        <div className="mt-1 text-xs text-gray-500">
          {new Date(comment.createdAt).toLocaleString()}
        </div>
      </div>

      {/* Replies */}
      {comment.replies?.length > 0 && (
        <div className="mt-2 space-y-3">
          {comment.replies.map((reply: Comment) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Blog Details Page ---------- */

export const dynamicParams = false;

export async function generateStaticParams() {
  const { data } = await blogService.getBlogPosts();
  return data?.data?.data
    ?.map((blog: BlogPost) => ({ id: blog.id }))
    .splice(0, 3);
}

export default async function BlogsDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await blogService.getBlogById(id);

  // const { data: postsData } = await blogService.getBlogPosts();

  // console.log(
  //   'data------------------ :',
  //   data,
  //   'postData-------------- : ',
  //   postsData
  // );

  // Check if the data is of type Post, otherwise handle the error
  if (!data) return <div>Blog not found</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Blog Header */}
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">{data.title}</h1>

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>Views: {data.view}</span>
          <span>•</span>
          <span>{new Date(data.createdAt).toDateString()}</span>

          {data.isFeatured && (
            <span className="ml-2 rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Blog Content */}
      <div className="prose mb-6 max-w-none">
        <p>{data.content}</p>
      </div>

      {/* Tags */}
      {data.tags?.length > 0 && (
        <div className="mb-8 flex gap-2">
          {data.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Comments Section */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Comments ({data._count.comments})
        </h2>

        <div className="space-y-4">
          {data.comments.map((comment: Comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}
