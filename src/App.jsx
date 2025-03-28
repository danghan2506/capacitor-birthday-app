import React, { useState, useEffect } from 'react'
import { 
  IonApp, 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonInput, 
  IonButton, 
  IonCard, 
  IonCardContent,
  IonBadge
} from '@ionic/react'
import { Capacitor } from '@capacitor/core'
import { LocalNotifications } from '@capacitor/local-notifications'
import { Share } from '@capacitor/share'
import { Device } from '@capacitor/device' 
import './App.css'

function App() {
  const [birthday, setBirthday] = useState('')
  const [daysRemaining, setDaysRemaining] = useState(null);

  const calculateDaysToNextBirthday = async () => {
    const birthdayRegex = /^(\d{2})\/(\d{2})$/;
    const match = birthday.match(birthdayRegex);
    if (!match) {
      alert('Vui lòng nhập ngày sinh đúng định dạng DD/MM');
      return;
    }
    
    const day = parseInt(match[1]);
    const month = parseInt(match[2]);
    const today = new Date();
    const nextBirthday = new Date(today.getFullYear(), month - 1, day);
    const requestPermission = async () => {
      const { granted } = await LocalNotifications.requestPermissions();
      if (!granted) {
        alert('Không có quyền gửi thông báo.');
        return false;
      }
      return true;
    };
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const timeDiff = nextBirthday.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysRemaining(daysLeft);
  
    if (Capacitor.isNativePlatform()) {
      const permissionGranted = await requestPermission();
      if (!permissionGranted) return;
  
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Sinh nhật sắp tới',
            body: `Còn ${daysLeft} ngày nữa là đến sinh nhật!`,
            id: 1,
            schedule: { at: new Date(Date.now() + 1000) }
          }
        ]
      });
    }
  };
  

  const shareBirthdayCountdown = async () => {
    if (daysRemaining !== null && Capacitor.isNativePlatform()) {
      await Share.share({
        title: 'Đếm ngày sinh nhật',
        text: `Tôi còn ${daysRemaining} ngày nữa là đến sinh nhật!`
      });
    }
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>🎂 Đếm Ngược Sinh Nhật 🎉</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ backgroundColor: '#f0f4f8' }}>
        <IonCard style={{ borderRadius: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '20px' }}>
          <IonCardContent>
            <IonInput 
              label="Nhập ngày sinh (DD/MM)" 
              placeholder="Ví dụ: 09/03" 
              value={birthday}
              onIonChange={e => setBirthday(e.detail.value)}
              style={{ marginBottom: '15px', padding: '10px', borderRadius: '10px', backgroundColor: 'white' }}
            />
            <IonButton 
              expand="block" 
              onClick={calculateDaysToNextBirthday}
              className="ion-margin-top"
              style={{ marginTop: '15px', backgroundColor: '#4CAF50', borderRadius: '10px' }}
            >
              Tính Thời Gian
            </IonButton>

            {daysRemaining !== null && (
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <IonBadge color="success" style={{ fontSize: '1.2em', padding: '10px', borderRadius: '10px' }}>
                 Còn : {daysRemaining} ngày nữa là sẽ đến sinh nhật của bạn! 🎂 🎉
                </IonBadge>
                <IonButton 
                  expand="block" 
                  onClick={shareBirthdayCountdown}
                  className="ion-margin-top"
                  style={{ marginTop: '15px', backgroundColor: '#2196F3', borderRadius: '10px' }}
                >
                  Chia Sẻ
                </IonButton>
              </div>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonApp>
  );
}

export default App;
