import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Music Visualizer | Serigne Diaw',
  description: 'Interactive AI-powered music visualizer with dynamic animations and responsive design.',
};

export default function MusicVisualizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 