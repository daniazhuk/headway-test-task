'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type QuizContextType = {
  isGameOver: boolean;
  currentQuestionIndex: number;
  totalWinnings: number;
  goToNextQuestion: (prizeAmount: number) => void;
  finishGame: (prizeAmount: number) => void;
  resetGame: () => void;
};

const QuizContext = createContext<QuizContextType | null>(null);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const goToNextQuestion = (prizeAmount: number) => {
    setTotalWinnings(prizeAmount);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setTotalWinnings(0);
    setIsGameOver(false);
  };

  const finishGame = (prizeAmount: number) => {
    setCurrentQuestionIndex(0);
    setTotalWinnings(prizeAmount);
    setIsGameOver(true);
  };

  return (
    <QuizContext
      value={{
        isGameOver,
        currentQuestionIndex,
        totalWinnings,
        goToNextQuestion,
        finishGame,
        resetGame,
      }}
    >
      {children}
    </QuizContext>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }

  return context;
};
