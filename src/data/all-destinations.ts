export interface RegionDestinations {
  [region: string]: string[];
}

export interface ComboDestination {
  category: string;
  destinations: string[];
}

export const allDestinationsByRegion: RegionDestinations = {
  'North India': [
    'Delhi',
    'Agra',
    'Jaipur',
    'Udaipur',
    'Jodhpur',
    'Jaisalmer',
    'Amritsar',
    'Chandigarh',
    'Shimla',
    'Manali',
    'Dharamshala',
    'Kasol',
    'Rishikesh',
    'Haridwar',
    'Dehradun',
    'Mussoorie',
    'Leh',
    'Ladakh',
    'Srinagar',
    'Gulmarg',
    'Pahalgam',
    'Sonmarg',
    'Kullu',
    'Kasauli',
    'Nainital',
    'Auli',
    'Jim Corbett',
    'Varanasi',
    'Lucknow',
  ],
  'South India': [
    'Bangalore',
    'Mysore',
    'Coorg',
    'Mangalore',
    'Ooty',
    'Kodaikanal',
    'Chennai',
    'Madurai',
    'Rameswaram',
    'Kanyakumari',
    'Kochi',
    'Munnar',
    'Thekkady',
    'Alleppey',
    'Wayanad',
    'Kozhikode',
    'Trivandrum',
    'Varkala',
    'Pondicherry',
    'Mahabalipuram',
    'Hyderabad',
  ],
  'East India': [
    'Kolkata',
    'Darjeeling',
    'Gangtok',
    'Kalimpong',
    'Puri',
    'Bhubaneswar',
    'Konark',
    'Shillong',
    'Cherrapunji',
    'Guwahati',
    'Majuli',
    'Kaziranga',
    'Tawang',
    'Ziro',
    'Kohima',
  ],
  'West India': [
    'Mumbai',
    'Lonavala',
    'Mahabaleshwar',
    'Pune',
    'Nashik',
    'Goa',
    'Ahmedabad',
    'Kutch',
    'Somnath',
    'Dwarka',
    'Mount Abu',
  ],
  'Central India': [
    'Bhopal',
    'Indore',
    'Pachmarhi',
    'Khajuraho',
    'Gwalior',
    'Kanha National Park',
    'Bandhavgarh',
  ],
};

export const popularComboDestinations: Record<string, ComboDestination> = {
  'Golden Triangle': {
    category: 'Golden Triangle',
    destinations: [
      'Delhi',
      'Agra',
      'Jaipur',
      'Udaipur',
      'Mathura',
      'Vrindavan',
    ],
  },
  'Himachal': {
    category: 'Himachal',
    destinations: [
      'Delhi',
      'Shimla',
      'Manali',
      'Kasol',
      'Kullu',
      'Dharamshala',
      'Dalhousie',
      'Leh',
      'Ladakh',
    ],
  },
  'Kashmir': {
    category: 'Kashmir',
    destinations: [
      'Srinagar',
      'Gulmarg',
      'Pahalgam',
      'Sonmarg',
    ],
  },
  'Kerala': {
    category: 'Kerala',
    destinations: [
      'Kochi',
      'Munnar',
      'Thekkady',
      'Alleppey',
      'Wayanad',
      'Varkala',
    ],
  },
  'Tamil Nadu': {
    category: 'Tamil Nadu',
    destinations: [
      'Chennai',
      'Pondicherry',
      'Mahabalipuram',
      'Madurai',
      'Rameswaram',
      'Kanyakumari',
    ],
  },
  'Karnataka': {
    category: 'Karnataka',
    destinations: [
      'Bangalore',
      'Mysore',
      'Coorg',
      'Ooty',
      'Wayanad',
    ],
  },
  'North East': {
    category: 'North East',
    destinations: [
      'Guwahati',
      'Shillong',
      'Cherrapunji',
      'Gangtok',
      'Darjeeling',
      'Kalimpong',
      'Assam',
      'Meghalaya',
      'Arunachal',
    ],
  },
  'West India': {
    category: 'West India',
    destinations: [
      'Mumbai',
      'Lonavala',
      'Mahabaleshwar',
      'Ahmedabad',
      'Dwarka',
      'Somnath',
      'Diu',
      'Goa',
      'Gokarna',
    ],
  },
  'Central India': {
    category: 'Central India',
    destinations: [
      'Indore',
      'Ujjain',
      'Omkareshwar',
      'Bhopal',
      'Sanchi',
      'Pachmarhi',
    ],
  },
  'Spiritual': {
    category: 'Spiritual',
    destinations: [
      'Varanasi',
      'Prayagraj',
      'Ayodhya',
      'Rishikesh',
      'Haridwar',
      'Dehradun',
      'Puri',
      'Konark',
      'Bhubaneswar',
      'Madurai',
      'Rameswaram',
      'Kanyakumari',
    ],
  },
};

// Helper function to get all destinations from a specific region
export function getDestinationsByRegion(region: string): string[] {
  return allDestinationsByRegion[region] || [];
}

// Helper function to get all destinations for a specific combo category
export function getComboDestinationsByCategory(category: string): string[] {
  return popularComboDestinations[category]?.destinations || [];
}

// Helper function to get all unique destinations across all regions
export function getAllUniqueDestinations(): string[] {
  const unique = new Set<string>();
  Object.values(allDestinationsByRegion).forEach(destinations => {
    destinations.forEach(dest => unique.add(dest));
  });
  return Array.from(unique).sort();
}

// Helper function to get all unique destinations including combo categories
export function getAllDestinationsIncludingCombos(): string[] {
  const unique = new Set<string>();
  
  // Add regional destinations
  Object.values(allDestinationsByRegion).forEach(destinations => {
    destinations.forEach(dest => unique.add(dest));
  });
  
  // Add combo category destinations
  Object.values(popularComboDestinations).forEach(combo => {
    combo.destinations.forEach(dest => unique.add(dest));
  });
  
  return Array.from(unique).sort();
}

// Helper function to find matching region or combo category by search query
export function findMatchingCategory(searchQuery: string): string | null {
  const query = searchQuery.toLowerCase().trim();
  
  // Check regions
  const regionKeys = Object.keys(allDestinationsByRegion);
  for (const region of regionKeys) {
    if (region.toLowerCase() === query || region.toLowerCase().includes(query)) {
      return region;
    }
  }
  
  // Check combo categories
  const comboKeys = Object.keys(popularComboDestinations);
  for (const combo of comboKeys) {
    if (combo.toLowerCase() === query || combo.toLowerCase().includes(query)) {
      return combo;
    }
  }
  
  return null;
}

// Helper function to find ALL matching regions or combo categories by search query
export function findAllMatchingCategories(searchQuery: string): string[] {
  const query = searchQuery.toLowerCase().trim();
  const matchingCategories: string[] = [];
  
  // Check regions
  const regionKeys = Object.keys(allDestinationsByRegion);
  for (const region of regionKeys) {
    if (region.toLowerCase() === query || region.toLowerCase().includes(query)) {
      matchingCategories.push(region);
    }
  }
  
  // Check combo categories
  const comboKeys = Object.keys(popularComboDestinations);
  for (const combo of comboKeys) {
    if (combo.toLowerCase() === query || combo.toLowerCase().includes(query)) {
      matchingCategories.push(combo);
    }
  }
  
  return matchingCategories;
}

// Helper function to get destinations by category (region or combo)
export function getDestinationsByCategory(category: string): string[] {
  // Check if it's a region
  if (allDestinationsByRegion[category]) {
    return allDestinationsByRegion[category];
  }
  
  // Check if it's a combo category
  if (popularComboDestinations[category]) {
    return popularComboDestinations[category].destinations;
  }
  
  return [];
}

// Recently booked destinations interface
export interface RecentlyBookedDestination {
  title: string;
  hoursAgo: number;
}

// Recently booked destinations data
export const recentlyBookedDestinations: RecentlyBookedDestination[] = [
  { title: 'Meghalaya', hoursAgo: 18 },
  { title: 'Kashmir', hoursAgo: 2 },
  { title: 'Thailand', hoursAgo: 12 },
  { title: 'Goa', hoursAgo: 1 },
  { title: 'Delhi - Agra', hoursAgo: 14 },
  { title: 'Sikkim', hoursAgo: 2 },
  { title: 'Japan', hoursAgo: 6 },
  { title: 'Malaysia', hoursAgo: 18 },
  { title: 'Manali - Kasol', hoursAgo: 5 },
];

