import { env } from '@/env';
const API_URL = env.API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
}

export const blogService = {
  getBlogPosts: async (params?: GetBlogsParams, options?: ServiceOptions) => {
    try {
      const url = new URL(`${API_URL}/posts`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            url.searchParams.append(key, String(value));
          }
        });
      }

      // console.log('------------->>>', url.toString());
      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url.toString(), config);

      const data = await res.json();

      return {
        data: data,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};
