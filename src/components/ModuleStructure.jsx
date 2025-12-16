import React, { useEffect, useMemo, useState } from 'react';
import '../styles/ModuleStructure.css';
import { db } from '../lib/firebase';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';

/**
 * ModuleStructure Component - โครงสร้างหลักสูตร
 * 
 * ฟังก์ชัน:
 * - แสดงโครงสร้างหลักสูตร (Module 1, 2, 3...)
 * - Embed วิดีโอจาก YouTube ผ่าน iFrame
 * - แสดง/ซ่อนเนื้อหาแต่ละ Module
 * - จำลองฟอรั่มสำหรับคำถามและคอมเมนต์
 */

const ModuleStructure = ({ course }) => {
  const [expandedModule, setExpandedModule] = useState(1);
  const [forumPosts, setForumPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [activeForumModule, setActiveForumModule] = useState(1);

    const slugify = (str) =>
      (str || '')
        .toString()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]+/g, '-');

    const courseKey = useMemo(
      () => (course?.id ? String(course.id) : course?.title ? slugify(course.title) : 'default-course'),
      [course]
    );

    useEffect(() => {
      setActiveForumModule(expandedModule || 1);
    }, [expandedModule]);

    useEffect(() => {
      if (!db) return; // no Firebase configured, skip
      const col = collection(db, 'forum_posts');
      const q = query(
        col,
        where('courseKey', '==', courseKey),
        where('moduleId', '==', activeForumModule),
        orderBy('createdAt', 'asc')
      );
      const unsub = onSnapshot(q, (snap) => {
        const items = snap.docs.map((d) => {
          const data = d.data();
          let ts = '';
          try {
            if (data.createdAt?.toDate) {
              ts = data.createdAt.toDate().toLocaleString('th-TH');
            }
          } catch {}
          return {
            id: d.id,
            moduleId: data.moduleId,
            author: data.author || 'ผู้ใช้',
            content: data.content || '',
            timestamp: ts || new Date().toLocaleString('th-TH'),
          };
        });
        setForumPosts(items);
      });
      return () => unsub();
    }, [db, courseKey, activeForumModule]);

  // ข้อมูลโครงสร้างหลักสูตร
  const modules = [
    {
      id: 1,
      title: 'Module 1: บทนำสู่ Micro-learning',
      duration: '15 นาที',
      lessons: [
        'การเรียนรู้แบบแบ่งส่วน',
        'ประโยชน์ของ Micro-learning',
        'ตัวอย่างการใช้งาน'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'เรียนรู้พื้นฐานเกี่ยวกับ Micro-learning และวิธีการนำไปใช้ในการเรียนการสอน',
      content: `
        Micro-learning เป็นวิธีการเรียนรู้ที่เน้นการแบ่งเนื้อหาออกเป็นส่วนเล็กๆ 
        เพื่อให้ผู้เรียนสามารถจดจำและประยุกต์ใช้ได้ง่ายขึ้น
        
        ข้อดีของ Micro-learning:
        • ประหยัดเวลา - สามารถเรียนได้ในช่วงเวลาสั้นๆ
        • เพิ่มการจดจำ - เนื้อหาเล็กๆ ช่วยให้จดจำได้ดีขึ้น
        • ยืดหยุ่น - สามารถเรียนได้ตามที่ต้องการ
        • ลดความเครียด - เนื้อหาไม่ยากเกินไป
      `
    },
    {
      id: 2,
      title: 'Module 2: การสร้าง LMS ฟรีเมียม',
      duration: '20 นาที',
      lessons: [
        'โมเดลธุรกิจ Freemium',
        'Access Control Implementation',
        'User Experience Design'
      ],
      videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
      description: 'ศึกษาวิธีการสร้าง LMS ด้วยโมเดล Freemium ที่ยืดหยุ่นและมีประสิทธิภาพ',
      content: `
        Freemium Model เป็นรูปแบบธุรกิจยอดนิยมที่ให้ใช้บริการพื้นฐานฟรี 
        แต่คิดค่าใช้สำหรับบริการขั้นสูง
        
        วิธีการนำ Freemium มาใช้ใน LMS:
        • สื่อสารว่าเนื้อหาใดสำหรับฟรี เนื้อหาใดสำหรับพรีเมียม
        • ออกแบบ UI ให้ผู้ใช้เห็นค่าของการอัปเกรด
        • บันทึกความคืบหน้าของผู้ใช้
        • ให้ทดลองใช้ฟีเจอร์พรีเมียมก่อนซื้อ
      `
    },
    {
      id: 3,
      title: 'Module 3: การพัฒนา Quiz และ Assessment',
      duration: '25 นาที',
      lessons: [
        'การสร้างแบบทดสอบแบบโต้ตอบ',
        'Validation และ Feedback',
        'การวัดผลการเรียน'
      ],
      videoUrl: 'https://www.youtube.com/embed/WZ7in-ihnN4',
      description: 'เรียนรู้วิธีการสร้าง Quiz ที่มีประสิทธิภาพและสามารถติดตามความคืบหน้าของผู้เรียน',
      content: `
        การสร้าง Quiz ที่มีประสิทธิภาพ:
        
        1. การออกแบบคำถาม:
           • ให้ชัดเจนและเข้าใจง่าย
           • มีหลายระดับความยาก
           • ครอบคลุมเนื้อหา
        
        2. การประเมินผล:
           • ให้ Feedback ทันที
           • แสดงผลคะแนนอย่างชัดเจน
           • แสดงคำอธิบายสำหรับคำตอบที่ถูก
        
        3. การติดตามความคืบหน้า:
           • บันทึกคะแนนของผู้เรียน
           • ระบุจุดอ่อนที่ต้องปรับปรุง
      `
    },
    {
      id: 4,
      title: 'Module 4: Gamification และ Engagement',
      duration: '18 นาที',
      lessons: [
        'เพิ่มความสนใจผู้เรียน',
        'Badges และ Rewards',
        'Leaderboard System'
      ],
      videoUrl: 'https://www.youtube.com/embed/TYzlqwAVwsw',
      description: 'เพิ่มความมีชีวิตชีวาให้กับ LMS โดยใช้องค์ประกอบของเกม',
      content: `
        Gamification เป็นเทคนิคการใช้องค์ประกอบของเกม 
        เพื่อเพิ่มความสนใจและแรงจูงใจของผู้เรียน
        
        องค์ประกอบของ Gamification:
        • Points - การให้คะแนนสำหรับกิจกรรม
        • Badges - สัญลักษณ์แสดงความสำเร็จ
        • Leaderboard - อันดับผู้เรียนที่ดีที่สุด
        • Challenges - งานท้าทายที่น่าสนใจ
      `
    }
  ];

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const handleForumSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim() === '') return;

    const post = {
      moduleId: activeForumModule,
      courseKey,
      author: 'ผู้ใช้',
      content: newPost,
      createdAt: serverTimestamp(),
    };

    try {
      if (db) {
        await addDoc(collection(db, 'forum_posts'), post);
      } else {
        // fallback เก็บใน state ชั่วคราว เมื่อไม่มี Firebase config
        setForumPosts([
          ...forumPosts,
          {
            id: Date.now(),
            moduleId: activeForumModule,
            author: post.author,
            content: post.content,
            timestamp: new Date().toLocaleString('th-TH'),
          },
        ]);
      }
    } catch (err) {
      console.error('ส่งโพสต์ไป Firestore ล้มเหลว:', err);
    } finally {
      setNewPost('');
      console.log('📝 โพสต์ใหม่ในฟอรั่ม:', post);
    }
  };

  const modulePosts = forumPosts.filter(post => post.moduleId === activeForumModule);

  return (
    <div className="module-structure-container">
      <div className="header-section">
        <h1>
          {course?.title ? `📚 ${course.title}` : '📚 โครงสร้างหลักสูตร LMS'}
        </h1>
        <p>
          {course?.instructor
            ? `ผู้สอน: ${course.instructor} ${course?.duration ? `• ระยะเวลา: ${course.duration}` : ''}`
            : 'แนวทางการศึกษาแบบ Micro-learning สำหรับผู้เริ่มต้น'}
        </p>
      </div>

      <div className="modules-list">
        {modules.map((module) => (
          <div key={module.id} className="module-item">
            <div 
              className="module-title-bar"
              onClick={() => toggleModule(module.id)}
            >
              <div className="title-content">
                <h3>{module.title}</h3>
                <span className="duration">⏱️ {module.duration}</span>
              </div>
              <span className={`expand-icon ${expandedModule === module.id ? 'expanded' : ''}`}>
                ▼
              </span>
            </div>

            {expandedModule === module.id && (
              <div className="module-details">
                <div className="module-description">
                  <p>{module.description}</p>
                </div>

                <div className="video-section">
                  <h4>📹 วิดีโอบทเรียน</h4>
                  <div className="video-wrapper">
                    <iframe
                      width="100%"
                      height="300"
                      src={module.videoUrl}
                      title={module.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>

                <div className="lessons-section">
                  <h4>📖 บทเรียน</h4>
                  <ul className="lessons-list">
                    {module.lessons.map((lesson, idx) => (
                      <li key={idx}>
                        <span className="lesson-number">{idx + 1}</span>
                        <span className="lesson-text">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="content-section">
                  <h4>📝 เนื้อหา</h4>
                  <div className="content-text">
                    {module.content.split('\n').map((line, idx) => (
                      line.trim() && <p key={idx}>{line.trim()}</p>
                    ))}
                  </div>
                </div>

                <div className="forum-section">
                  <h4>💬 ฟอรั่มสำหรับคำถามและคอมเมนต์</h4>
                  
                  <form onSubmit={handleForumSubmit} className="forum-form">
                    <textarea
                      placeholder="พิมพ์คำถามหรือคอมเมนต์ของคุณ..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="forum-input"
                    ></textarea>
                    <button type="submit" className="submit-btn">
                      ส่งคำถาม / คอมเมนต์
                    </button>
                  </form>

                  <div className="forum-posts">
                    {modulePosts.length > 0 ? (
                      modulePosts.map((post) => (
                        <div key={post.id} className="forum-post">
                          <div className="post-header">
                            <strong>{post.author}</strong>
                            <span className="post-time">{post.timestamp}</span>
                          </div>
                          <div className="post-content">{post.content}</div>
                          <div className="post-actions">
                            <button className="reply-btn">ตอบ</button>
                            <button className="like-btn">👍 ไลค์</button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="no-posts">ยังไม่มีคำถามหรือคอมเมนต์ในโมดูลนี้</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="console-log-info">
        <p>💡 เคล็ดลับ: เปิด Developer Console (F12) เพื่อดูบันทึกการส่งคำถาม/คอมเมนต์ในฟอรั่ม</p>
      </div>
    </div>
  );
};

export default ModuleStructure;
