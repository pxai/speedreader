import { useState, useEffect } from 'react';

const useLoadText = () => {
  const [text, setText] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadText = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/assets/articles/text.txt`);
        if (!response.ok) {
          throw new Error('Failed to load article');
        }
        const content = await response.text();

        const totalLines = 10_000;
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