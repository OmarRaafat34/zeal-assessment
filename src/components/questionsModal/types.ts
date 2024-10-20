export interface QuestionsModalProps {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  type: string;
  difficulty: string;
  onNext: () => void;
}
