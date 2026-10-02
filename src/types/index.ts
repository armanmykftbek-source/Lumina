export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // seconds
  views: number;
  createdAt: string;
  channel: Channel;
  tags?: string[];
  chapters?: Chapter[];
  summary?: string;
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  subscribers: number;
  verified?: boolean;
}

export interface Chapter {
  title: string;
  timestamp: number; // seconds
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videosCount: number;
  progress?: number; // 0-100
  category: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  goals?: string[];
}
