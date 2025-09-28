'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import styles from './page.module.css';
import { Button, Typography } from '@/shared/components';
import { useQuiz } from '@/shared/context/QuizContext';
import { formatPrizeAmount } from '@/shared/lib/utils';
import Thumb from '@/shared/images/svg/Thumb.svg';

export default function GameOver() {
  const router = useRouter();
  const { isGameOver, totalWinnings, resetGame } = useQuiz();

  useEffect(() => {
    if (!isGameOver) {
      router.replace('/');
    }
  }, [isGameOver, router]);

  const onTryAgainClick = () => {
    resetGame();
    router.replace('/game');
  };

  return (
    <div className={styles['game-over']}>
      <div className={styles['game-over__content']}>
        <Thumb className={styles['game-over__image']} />

        <div className={styles['game-over__wrapper']}>
          <div className={styles['game-over__text-wrapper']}>
            <Typography
              as="h2"
              color="black"
              fontWeight="bold"
              className={styles['game-over__title']}
            >
              Total score:
            </Typography>
            <Typography
              as="h1"
              fontWeight="bold"
              className={styles['game-over__prize']}
            >
              {formatPrizeAmount(totalWinnings)} earned
            </Typography>
          </div>

          <div className={styles['game-over__button']}>
            <Button onClick={onTryAgainClick} fullWidth>
              Try again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
