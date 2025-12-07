export interface Destination {
  title: string;
  image: string;
}

export type DestinationCategory = 'Must Visit' | 'Trending' | 'Weekend' | 'New Discoveries' | 'Just for You';

export const destinationsByCategory: Record<DestinationCategory, Destination[]> = {
  'Must Visit': [
    { title: 'Agra', image: '/assets/destinations/must-visit/Agra.png' },
    { title: 'Andaman', image: '/assets/destinations/must-visit/Andaman.png' },
    { title: 'Darjeeling', image: '/assets/destinations/must-visit/darjeeling.png' },
    { title: 'Jaisalmer', image: '/assets/destinations/must-visit/Jaisalmer.png' },
    { title: 'Ladakh', image: '/assets/destinations/must-visit/Ladakh.png' },
    { title: 'Lakshadweep', image: '/assets/destinations/must-visit/Lakshadweep.png' },
    { title: 'Meghalaya', image: '/assets/destinations/must-visit/Meghalaya.png' },
    { title: 'Mizoram', image: '/assets/destinations/must-visit/Mizoram.png' },
    { title: 'Rann of Kutch', image: '/assets/destinations/must-visit/Rann of Kutch.png' },
    { title: 'Spiti', image: '/assets/destinations/must-visit/Spiti.png' },
    { title: 'Tawang', image: '/assets/destinations/must-visit/Tawang.png' },
  ],
  'Trending': [
    { title: 'Bali', image: '/assets/destinations/trending/Bali.png' },
    { title: 'China', image: '/assets/destinations/trending/China.png' },
    { title: 'Dubai', image: '/assets/destinations/trending/dubai.png' },
    { title: 'Japan', image: '/assets/destinations/trending/Japan.png' },
    { title: 'Kazakhstan', image: '/assets/destinations/trending/Kazakhstan.png' },
    { title: 'Lakshadweep', image: '/assets/destinations/trending/Lakshadweep.png' },
    { title: 'Maldives', image: '/assets/destinations/trending/maldives.png' },
    { title: 'Meghalaya', image: '/assets/destinations/trending/Meghalaya.png' },
    { title: 'Taiwan', image: '/assets/destinations/trending/taiwan.png' },
    { title: 'Turkey', image: '/assets/destinations/trending/Turkey.png' },
    { title: 'Uzbekistan', image: '/assets/destinations/trending/Uzbekistan.png' },
    { title: 'Vietnam', image: '/assets/destinations/trending/Vietnam.png' },
  ],
  'Weekend': [
    { title: 'Chikmagalur', image: '/assets/destinations/weekend/Chikmagalur.png' },
    { title: 'Coorg', image: '/assets/destinations/weekend/Coorg.png' },
    { title: 'Gokarna', image: '/assets/destinations/weekend/Gokarna.png' },
    { title: 'Hampi', image: '/assets/destinations/weekend/Hampi.png' },
    { title: 'Kodaikanal', image: '/assets/destinations/weekend/Kodaikanal.png' },
    { title: 'Munnar', image: '/assets/destinations/weekend/Muannar.png' },
    { title: 'Ooty', image: '/assets/destinations/weekend/Ooty.png' },
    { title: 'Vagamon', image: '/assets/destinations/weekend/Vagamon.png' },
    { title: 'Varkala', image: '/assets/destinations/weekend/Varkala.png' },
    { title: 'Wayanad', image: '/assets/destinations/weekend/Wayanad.png' },
    { title: 'Yercaud', image: '/assets/destinations/weekend/Yercaud.png' },
  ],
  'New Discoveries': [
    { title: 'Dzukou', image: '/assets/destinations/newly-discoverd/Dzukou.png' },
    { title: 'Gorson Bugya', image: '/assets/destinations/newly-discoverd/Gorson Bugya.png' },
    { title: 'Gurez Valley', image: '/assets/destinations/newly-discoverd/Gurez Valley.png' },
    { title: 'Kargil', image: '/assets/destinations/newly-discoverd/Kargil.png' },
    { title: 'Lepakshi', image: '/assets/destinations/newly-discoverd/Lepakshi.png' },
    { title: 'Majuli Island', image: '/assets/destinations/newly-discoverd/Majuli Island.png' },
    { title: 'Ponmudi', image: '/assets/destinations/newly-discoverd/Ponmudi.png' },
    { title: 'Sandakphu', image: '/assets/destinations/newly-discoverd/Sandakphu.png' },
    { title: 'Turtuk', image: '/assets/destinations/newly-discoverd/Turtuk.png' },
  ],
  'Just for You': [
    { title: 'Bhutan', image: '/assets/destinations/just-for-you/Bhutan.png' },
    { title: 'Coorg', image: '/assets/destinations/just-for-you/Coorg.png' },
    { title: 'Goa', image: '/assets/destinations/just-for-you/Goa.png' },
    { title: 'Rajasthan', image: '/assets/destinations/just-for-you/Rajasthan.png' },
    { title: 'Spiti Star-Gazing', image: '/assets/destinations/just-for-you/Spiti Star-Gazing.png' },
    { title: 'Sri Lanka Ella Train', image: '/assets/destinations/just-for-you/Sri Lanka Ella Train.png' },
    { title: 'Vietnam', image: '/assets/destinations/just-for-you/Vietnam.png' },
  ],
};

