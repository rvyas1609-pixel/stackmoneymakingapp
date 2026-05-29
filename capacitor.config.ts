import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stackapp.mobile',
  appName: 'STACK',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
