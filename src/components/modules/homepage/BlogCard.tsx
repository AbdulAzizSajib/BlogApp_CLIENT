import Link from 'next/link';
import Image from 'next/image';
import { Eye, MessageCircle } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="h-full overflow-hidden border-none pb-2 shadow-md transition-all duration-300">
      <div className="relative h-56 w-full overflow-hidden">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center">
            No Image
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="group-hover:text-primary line-clamp-2 text-xl font-bold transition-colors">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
          {post.content}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="text-muted-foreground flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {post.views}
          </span>

          <span className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            {post._count?.comments || 0}
          </span>

          {post.isFeatured && (
            <Badge
              variant="default"
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              Featured
            </Badge>
          )}
        </div>

        <Link
          href={`/blogs/${post.id}`}
          className="text-primary text-sm font-semibold group-hover:underline"
        >
          Read More &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
}
