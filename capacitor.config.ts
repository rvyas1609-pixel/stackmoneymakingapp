import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stackapp.mobile',
  appName: 'STACK',
  webDir: 'out', // This is still used as a fallback
  server: {
    androidScheme: 'https',
    url: 'https://stackmoneymakingapp.vercel.app', // Your live Vercel URL
    allowNavigation: ['stackmoneymakingapp.vercel.app', 'clerk.com']
  }
};

export default config;
