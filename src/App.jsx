import React, { useState } from 'react';
import './App.css';
import ModuleStructure from './components/ModuleStructure';
import QuizComponent from './components/QuizComponent';
import AccessControl from './components/AccessControl';
import CourseSelector from './components/CourseSelector';

/**
 * App Component - แอปพลิเคชัน LMS หลัก
 * 
 * ฟังก์ชัน:
 * - Navigation ระหว่างส่วนประกอบทั้ง 3
 * - รวม ModuleStructure, QuizComponent, และ AccessControl
 */

function App() {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">📚</span>
            <span className="logo-text">LMS Prototype</span>
          </div>
          
          <div className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              🎓 เลือกหลักสูตร
            </button>
            <button
              className={`nav-tab ${activeTab === 'modules' ? 'active' : ''}`}
              onClick={() => setActiveTab('modules')}
            >
              📖 โครงสร้างหลักสูตร
            </button>
            <button
              className={`nav-tab ${activeTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveTab('quiz')}
            >
              📝 แบบทดสอบ
            </button>
            <button
              className={`nav-tab ${activeTab === 'access' ? 'active' : ''}`}
              onClick={() => setActiveTab('access')}
            >
              🔐 ควบคุมการเข้าถึง
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'courses' && (
          <CourseSelector
            onSelect={(course) => {
              setSelectedCourse(course);
              setActiveTab('modules');
            }}
          />
        )}
        {activeTab === 'modules' && (
          <ModuleStructure course={selectedCourse} />
        )}
        {activeTab === 'quiz' && <QuizComponent />}
        {activeTab === 'access' && <AccessControl />}
      </main>

      <footer className="footer">
        <p>🚀 LMS Prototype v1.0 | พัฒนาด้วย React</p>
        <p>💡 เป็นแนวทางเบื้องต้นสำหรับการสร้าง LMS ที่มีประสิทธิภาพ</p>
      </footer>
    </div>
  );
}

export default App;
