

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Capacitor is a cross-platform native runtime that allows you to build web applications with JavaScript, TypeScript, or any front-end framework and then deploy them as native mobile apps or Progressive Web Apps (PWAs). It provides a simple and unified API to access native device features and functionalities such as the camera, geolocation, and storage.

Capcatior + ReactJS Birthday Countdown App
Features:

📅 Calculate days remaining until next birthday


📲 Cross-platform support (Web, Android, iOS)

🔔 Native local notifications

📤 Share birthday countdown
To run this project, follow these steps: 

Step 1: Install Dependencies: npm install

Step 2: Install Capacitor platforms 
  npx cap add android
  npx cap add ios
  
Running the Application

1.Build the React app: npm run build

2.Sync Capacitors platform: npx cap sync

3.Open in specific platform: 
# For Android
npx cap run android

# For iOS
npx cap run ios

