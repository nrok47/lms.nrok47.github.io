import React, { useState } from 'react';
import '../styles/AccessControl.css';

/**
 * AccessControl Component - จำลองการควบคุมการเข้าถึงเนื้อหา (Freemium Model)
 * 
 * ฟังก์ชัน:
 * - แสดง Module 1 & 2 สำหรับผู้ใช้ Free
 * - ล็อก Module 3 และแสดงข้อความ "ซื้อเพื่อเข้าถึง"
 * - สามารถเปลี่ยน isFreeUser เพื่อทดสอบทั้งสองสถานะ
 */

const AccessControl = () => {
  const [isFreeUser, setIsFreeUser] = useState(true);

  const modules = [
    {
      id: 1,
      title: 'Module 1: Micro-learning Basics',
      description: 'บทเรียนพื้นฐาน - เข้าถึงได้ฟรี',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      isPremium: false,
      content: 'บทเรียนนี้ครอบคลุมแนวคิดพื้นฐานเกี่ยวกับการเรียนรู้แบบ Micro-learning'
    },
    {
      id: 2,
      title: 'Module 2: Interactive Learning',
      description: 'การเรียนรู้แบบโต้ตอบ - เข้าถึงได้ฟรี',
      videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
      isPremium: false,
      content: 'วิธีการใช้เทคโนโลยีเพื่อสร้างประสบการณ์การเรียนรู้ที่โต้ตอบได้'
    },
    {
      id: 3,
      title: 'Module 3: Live Workshop Content',
      description: 'สัมนาแบบสด - เนื้อหาพรีเมียม',
      videoUrl: 'https://www.youtube.com/embed/WZ7in-ihnN4',
      isPremium: true,
      content: 'การสัมนาแบบสดกับผู้เชี่ยวชาญในสาขา'
    }
  ];

  const toggleUserType = () => {
    setIsFreeUser(!isFreeUser);
  };

  return (
    <div className="access-control-container">
      <div className="user-status-card">
        <h2>สถานะการใช้งาน</h2>
        <div className="status-badge">
          {isFreeUser ? (
            <span className="badge badge-free">👤 ผู้ใช้ฟรี</span>
          ) : (
            <span className="badge badge-premium">💎 ผู้ใช้พรีเมียม</span>
          )}
        </div>
        <button 
          className="toggle-btn"
          onClick={toggleUserType}
        >
          {isFreeUser ? 'อัปเกรดเป็นพรีเมียม' : 'ดูรูปแบบผู้ใช้ฟรี'}
        </button>
      </div>

      <div className="modules-grid">
        {modules.map((module) => {
          const canAccess = !module.isPremium || !isFreeUser;

          return (
            <div 
              key={module.id} 
              className={`module-card ${!canAccess ? 'locked' : 'unlocked'}`}
            >
              <div className="module-header">
                <h3>{module.title}</h3>
                {module.isPremium && (
                  <span className="premium-badge">💎 พรีเมียม</span>
                )}
              </div>

              <p className="module-description">{module.description}</p>

              {canAccess ? (
                <div className="module-content">
                  <p className="content-text">{module.content}</p>
                  <div className="video-container">
                    <iframe
                      width="100%"
                      height="200"
                      src={module.videoUrl}
                      title={module.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ) : (
                <div className="locked-content">
                  <div className="lock-icon">🔒</div>
                  <p className="lock-message">เนื้อหานี้สำหรับผู้ใช้พรีเมียมเท่านั้น</p>
                  <button className="purchase-btn">
                    ซื้อเพื่อเข้าถึง (฿99)
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccessControl;
