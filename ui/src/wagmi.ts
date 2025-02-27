import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  moonbaseAlpha
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
   moonbaseAlpha
  ],
  ssr: true,
});