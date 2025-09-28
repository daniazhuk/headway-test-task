export interface IAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface IQuestion {
  id: string;
  text: string;
  prizeAmount: number;
  answers: IAnswer[];
  minCorrectAnswers: number;
}
