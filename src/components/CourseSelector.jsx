import React from 'react';
import '../styles/CourseSelector.css';

// CourseSelector - หน้าเลือกหลักสูตร (demo 3 หลักสูตร)
// props: onSelect(course)
const CourseSelector = ({ onSelect }) => {
  const courses = [
    {
      id: 'course-ml-101',
      title: 'Micro-learning 101',
      instructor: 'อ. ชยกร',
      level: 'Beginner',
      duration: '3 ชม.',
      tags: ['Micro-learning', 'LMS', 'Design'],
      description:
        'เรียนรู้พื้นฐานของ Micro-learning พร้อมแนวทางออกแบบคอร์สให้กระชับและได้ผลจริง',
      cover:
        'https://images.unsplash.com/photo-1584697964190-4b3cd2056e3b?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'course-quiz-pro',
      title: 'Interactive Quiz & Assessment',
      instructor: 'อ. รวีวัฒน์',
      level: 'Intermediate',
      duration: '4 ชม.',
      tags: ['React', 'Assessment', 'UX'],
      description:
        'ลงมือสร้างแบบทดสอบแบบโต้ตอบ พร้อมเทคนิคการให้ Feedback ที่ช่วยการเรียนรู้',
      cover:
        'https://images.unsplash.com/photo-1518085250887-2f903c200fee?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'course-freemium-lms',
      title: 'Freemium LMS Strategy',
      instructor: 'อ. พิชญา',
      level: 'Advanced',
      duration: '2.5 ชม.',
      tags: ['Business', 'Freemium', 'Monetization'],
      description:
        'ออกแบบกลยุทธ์ Freemium ให้เหมาะกับคอร์ส พร้อมโครงสร้างการเข้าถึงเนื้อหา',
      cover:
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  return (
    <div className="course-selector">
      <header className="course-header">
        <h1>🎓 เลือกหลักสูตร</h1>
        <p>สาธิต 3 หลักสูตร สำหรับหลายอาจารย์ หลายสาขา</p>
      </header>

      <div className="course-grid">
        {courses.map((c) => (
          <div key={c.id} className="course-card">
            <div className="course-cover" style={{ backgroundImage: `url(${c.cover})` }} />

            <div className="course-body">
              <div className="course-top">
                <h3 className="course-title">{c.title}</h3>
                <p className="course-instructor">👩‍🏫 ผู้สอน: {c.instructor}</p>
              </div>

              <p className="course-desc">{c.description}</p>

              <div className="course-meta">
                <span className="badge">ระดับ: {c.level}</span>
                <span className="badge">⏱️ {c.duration}</span>
              </div>

              <div className="course-tags">
                {c.tags.map((t) => (
                  <span key={t} className="tag">#{t}</span>
                ))}
              </div>
            </div>

            <div className="course-actions">
              <button className="preview-btn" onClick={() => onSelect?.(c)}>
                ดูหลักสูตร
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSelector;
