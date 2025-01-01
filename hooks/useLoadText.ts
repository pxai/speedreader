import { useState, useEffect } from 'react';

const useLoadText = (lang: string = 'en') => {
  const [text, setText] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect((totalLines: number = 10_000) => {
    const loadText = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/assets/articles/${lang}/text.txt`);
        if (!response.ok) {
          throw new Error('Failed to load article');
        }
        const content = await response.text();

        const startIndex = Math.floor(Math.random() * (totalLines - 1000));

        setText(content.split('\n').slice(startIndex, startIndex + 1000))
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadText();
  }, []);

  return { text, loading, error };
};

export default useLoadText;