import { useState, useEffect } from 'react';

import { IQuestion } from '@/shared/types/quiz';
import config from '../lib/config.json';

export const useMockedQuizData = () => {
  const [data, setData] = useState<IQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);

        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });

        setData(config.questions);
      } catch {
        setError('Failed to fetch questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { data, loading, error };
};
