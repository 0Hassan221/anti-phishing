import { create } from 'zustand';

const useQuizStore = create((set, get) => ({
  // Quiz state
  isModalOpen: false,
  currentQuestion: 0,
  score: 0,
  quizCompleted: false,
  
  // Quiz questions
  questions: [
    {
      question: "Is this email safe? Subject: 'Urgent: Update Your Account Now!'",
      description: "An email claiming to be from your bank asks you to click a link to update your account details immediately, with a generic greeting ('Dear Customer').",
      options: ["Safe", "Phishing"],
      correctAnswer: "Phishing",
    },
    {
      question: "Is this email safe? Subject: 'Your Order Confirmation #12345'",
      description: "An email with your recent order details, sent from a legitimate company email (e.g., orders@amazon.com), but you didn't place an order recently.",
      options: ["Safe", "Phishing"],
      correctAnswer: "Phishing",
    },
    {
      question: "Is this email safe? Subject: 'Meeting Agenda for Tomorrow'",
      description: "An email from your colleague's email address with a meeting agenda, but the email contains a suspicious attachment named 'agenda.exe'.",
      options: ["Safe", "Phishing"],
      correctAnswer: "Phishing",
    },
  ],
  
  // Actions
  setIsModalOpen: (value) => set({ isModalOpen: value }),
  
  // Handle answer
  handleAnswer: (answer) => {
    return new Promise((resolve) => {
        const { currentQuestion, questions, score } = get();
        
        if (answer === questions[currentQuestion].correctAnswer) {
            set({ score: score + 1 });
        }
        
        if (currentQuestion + 1 < questions.length) {
            set({ currentQuestion: currentQuestion + 1 });
        }
        
        resolve();
    });
},

resetQuiz: () => {
    return new Promise((resolve) => {
        set({
            currentQuestion: 0,
            score: 0,
            quizCompleted: false
        });
        resolve();
    });
},
}));

export default useQuizStore;