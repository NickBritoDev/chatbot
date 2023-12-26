import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'chatbotapp.portalmaisvalor.com',
  appName: 'chatbot',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
