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
  const calculateDaysToNextBirthday = () => {
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
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const timeDiff = nextBirthday.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysRemaining(daysLeft);
    if (Capacitor.isNativePlatform()) {
      LocalNotifications.schedule({
        notifications: [
          {
            title: 'Sinh nhật sắp tới',
            body: `Còn ${daysLeft} ngày nữa là đến sinh nhật!`,
            id: 1
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
          <IonTitle>Đếm ngược sinh nhật</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <IonInput 
              label="Nhập ngày sinh (DD/MM)" 
              placeholder="Ví dụ: 09/03" 
              value={birthday}
              onIonChange={e => setBirthday(e.detail.value)}
            />
            <IonButton 
              expand="block" 
              onClick={calculateDaysToNextBirthday}
              className="ion-margin-top"
            >
              Tính Thời Gian
            </IonButton>

            {daysRemaining !== null && (
              <div className="ion-margin-top">
                <p>Số ngày còn lại đến sinh nhật: {daysRemaining} ngày</p>
                <IonButton 
                  expand="block" 
                  onClick={shareBirthdayCountdown}
                  className="ion-margin-top"
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