'use client';

import { FC, useState } from 'react';

import MenuIcon from '@/shared/images/svg/Menu.svg';
import CrossIcon from '@/shared/images/svg/Cross.svg';
import { IQuestion } from '@/shared/types/quiz';
import { PrizeList } from '../PrizeList/PrizeList';
import styles from './PrizeMenu.module.css';

interface PrizeMenuProps {
  questions: IQuestion[];
  currentQuestionIndex: number;
}

export const PrizeMenu: FC<PrizeMenuProps> = ({
  questions,
  currentQuestionIndex,
}) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleMenu = () => setIsMenuOpened((prev) => !prev);

  return (
    <>
      <button
        type="button"
        onClick={toggleMenu}
        className={styles['prize-menu__mobile-prizes-trigger']}
        aria-label="Toggle prize menu"
      >
        {isMenuOpened ? (
          <CrossIcon width={24} height={24} />
        ) : (
          <MenuIcon width={24} height={24} />
        )}
      </button>

      <div
        className={`${styles['prize-menu__mobile-prizes']} ${
          isMenuOpened ? styles['prize-menu__mobile-prizes--open'] : ''
        }`}
      >
        <PrizeList
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
        />
      </div>
    </>
  );
};
