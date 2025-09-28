import { areAllSelectedAnswersCorrect, formatPrizeAmount } from './utils';

describe('Utility Functions', () => {
  describe('areAllSelectedAnswersCorrect', () => {
    const answers = [
      { id: '1', text: 'Answer 1', isCorrect: true },
      { id: '2', text: 'Answer 2', isCorrect: false },
      { id: '3', text: 'Answer 3', isCorrect: true },
    ];

    it('returns true when all selected answers are correct', () => {
      const userAnswers = ['1', '3'];
      expect(areAllSelectedAnswersCorrect(answers, userAnswers)).toBe(true);
    });

    it('returns false when at least one selected answer is incorrect', () => {
      const userAnswers = ['1', '2'];
      expect(areAllSelectedAnswersCorrect(answers, userAnswers)).toBe(false);
    });

    it('returns false when a selected answer is not found in the list', () => {
      const userAnswers = ['1', '4'];
      expect(areAllSelectedAnswersCorrect(answers, userAnswers)).toBe(false);
    });

    it('returns true when no answers are selected', () => {
      const userAnswers: string[] = [];
      expect(areAllSelectedAnswersCorrect(answers, userAnswers)).toBe(true);
    });
  });

  describe('formatPrizeAmount', () => {
    it('formats large integer values in cents into dollar string', () => {
      const cents = 100000;
      expect(formatPrizeAmount(cents)).toBe('$1,000');
    });

    it('formats values with fractional dollars correctly', () => {
      const cents = 123456;
      expect(formatPrizeAmount(cents)).toBe('$1,234.56');
    });

    it('handles zero correctly', () => {
      const cents = 0;
      expect(formatPrizeAmount(cents)).toBe('$0');
    });

    it('formats amounts less than one dollar correctly', () => {
      const cents = 99;
      expect(formatPrizeAmount(cents)).toBe('$0.99');
    });
  });
});
