# 📖 Development Guide - LMS Prototype

## 🎯 บทบาท 3 Components หลัก

---

## 1️⃣ ModuleStructure Component

### 📝 ไฟล์
`src/components/ModuleStructure.jsx`

### 🎯 หน้าที่
- แสดงโครงสร้างหลักสูตร (4 Modules)
- Embed วิดีโอ YouTube
- แสดงรายชื่อบทเรียนแต่ละ Module
- **ฟอรั่มจำลอง** - คำถาม/คอมเมนต์

### 🏗️ โครงสร้าง State

```javascript
// Module Data
const modules = [
  {
    id: 1,
    title: 'Module 1: ...',
    duration: '15 นาที',
    lessons: ['บท 1', 'บท 2', '...'],
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
    description: '...',
    content: '...'
  },
  // ... Module 2, 3, 4
];

// UI State
const [expandedModule, setExpandedModule] = useState(1);

// Forum State
const [forumPosts, setForumPosts] = useState([]);
const [newPost, setNewPost] = useState('');
const [activeForumModule, setActiveForumModule] = useState(1);
```

### 🔄 Key Functions

#### 1. Toggle Module Expansion
```javascript
const toggleModule = (moduleId) => {
  setExpandedModule(expandedModule === moduleId ? null : moduleId);
};
```

#### 2. Handle Forum Submit
```javascript
const handleForumSubmit = (e) => {
  e.preventDefault();
  
  if (newPost.trim() === '') return;

  const post = {
    id: Date.now(),
    moduleId: activeForumModule,
    author: 'ผู้ใช้',
    content: newPost,
    timestamp: new Date().toLocaleString('th-TH'),
    replies: []
  };

  setForumPosts([...forumPosts, post]);
  
  // Log ไป Console
  console.log('📝 โพสต์ใหม่ในฟอรั่ม:', post);
  
  setNewPost('');
};
```

#### 3. Filter Forum Posts
```javascript
const modulePosts = forumPosts.filter(
  post => post.moduleId === activeForumModule
);
```

### 🎨 CSS Classes
- `.module-structure-container` - Container หลัก
- `.module-title-bar` - Header ของ Module (คลิกได้)
- `.module-details` - เนื้อหา Module (expand/collapse)
- `.video-wrapper` - Wrapper สำหรับ iFrame
- `.forum-section` - ส่วนฟอรั่ม
- `.forum-post` - แต่ละโพสต์

### 🧪 Testing Checklist
- [ ] Module สามารถขยาย/ยุบได้
- [ ] วิดีโอ YouTube แสดงได้
- [ ] รายชื่อบทเรียนแสดงได้
- [ ] ฟอรั่มรับข้อความได้
- [ ] โพสต์แสดงในลำดับที่ถูกต้อง
- [ ] Console Log ทำงานได้
- [ ] Responsive Design ดูดีบนมือถือ

---

## 2️⃣ QuizComponent Component

### 📝 ไฟล์
`src/components/QuizComponent.jsx`

### 🎯 หน้าที่
- แสดงแบบทดสอบ 5 ข้อ
- ตรวจคำตอบ Real-time
- แสดง Feedback ทันที
- คำนวณคะแนน
- แสดงผลลัพธ์ที่ละเอียด

### 🏗️ โครงสร้าง Data

```javascript
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
    correctAnswer: 0,  // index ของคำตอบที่ถูก
    explanation: 'Micro-learning เป็นการเรียนรู้แบบแบ่งส่วนเล็กๆ...'
  },
  // ... 4 ข้ออื่น
];
```

### 🏗️ โครงสร้าง State

```javascript
// Question Navigation
const [currentQuestion, setCurrentQuestion] = useState(0);

// Scoring
const [score, setScore] = useState(0);

// User Answers
const [selectedAnswers, setSelectedAnswers] = useState({});
// Example: { 0: 2, 1: 0, 2: 1, 3: 3, 4: 0 }

// UI States
const [showScore, setShowScore] = useState(false);
const [answered, setAnswered] = useState(false);
const [feedback, setFeedback] = useState('');
```

### 🔄 Key Functions

#### 1. Handle Answer Selection
```javascript
const handleAnswerClick = (index) => {
  if (answered) return; // ป้องกันการเลือกหลายครั้ง

  // เก็บคำตอบ
  setSelectedAnswers({
    ...selectedAnswers,
    [currentQuestion]: index
  });

  // ตรวจสอบถูก/ผิด
  const question = quizData[currentQuestion];
  const isCorrect = index === question.correctAnswer;

  setAnswered(true);
  setFeedback(isCorrect ? '✅ ถูกต้อง!' : '❌ ไม่ถูกต้อง');

  // เพิ่มคะแนน
  if (isCorrect) {
    setScore(score + 1);
  }
};
```

#### 2. Handle Next Question
```javascript
const handleNextQuestion = () => {
  const nextQuestion = currentQuestion + 1;
  if (nextQuestion < quizData.length) {
    setCurrentQuestion(nextQuestion);
    setAnswered(false);
    setFeedback('');
  } else {
    // จบการทำแบบทดสอบ
    setShowScore(true);
  }
};
```

#### 3. Reset Quiz
```javascript
const resetQuiz = () => {
  setCurrentQuestion(0);
  setScore(0);
  setShowScore(false);
  setSelectedAnswers({});
  setAnswered(false);
  setFeedback('');
};
```

### 🎨 CSS Classes
- `.quiz-container` - Container หลัก
- `.quiz-header` - Header ส่วน
- `.progress-bar` - Progress bar
- `.question-card` - Card สำหรับคำถาม
- `.option-btn` - Button ตัวเลือก
- `.feedback-section` - Feedback & Explanation
- `.score-section` - Score result
- `.answers-review` - บทสรุปรายละเอียด

### 🎓 Scoring Logic

```javascript
// คำนวณเปอร์เซนต์
const percentage = Math.round((score / quizData.length) * 100);

// กำหนดความคิดเห็น
if (score === quizData.length) {
  message = '🏆 ยอดเยี่ยม!';
} else if (score >= quizData.length * 0.8) {
  message = '👏 ดีมาก!';
} else if (score >= quizData.length * 0.6) {
  message = '📚 พอใจ';
} else {
  message = '💡 ให้ลองศึกษาเพิ่มเติม';
}
```

### 🧪 Testing Checklist
- [ ] คำถามแสดงได้ทั้งหมด 5 ข้อ
- [ ] ตัวเลือกทั้งหมดคลิกได้
- [ ] Feedback แสดงทันทีหลังเลือก
- [ ] ไม่สามารถเลือกซ้ำได้
- [ ] ปุ่ม "Next" ทำงานได้
- [ ] คะแนนคำนวณถูกต้อง
- [ ] ผลลัพธ์แสดงได้ถูกต้อง
- [ ] บทสรุปรายละเอียดครบถ้วน
- [ ] ปุ่มเริ่มใหม่ทำงานได้

---

## 3️⃣ AccessControl Component

### 📝 ไฟล์
`src/components/AccessControl.jsx`

### 🎯 หน้าที่
- จำลอง Freemium Model
- แสดง/ซ่อนเนื้อหา Module ตามสถานะผู้ใช้
- ให้สลับระหว่าง Free/Premium User
- แสดง "ซื้อเพื่อเข้าถึง" สำหรับเนื้อหาพรีเมียม

### 🏗️ โครงสร้าง Data

```javascript
const modules = [
  {
    id: 1,
    title: 'Module 1: Micro-learning Basics',
    description: 'บทเรียนพื้นฐาน - เข้าถึงได้ฟรี',
    videoUrl: 'https://www.youtube.com/embed/...',
    isPremium: false,  // ผู้ใช้ Free เห็นได้
    content: '...'
  },
  {
    id: 2,
    title: 'Module 2: Interactive Learning',
    description: 'การเรียนรู้แบบโต้ตอบ - เข้าถึงได้ฟรี',
    videoUrl: 'https://www.youtube.com/embed/...',
    isPremium: false,
    content: '...'
  },
  {
    id: 3,
    title: 'Module 3: Live Workshop Content',
    description: 'สัมนาแบบสด - เนื้อหาพรีเมียม',
    videoUrl: 'https://www.youtube.com/embed/...',
    isPremium: true,   // ผู้ใช้ Free เห็นไม่ได้
    content: '...'
  }
];
```

### 🏗️ โครงสร้าง State

```javascript
// User Status
const [isFreeUser, setIsFreeUser] = useState(true);
// true = ผู้ใช้ฟรี, false = ผู้ใช้พรีเมียม
```

### 🔄 Key Functions

#### 1. Check Access Permission
```javascript
const canAccess = !module.isPremium || !isFreeUser;

// ตรรมชาติ:
// - ถ้า isPremium = false → เสมอสามารถเข้าถึงได้
// - ถ้า isPremium = true และ isFreeUser = true → ไม่สามารถเข้าถึงได้
// - ถ้า isPremium = true และ isFreeUser = false → สามารถเข้าถึงได้
```

#### 2. Toggle User Type
```javascript
const toggleUserType = () => {
  setIsFreeUser(!isFreeUser);
};
```

### 🎨 CSS Classes
- `.access-control-container` - Container หลัก
- `.user-status-card` - แสดงสถานะผู้ใช้
- `.modules-grid` - Grid สำหรับ Module cards
- `.module-card` - Card แต่ละ Module
- `.module-content` - เนื้อหา (ปลดล็อก)
- `.locked-content` - เนื้อหา (ล็อก)
- `.premium-badge` - Badge สำหรับ Premium Module

### 🧪 Testing Checklist
- [ ] Module 1 & 2 แสดงเมื่อ isFreeUser = true
- [ ] Module 3 ล็อกเมื่อ isFreeUser = true
- [ ] ข้อความ "ซื้อเพื่อเข้าถึง" แสดงต่อ Module 3
- [ ] วิดีโอแสดงในโมดูลที่เปิด
- [ ] ปุ่มสลับ User Type ทำงานได้
- [ ] หลังจากเปลี่ยนเป็น Premium ทั้ง Module แสดงได้
- [ ] Badge 💎 แสดงที่ Module Premium

---

## 🔗 Integration in App.jsx

### Navigation System

```javascript
const [activeTab, setActiveTab] = useState('modules');

// ใน JSX
<button 
  className={`nav-tab ${activeTab === 'modules' ? 'active' : ''}`}
  onClick={() => setActiveTab('modules')}
>
  📖 โครงสร้างหลักสูตร
</button>

// Render Component ตามสถานะ
{activeTab === 'modules' && <ModuleStructure />}
{activeTab === 'quiz' && <QuizComponent />}
{activeTab === 'access' && <AccessControl />}
```

---

## 📊 State Management Flow

```
App Component
├── activeTab (หรับเลือก Component ไหน)
│
├── ModuleStructure
│   ├── expandedModule
│   ├── forumPosts
│   ├── newPost
│   └── activeForumModule
│
├── QuizComponent
│   ├── currentQuestion
│   ├── score
│   ├── selectedAnswers
│   ├── showScore
│   ├── answered
│   └── feedback
│
└── AccessControl
    └── isFreeUser
```

---

## 🎨 Styling Approach

### ทั่วไป
- **Primary Colors**: `#667eea` (Purple) → `#764ba2` (Dark Purple)
- **Secondary Colors**: `#f093fb` → `#f5576c` (Pink/Red)
- **Success Color**: `#4CAF50` (Green)
- **Font**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif

### Responsive Design
- **Desktop**: Full width
- **Tablet**: Adjusted grid
- **Mobile**: Single column

---

## 🚀 Development Tips

### 1. เพิ่มคำถาม Quiz ใหม่
```javascript
// ใน quizData array
{
  id: 6,
  question: 'คำถามใหม่?',
  options: ['ก', 'ข', 'ค', 'ง'],
  correctAnswer: 0,
  explanation: 'ความอธิบาย'
}
```

### 2. เปลี่ยนวิดีโอ YouTube
```javascript
// YouTube URL Format
videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'

// เปลี่ยน dQw4w9WgXcQ เป็น VIDEO_ID ที่ต้องการ
```

### 3. เพิ่ม Module ใหม่
```javascript
// ใน modules array
{
  id: 5,
  title: 'Module 5: ...',
  duration: '20 นาที',
  lessons: ['บท 1', 'บท 2'],
  videoUrl: 'https://...',
  isPremium: false, // หรือ true
  description: '...',
  content: '...'
}
```

### 4. เปลี่ยนสี Theme
```css
/* ในไฟล์ CSS */
/* เปลี่ยน gradient colors */
background: linear-gradient(135deg, #NEW_COLOR1 0%, #NEW_COLOR2 100%);

/* เปลี่ยน text color */
color: #NEW_COLOR;

/* เปลี่ยน border color */
border-color: #NEW_COLOR;
```

---

## 🧪 Testing Guidelines

### Manual Testing
1. ทำการคลิก/ป้อนข้อมูลทั้งหมด
2. ตรวจสอบ Console สำหรับ Errors
3. ทดสอบบนหลายขนาด Screen
4. ทดสอบบน Different Browsers

### Automated Testing (ในอนาคต)
```javascript
// Jest + React Testing Library
test('Forum posts should appear after submission', () => {
  // Test code
});
```

---

## 🔍 Debugging Tips

### ใช้ Console Logging
```javascript
console.log('📝 โพสต์ใหม่:', post);
console.log('ผู้ใช้ฟรี:', isFreeUser);
console.log('คะแนน:', score);
```

### ใช้ Browser DevTools
- F12 หรือ Ctrl+Shift+I
- Console tab สำหรับ Logs
- Elements tab สำหรับ DOM
- Network tab สำหรับ API calls

### ใช้ React DevTools Extension
- ติดตั้ง React DevTools
- ดู Component Tree
- ดู State values

---

## 📝 Code Style Guide

### Naming Conventions
```javascript
// Components (PascalCase)
const ModuleStructure = () => {};

// Functions (camelCase)
const handleSubmit = () => {};
const toggleModule = () => {};

// Variables (camelCase)
const isFreeUser = true;
const forumPosts = [];

// Constants (UPPER_SNAKE_CASE)
const MAX_TITLE_LENGTH = 100;
const API_ENDPOINT = 'https://...';
```

### Code Organization
```javascript
// 1. Imports
import React, { useState } from 'react';
import '../styles/Component.css';

// 2. Constants
const DATA = [];

// 3. Component
const MyComponent = () => {
  // 3a. State
  const [state, setState] = useState();
  
  // 3b. Functions
  const handleEvent = () => {};
  
  // 3c. Effects (useEffect)
  
  // 3d. Return JSX
  return <div>...</div>;
};

// 4. Export
export default MyComponent;
```

---

## 🎯 Next Steps

1. ✅ ทำความเข้าใจแต่ละ Component
2. ✅ ทดสอบการทำงานของแต่ละส่วน
3. ✅ ปรับแต่งตามต้องการ
4. ⬜ เชื่อมต่อ Backend API
5. ⬜ บันทึกข้อมูลผู้ใช้

---

**Happy Coding! 🚀**
