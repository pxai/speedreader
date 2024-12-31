import { useState, useEffect } from 'react';

const useLoadArticle = (articleNumber: number) => {
  const [article, setArticle] = useState<object>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/assets/articles/${articleNumber}.json`);
        if (!response.ok) {
          throw new Error('Failed to load article');
        }
        const data = await response.json();
        setArticle(data);
        console.log(data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [articleNumber]);

  return { article, loading, error };
};

export default useLoadArticle;