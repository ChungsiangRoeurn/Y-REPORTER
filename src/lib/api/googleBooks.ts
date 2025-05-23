import axios from 'axios';

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
};

export async function searchBooks(query: string): Promise<Book[]> {
  const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
    params: {
      q: query,
      maxResults: 10,
    },
  });

  return response.data.items?.map((item: any) => ({
    id: item.id,
    title: item.volumeInfo.title,
    author: item.volumeInfo.authors?.join(', ') ?? 'Unknown Author',
    description: item.volumeInfo.description ?? 'No description available.',
  })) ?? [];
}
