import React, { useState } from 'react';
import '../styles/QuizComponent.css';

/**
 * QuizComponent - แบบทดสอบแบบโต้ตอบ
 * 
 * ฟังก์ชัน:
 * - สร้างแบบทดสอบพร้อมคำถามหลากหลายประเภท
 * - บันทึกคำตอบ (Client-side State)
 * - ตรวจคำตอบทันทีและแสดงผลคะแนน
 * - แสดง Feedback สำหรับแต่ละคำตอบ
 */

const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');

  // ข้อมูลคำถาม - Array of Objects
  const quizData = [
    {
      id: 1,
      question: 'Micro-learning คืออะไร?',
      options: [
        'การเรียนรู้ในช่วงเวลาสั้นๆ (5-15 นาที)',
        'การเรียนรู้ตลอดวัน',
        'การเรียนรู้แบบออนไลน์เท่านั้น',
        'การเรียนรู้ที่ใช้ทุกวัน'
      ],
      correctAnswer: 0,
      explanation: 'Micro-learning เป็นการเรียนรู้แบบแบ่งส่วนเล็กๆ ที่สามารถทำได้ในเวลาสั้นๆ เพื่อให้ผู้เรียนสามารถจดจำและประยุกต์ใช้ได้ง่ายขึ้น'
    },
    {
      id: 2,
      question: 'ข้อใดต่อไปนี้เป็นข้อดีของ LMS?',
      options: [
        'ติดตามความคืบหน้าของผู้เรียน',
        'เพิ่มความยืดหยุ่นในการเรียน',
        'ลดต้นทุนการฝึกอบรม',
        'ทั้งหมดข้างต้น'
      ],
      correctAnswer: 3,
      explanation: 'LMS มีข้อดีมากมายรวมถึงการติดตาม ความยืดหยุ่น และการลดต้นทุน ซึ่งเป็นเหตุผลที่องค์กรหลายแห่งใช้ LMS'
    },
    {
      id: 3,
      question: 'สถาปัตยกรรม Client-Side Validation เหมาะสำหรับอะไร?',
      options: [
        'ตรวจคำตอบแบบ Real-time',
        'ลดการส่งคำขอไปยัง Server',
        'ปรับปรุงประสบการณ์ผู้ใช้',
        'ทั้งหมดข้างต้น'
      ],
      correctAnswer: 3,
      explanation: 'Client-Side Validation ช่วยให้ได้รับความเร็ว การลดภาระ Server และประสบการณ์ผู้ใช้ที่ดีขึ้น'
    },
    {
      id: 4,
      question: 'Freemium Model หมายถึงอะไร?',
      options: [
        'การให้บริการฟรีทั้งหมด',
        'การให้บริการพื้นฐานฟรี และคิดค่าสำหรับบริการขั้นสูง',
        'การให้บริการเพื่อเก็บข้อมูล',
        'ไม่มีข้อใดถูก'
      ],
      correctAnswer: 1,
      explanation: 'Freemium Model เป็นรูปแบบธุรกิจที่ให้ใช้บริการพื้นฐานฟรี แต่คิดค่าใช้สำหรับฟีเจอร์พรีเมียม'
    },
    {
      id: 5,
      question: 'State ใน React ใช้สำหรับอะไร?',
      options: [
        'เก็บข้อมูลที่เปลี่ยนแปลงตามเวลา',
        'เก็บข้อมูลถาวร',
        'ปิดแอปพลิเคชัน',
        'เชื่อมต่อกับ Server'
      ],
      correctAnswer: 0,
      explanation: 'State ใช้สำหรับเก็บข้อมูลที่สามารถเปลี่ยนแปลงได้ และเมื่อ State เปลี่ยน Component จะ render ใหม่'
    }
  ];

  const handleAnswerClick = (index) => {
    if (answered) return; // ป้องกันการเลือกหลายครั้ง

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: index
    });

    const question = quizData[currentQuestion];
    const isCorrect = index === question.correctAnswer;

    setAnswered(true);
    setFeedback(isCorrect ? '✅ ถูกต้อง!' : '❌ ไม่ถูกต้อง');

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setAnswered(false);
      setFeedback('');
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswers({});
    setAnswered(false);
    setFeedback('');
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>📝 แบบทดสอบการเรียนรู้</h1>
        <p>ทดสอบความเข้าใจของคุณเกี่ยวกับ LMS</p>
      </div>

      {showScore ? (
        <div className="score-section">
          <div className="score-card">
            <h2>🎉 ผลการทดสอบ</h2>
            <div className="score-display">
              <span className="score-number">{score}</span>
              <span className="score-total">/ {quizData.length}</span>
            </div>
            <p className="score-percentage">
              {Math.round((score / quizData.length) * 100)}% ถูกต้อง
            </p>
            
            <div className="score-message">
              {score === quizData.length && (
                <p className="excellent">🏆 ยอดเยี่ยม! คุณตอบถูกทั้งหมด</p>
              )}
              {score >= quizData.length * 0.8 && score < quizData.length && (
                <p className="good">👏 ดีมาก! คุณเข้าใจเนื้อหาได้ดี</p>
              )}
              {score >= quizData.length * 0.6 && score < quizData.length * 0.8 && (
                <p className="fair">📚 พอใจ สามารถทบทวนบางส่วนได้</p>
              )}
              {score < quizData.length * 0.6 && (
                <p className="poor">💡 ให้ลองศึกษาเนื้อหาเพิ่มเติม</p>
              )}
            </div>

            <button className="reset-btn" onClick={resetQuiz}>
              ทำแบบทดสอบอีกครั้ง
            </button>
          </div>

          <div className="answers-review">
            <h3>📋 บทสรุปคำตอบ</h3>
            {quizData.map((q, index) => (
              <div key={q.id} className="review-item">
                <p className="review-question">{index + 1}. {q.question}</p>
                <p className={`review-answer ${selectedAnswers[index] === q.correctAnswer ? 'correct' : 'incorrect'}`}>
                  คำตอบของคุณ: {q.options[selectedAnswers[index]] || 'ไม่ได้ตอบ'}
                </p>
                {selectedAnswers[index] !== q.correctAnswer && (
                  <p className="correct-answer">
                    คำตอบที่ถูก: {q.options[q.correctAnswer]}
                  </p>
                )}
                <p className="explanation">💭 {q.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="question-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="progress-text">
            คำถาม {currentQuestion + 1} / {quizData.length}
          </div>

          <div className="question-card">
            <h2>{quizData[currentQuestion].question}</h2>

            <div className="options">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={answered}
                  className={`option-btn ${
                    selectedAnswers[currentQuestion] === index 
                      ? index === quizData[currentQuestion].correctAnswer
                        ? 'selected correct'
                        : 'selected incorrect'
                      : ''
                  }`}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>

            {answered && (
              <div className="feedback-section">
                <p className="feedback-text">{feedback}</p>
                <p className="explanation">💭 {quizData[currentQuestion].explanation}</p>
                
                <button className="next-btn" onClick={handleNextQuestion}>
                  {currentQuestion === quizData.length - 1 ? 'ดูผลลัพธ์' : 'คำถามถัดไป'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
