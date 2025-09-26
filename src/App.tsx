// src/App.tsx

import React, { useState, useEffect, useRef } from 'react';

// Import các plugin từ Capacitor
import { LocalNotifications } from '@capacitor/local-notifications';
import { Haptics } from '@capacitor/haptics';
import { Dialog } from '@capacitor/dialog';

// Import file CSS
import './App.css';

// Định nghĩa các hằng số và kiểu dữ liệu để code sạch hơn
const WORK_DURATION = 25 * 60; // 25 phút
const BREAK_DURATION = 5 * 60;  // 5 phút

type Mode = 'work' | 'break';

type Session = {
  id: number;
  type: Mode;
  completedAt: string;
};

function App() {
  // === STATE MANAGEMENT ===
  const [mode, setMode] = useState<Mode>('work');
  const [time, setTime] = useState(WORK_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [history, setHistory] = useState<Session[]>([]);
  const [selectedSound, setSelectedSound] = useState('sounds/bell.mp3');
  
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // === EFFECTS ===

  // 1. Yêu cầu quyền gửi thông báo khi app khởi động
  useEffect(() => {
    LocalNotifications.requestPermissions();
  }, []);

  // 2. Tải lịch sử từ localStorage khi app khởi động
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('pomodoroHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Failed to load history from localStorage", error);
    }
  }, []);

  // 3. Lưu lịch sử vào localStorage mỗi khi có thay đổi
  useEffect(() => {
    localStorage.setItem('pomodoroHistory', JSON.stringify(history));
  }, [history]);

  // 4. Logic chính của bộ đếm giờ
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            // Hết giờ
            handleSessionEnd();
            return 0; // Trả về 0 để tránh hiển thị -1
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      // Dọn dẹp interval khi timer dừng
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    const toggleTimer = () => {
    // "MỞ KHÓA" ÂM THANH KHI NHẤN START LẦN ĐẦU
    if (!audioRef.current) {
      // Chỉ tạo một lần duy nhất
      audioRef.current = new Audio(selectedSound); // Tải âm thanh mặc định
      audioRef.current.volume = 0; // Đặt âm lượng = 0
      audioRef.current.play().catch(() => {}); // Phát một tiếng "im lặng" để mở khóa
      audioRef.current.volume = 1; // Đặt lại âm lượng
    }
     useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = selectedSound;
    }
  }, [selectedSound]);

  // CẬP NHẬT HÀM sendNotification
  const sendNotification = async (sessionType: Mode) => {
    // ... Haptics.vibrate() và logic title, body giữ nguyên ...

    // XÓA thuộc tính "sound" và THAY BẰNG LỆNH PHÁT TRỰC TIẾP
    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: 1,
          schedule: { at: new Date(Date.now() + 100) },
          // sound: selectedSound, // <= BỎ DÒNG NÀY ĐI
        },
      ],
    });

    // PHÁT ÂM THANH TRỰC TIẾP QUA AUDIO ELEMENT
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Tua về đầu
      audioRef.current.play(); // Phát âm thanh
    }

    await Dialog.alert({ title, message: body });
  };
    setIsActive(!isActive);
  };
    // Hàm cleanup, chạy khi component unmount hoặc dependency thay đổi
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  // === HANDLER FUNCTIONS ===
  
  // Gửi thông báo và rung
  const sendNotification = async (sessionType: Mode) => {
    await Haptics.vibrate();
    
    const title = sessionType === 'work' ? "Work session is over!" : "Break time is over!";
    const body = sessionType === 'work' ? "Time for a short break. 🧘" : "Time to get back to work! 💪";

    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: 1, // Dùng ID cố định để thông báo mới ghi đè lên thông báo cũ
          schedule: { at: new Date(Date.now() + 100) },
          sound: selectedSound, // Sử dụng âm báo đã chọn
        },
      ],
    });

    await Dialog.alert({ title, message: body });
  };

  // Xử lý khi một phiên kết thúc
  const handleSessionEnd = () => {
    // Ghi lại lịch sử
    const newSession: Session = {
      id: Date.now(),
      type: mode,
      completedAt: new Date().toLocaleTimeString(),
    };
    setHistory(prevHistory => [newSession, ...prevHistory]);

    // Gửi thông báo
    sendNotification(mode);

    // Chuyển đổi chế độ
    const newMode = mode === 'work' ? 'break' : 'work';
    setMode(newMode);
    setTime(newMode === 'work' ? WORK_DURATION : BREAK_DURATION);
    setIsActive(false);
  };
  
  // Bật/tắt timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset timer về trạng thái ban đầu của phiên hiện tại
  const resetTimer = () => {
    setIsActive(false);
    setTime(mode === 'work' ? WORK_DURATION : BREAK_DURATION);
  };

  // Định dạng thời gian từ giây sang MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // === JSX RENDER ===
  return (
    <div className="container">
      <h1>Pomodoro Timer</h1>
      
      {/* Hiển thị Timer */}
      <div className="timer-display">
        <p className="mode-label">{mode === 'work' ? 'Work Session' : 'Break Time'}</p>
        <p className="time">{formatTime(time)}</p>
      </div>
      
      {/* Các nút điều khiển */}
      <div className="buttons">
        <button onClick={toggleTimer} className={isActive ? 'pause' : 'start'}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer} className="reset">
          Reset
        </button>
      </div>
      
      {/* Cài đặt âm báo */}
      <div className="settings">
        <label htmlFor="sound-select">Notification Sound: </label>
        <select 
          id="sound-select"
          value={selectedSound} 
          onChange={e => setSelectedSound(e.target.value)}
        >
          <option value="sounds/sound1.mp3">Bell</option>
          <option value="sounds/sound2.mp3">Chime</option>
        </select>
      </div>

      {/* Lịch sử phiên */}
      {history.length > 0 && (
        <div className="history">
          <h2>Session History</h2>
          <ul>
            {history.map(session => (
              <li key={session.id}>
                <span>{session.type === 'work' ? '💪 Work' : '🧘 Break'}</span>
                <span>Completed at {session.completedAt}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;