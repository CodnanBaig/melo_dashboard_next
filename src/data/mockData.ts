import { Release, RoyaltyReport, Label, Artist } from '../types';

export const mockLabels: Label[] = [
  {
    id: '1',
    name: 'Indie Sounds Records',
    email: 'contact@indiesounds.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra, India',
    status: 'approved',
    documents: {
      aadhaar: 'aadhaar_123456789.pdf',
      panCard: 'pan_ABCDE1234F.pdf',
      msmeCertificate: 'msme_cert_123.pdf',
      signedContract: 'signed_contract_indie.pdf'
    },
    contractUrl: 'https://melo.com/contracts/indie-sounds-records.pdf',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Urban Beats Label',
    email: 'info@urbanbeats.in',
    phone: '+91 87654 32109',
    address: 'Delhi, India',
    status: 'under-review',
    documents: {
      aadhaar: 'aadhaar_987654321.pdf',
      panCard: 'pan_FGHIJ5678K.pdf',
      msmeCertificate: 'msme_cert_456.pdf'
    },
    contractUrl: 'https://melo.com/contracts/urban-beats-label.pdf',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  },
  {
    id: '3',
    name: 'Melody Music House',
    email: 'hello@melodymusic.com',
    phone: '+91 76543 21098',
    address: 'Bangalore, Karnataka, India',
    status: 'pending',
    documents: {},
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-04-01T00:00:00Z'
  }
];

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Alex Rivers',
    email: 'alex@alexrivers.com',
    bio: 'Electronic music producer and DJ from Mumbai, creating atmospheric soundscapes.',
    socialLinks: {
      instagram: 'https://instagram.com/alexrivers',
      youtube: 'https://youtube.com/@alexrivers',
      spotify: 'https://open.spotify.com/artist/alexrivers',
      appleMusic: 'https://music.apple.com/artist/alexrivers'
    },
    avatar: 'https://images.pexels.com/photos/1644996/pexels-photo-1644996.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Luna Sky',
    email: 'luna@lunasky.music',
    bio: 'Ambient and electronic artist exploring the depths of nocturnal soundscapes.',
    socialLinks: {
      instagram: 'https://instagram.com/lunasky',
      spotify: 'https://open.spotify.com/artist/lunasky'
    },
    avatar: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z'
  },
  {
    id: '3',
    name: 'Coastal Beats',
    email: 'info@coastalbeats.com',
    bio: 'Chill and ambient music collective from Goa, inspired by ocean waves.',
    socialLinks: {
      instagram: 'https://instagram.com/coastalbeats',
      youtube: 'https://youtube.com/@coastalbeats'
    },
    avatar: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z'
  }
];

export const mockReleases: Release[] = [
  {
    id: '1',
    title: 'Summer Vibes',
    artist: 'Alex Rivers',
    artistId: '1',
    labelId: '1',
    type: 'single',
    status: 'live',
    artwork: 'https://images.pexels.com/photos/1644996/pexels-photo-1644996.jpeg?auto=compress&cs=tinysrgb&w=400',
    releaseDate: '2024-01-15',
    tracks: [
      { id: '1', title: 'Summer Vibes', duration: 180 }
    ],
    genres: ['Pop', 'Electronic'],
    smartLink: 'https://melo.link/summer-vibes',
    pitchingAvailable: false,
    analytics: {
      streams: 45678,
      saves: 2341,
      skips: 567,
      shares: 234,
      topRegions: [
        { country: 'US', streams: 18271, percentage: 40 },
        { country: 'UK', streams: 9135, percentage: 20 },
        { country: 'CA', streams: 6851, percentage: 15 },
        { country: 'AU', streams: 4568, percentage: 10 },
        { country: 'DE', streams: 3425, percentage: 7.5 },
        { country: 'FR', streams: 3428, percentage: 7.5 }
      ],
      topPlatforms: [
        { platform: 'Spotify', streams: 22839, percentage: 50 },
        { platform: 'Apple Music', streams: 13703, percentage: 30 },
        { platform: 'YouTube Music', streams: 4568, percentage: 10 },
        { platform: 'Amazon Music', streams: 2284, percentage: 5 },
        { platform: 'Deezer', streams: 1284, percentage: 3 },
        { platform: 'Tidal', streams: 1000, percentage: 2 }
      ],
      monthlyData: [
        { month: 'Jan', streams: 5000, earnings: 20.5 },
        { month: 'Feb', streams: 8000, earnings: 32.8 },
        { month: 'Mar', streams: 12000, earnings: 49.2 },
        { month: 'Apr', streams: 15000, earnings: 61.5 },
        { month: 'May', streams: 18000, earnings: 73.8 },
        { month: 'Jun', streams: 22000, earnings: 90.2 }
      ]
    },
    collaborators: ['producer@email.com'],
    socialLinks: {
      youtube: 'https://youtu.be/example',
      instagram: 'https://instagram.com/reel/example'
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Midnight Dreams',
    artist: 'Luna Sky',
    artistId: '2',
    type: 'ep',
    status: 'verified',
    artwork: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    releaseDate: '2024-03-20',
    tracks: [
      { id: '2', title: 'Midnight Dreams', duration: 195 },
      { id: '3', title: 'Starlight', duration: 168 },
      { id: '4', title: 'Nocturne', duration: 201 }
    ],
    genres: ['Ambient', 'Electronic'],
    pitchingAvailable: true,
    analytics: {
      streams: 12456,
      saves: 789,
      skips: 123,
      shares: 67,
      topRegions: [
        { country: 'US', streams: 4982, percentage: 40 },
        { country: 'UK', streams: 2491, percentage: 20 },
        { country: 'CA', streams: 1868, percentage: 15 },
        { country: 'AU', streams: 1246, percentage: 10 },
        { country: 'DE', streams: 934, percentage: 7.5 },
        { country: 'FR', streams: 935, percentage: 7.5 }
      ],
      topPlatforms: [
        { platform: 'Spotify', streams: 6228, percentage: 50 },
        { platform: 'Apple Music', streams: 3737, percentage: 30 },
        { platform: 'YouTube Music', streams: 1246, percentage: 10 },
        { platform: 'Amazon Music', streams: 623, percentage: 5 },
        { platform: 'Deezer', streams: 374, percentage: 3 },
        { platform: 'Tidal', streams: 248, percentage: 2 }
      ],
      monthlyData: [
        { month: 'Mar', streams: 2000, earnings: 8.2 },
        { month: 'Apr', streams: 3500, earnings: 14.35 },
        { month: 'May', streams: 4200, earnings: 17.22 },
        { month: 'Jun', streams: 2756, earnings: 11.3 }
      ]
    },
    collaborators: [],
    socialLinks: {},
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-02-25T00:00:00Z'
  },
  {
    id: '3',
    title: 'Ocean Waves',
    artist: 'Coastal Beats',
    artistId: '3',
    labelId: '2',
    type: 'single',
    status: 'draft',
    artwork: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
    releaseDate: '2024-04-15',
    tracks: [
      { id: '5', title: 'Ocean Waves', duration: 210 }
    ],
    genres: ['Chill', 'Ambient'],
    pitchingAvailable: true,
    analytics: {
      streams: 0,
      saves: 0,
      skips: 0,
      shares: 0,
      topRegions: [],
      topPlatforms: [],
      monthlyData: []
    },
    collaborators: ['mix@engineer.com'],
    socialLinks: {},
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  },
  {
    id: '4',
    title: 'Urban Rhythms',
    artist: 'City Pulse',
    type: 'album',
    status: 'under-review',
    artwork: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    releaseDate: '2024-05-01',
    tracks: [
      { id: '6', title: 'Downtown', duration: 195 },
      { id: '7', title: 'Subway', duration: 168 },
      { id: '8', title: 'Rooftop', duration: 201 },
      { id: '9', title: 'Traffic', duration: 187 },
      { id: '10', title: 'Neon Lights', duration: 223 }
    ],
    genres: ['Hip-Hop', 'Electronic'],
    pitchingAvailable: false,
    analytics: {
      streams: 0,
      saves: 0,
      skips: 0,
      shares: 0,
      topRegions: [],
      topPlatforms: [],
      monthlyData: []
    },
    collaborators: ['rapper@music.com', 'producer@beats.com'],
    socialLinks: {},
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-20T00:00:00Z'
  },
  {
    id: '5',
    title: 'Rejected Track',
    artist: 'Test Artist',
    type: 'single',
    status: 'rejected',
    artwork: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=400',
    releaseDate: '2024-02-01',
    tracks: [
      { id: '11', title: 'Rejected Track', duration: 180 }
    ],
    genres: ['Pop'],
    pitchingAvailable: false,
    analytics: {
      streams: 0,
      saves: 0,
      skips: 0,
      shares: 0,
      topRegions: [],
      topPlatforms: [],
      monthlyData: []
    },
    collaborators: [],
    socialLinks: {},
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  }
];

export const mockRoyaltyReports: RoyaltyReport[] = [
  {
    id: '1',
    month: 'June 2024',
    totalEarnings: 234.52,
    currency: 'USD',
    platforms: [
      { name: 'Spotify', earnings: 117.26, streams: 28564 },
      { name: 'Apple Music', earnings: 70.36, streams: 17134 },
      { name: 'YouTube Music', earnings: 23.45, streams: 5713 },
      { name: 'Amazon Music', earnings: 11.73, streams: 2856 },
      { name: 'Deezer', earnings: 7.04, streams: 1714 },
      { name: 'Tidal', earnings: 4.68, streams: 1141 }
    ],
    regions: [
      { country: 'United States', earnings: 93.81, streams: 22851 },
      { country: 'United Kingdom', earnings: 46.90, streams: 11425 },
      { country: 'Canada', earnings: 35.18, streams: 8569 },
      { country: 'Australia', earnings: 23.45, streams: 5713 },
      { country: 'Germany', earnings: 17.59, streams: 4285 },
      { country: 'France', earnings: 17.59, streams: 4279 }
    ],
    releases: [
      { releaseId: '1', title: 'Summer Vibes', earnings: 190.42, streams: 45678 },
      { releaseId: '2', title: 'Midnight Dreams', earnings: 44.10, streams: 12456 }
    ]
  },
  {
    id: '2',
    month: 'May 2024',
    totalEarnings: 189.73,
    currency: 'USD',
    platforms: [
      { name: 'Spotify', earnings: 94.87, streams: 23117 },
      { name: 'Apple Music', earnings: 56.92, streams: 13870 },
      { name: 'YouTube Music', earnings: 18.97, streams: 4623 },
      { name: 'Amazon Music', earnings: 9.49, streams: 2312 },
      { name: 'Deezer', earnings: 5.69, streams: 1387 },
      { name: 'Tidal', earnings: 3.79, streams: 924 }
    ],
    regions: [
      { country: 'United States', earnings: 75.89, streams: 18492 },
      { country: 'United Kingdom', earnings: 37.95, streams: 9246 },
      { country: 'Canada', earnings: 28.46, streams: 6938 },
      { country: 'Australia', earnings: 18.97, streams: 4623 },
      { country: 'Germany', earnings: 14.23, streams: 3469 },
      { country: 'France', earnings: 14.23, streams: 3465 }
    ],
    releases: [
      { releaseId: '1', title: 'Summer Vibes', earnings: 154.13, streams: 37000 },
      { releaseId: '2', title: 'Midnight Dreams', earnings: 35.60, streams: 10000 }
    ]
  }
];