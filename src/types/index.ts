export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isVerified: boolean;
}

export interface Label {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'pending' | 'documents-uploaded' | 'under-review' | 'approved' | 'rejected';
  documents: {
    aadhaar?: File | string;
    panCard?: File | string;
    msmeCertificate?: File | string;
    signedContract?: File | string;
  };
  contractUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Artist {
  id: string;
  name: string;
  email?: string;
  bio?: string;
  socialLinks: {
    instagram: string; // Required
    youtube?: string;
    spotify?: string;
    appleMusic?: string;
  };
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Release {
  id: string;
  title: string;
  artist: string;
  artistId?: string; // Reference to Artist
  labelId?: string; // Reference to Label
  type: 'single' | 'ep' | 'album';
  status: 'live' | 'verified' | 'draft' | 'under-review' | 'rejected' | 'taken-down';
  artwork: string;
  releaseDate: string;
  tracks: Track[];
  genres: string[];
  smartLink?: string;
  pitchingAvailable: boolean;
  analytics: ReleaseAnalytics;
  collaborators: string[];
  socialLinks: {
    youtube?: string;
    instagram?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Track {
  id: string;
  title: string;
  duration: number;
  file?: File;
  isrc?: string;
}

export interface ReleaseAnalytics {
  streams: number;
  saves: number;
  skips: number;
  shares: number;
  topRegions: Array<{ country: string; streams: number; percentage: number }>;
  topPlatforms: Array<{ platform: string; streams: number; percentage: number }>;
  monthlyData: Array<{ month: string; streams: number; earnings: number }>;
}

export interface Payout {
  id: string;
  amount: number;
  currency: string;
  status: 'requested' | 'processing' | 'paid';
  requestDate: string;
  processedDate?: string;
  method: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface RoyaltyReport {
  id: string;
  month: string;
  totalEarnings: number;
  currency: string;
  platforms: Array<{
    name: string;
    earnings: number;
    streams: number;
  }>;
  regions: Array<{
    country: string;
    earnings: number;
    streams: number;
  }>;
  releases: Array<{
    releaseId: string;
    title: string;
    earnings: number;
    streams: number;
  }>;
}