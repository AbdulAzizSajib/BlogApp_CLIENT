// import { env } from '@/env';

// const API_URL = env.API_URL;
export const blogService = {
  getBlogPosts: async () => {
    try {
      //   const res = await fetch(`${API_URL}/posts`);
      const res = await fetch(`http://localhost:5000/posts`);
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
