'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useQuiz } from '@/shared/context/QuizContext';
import { useMockedQuizData } from '@/shared/hooks';
import { PrizeList, PrizeMenu, Question, Loader } from '@/shared/components';
import styles from './page.module.css';

export default function Quiz() {
  const router = useRouter();
  const { isGameOver, currentQuestionIndex } = useQuiz();
  const { data, loading, error } = useMockedQuizData();

  useEffect(() => {
    if (isGameOver) {
      router.replace('/game-over');
    }
  }, [isGameOver, router]);

  if (loading) {
    return (
      <div className={styles.quiz}>
        <Loader />
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.quiz}>
      <div className={styles.quiz__question}>
        <Question
          question={data[currentQuestionIndex]}
          hasNextQuestion={currentQuestionIndex < data.length - 1}
        />
      </div>

      <PrizeMenu questions={data} currentQuestionIndex={currentQuestionIndex} />

      <div className={styles.quiz__prizes}>
        <PrizeList
          questions={data}
          currentQuestionIndex={currentQuestionIndex}
        />
      </div>
    </div>
  );
}
