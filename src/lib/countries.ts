export interface Country {
  name: string;
  flag: string;
  dialCode: string;
  code: string;
}

export const countries: Country[] = [
  { name: 'India', flag: '🇮🇳', dialCode: '+91', code: 'IN' },
  { name: 'United States', flag: '🇺🇸', dialCode: '+1', code: 'US' },
  { name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44', code: 'GB' },
  { name: 'Canada', flag: '🇨🇦', dialCode: '+1', code: 'CA' },
  { name: 'Australia', flag: '🇦🇺', dialCode: '+61', code: 'AU' },
  { name: 'Germany', flag: '🇩🇪', dialCode: '+49', code: 'DE' },
  { name: 'France', flag: '🇫🇷', dialCode: '+33', code: 'FR' },
  { name: 'Italy', flag: '🇮🇹', dialCode: '+39', code: 'IT' },
  { name: 'Spain', flag: '🇪🇸', dialCode: '+34', code: 'ES' },
  { name: 'Japan', flag: '🇯🇵', dialCode: '+81', code: 'JP' },
  { name: 'China', flag: '🇨🇳', dialCode: '+86', code: 'CN' },
  { name: 'South Korea', flag: '🇰🇷', dialCode: '+82', code: 'KR' },
  { name: 'Singapore', flag: '🇸🇬', dialCode: '+65', code: 'SG' },
  { name: 'Malaysia', flag: '🇲🇾', dialCode: '+60', code: 'MY' },
  { name: 'Thailand', flag: '🇹🇭', dialCode: '+66', code: 'TH' },
  { name: 'Indonesia', flag: '🇮🇩', dialCode: '+62', code: 'ID' },
  { name: 'Philippines', flag: '🇵🇭', dialCode: '+63', code: 'PH' },
  { name: 'Vietnam', flag: '🇻🇳', dialCode: '+84', code: 'VN' },
  { name: 'United Arab Emirates', flag: '🇦🇪', dialCode: '+971', code: 'AE' },
  { name: 'Saudi Arabia', flag: '🇸🇦', dialCode: '+966', code: 'SA' },
  { name: 'Qatar', flag: '🇶🇦', dialCode: '+974', code: 'QA' },
  { name: 'Kuwait', flag: '🇰🇼', dialCode: '+965', code: 'KW' },
  { name: 'Bahrain', flag: '🇧🇭', dialCode: '+973', code: 'BH' },
  { name: 'Oman', flag: '🇴🇲', dialCode: '+968', code: 'OM' },
  { name: 'Israel', flag: '🇮🇱', dialCode: '+972', code: 'IL' },
  { name: 'Turkey', flag: '🇹🇷', dialCode: '+90', code: 'TR' },
  { name: 'Russia', flag: '🇷🇺', dialCode: '+7', code: 'RU' },
  { name: 'Brazil', flag: '🇧🇷', dialCode: '+55', code: 'BR' },
  { name: 'Mexico', flag: '🇲🇽', dialCode: '+52', code: 'MX' },
  { name: 'Argentina', flag: '🇦🇷', dialCode: '+54', code: 'AR' },
  { name: 'South Africa', flag: '🇿🇦', dialCode: '+27', code: 'ZA' },
  { name: 'Egypt', flag: '🇪🇬', dialCode: '+20', code: 'EG' },
  { name: 'Nigeria', flag: '🇳🇬', dialCode: '+234', code: 'NG' },
  { name: 'Kenya', flag: '🇰🇪', dialCode: '+254', code: 'KE' },
  { name: 'New Zealand', flag: '🇳🇿', dialCode: '+64', code: 'NZ' },
  { name: 'Switzerland', flag: '🇨🇭', dialCode: '+41', code: 'CH' },
  { name: 'Netherlands', flag: '🇳🇱', dialCode: '+31', code: 'NL' },
  { name: 'Belgium', flag: '🇧🇪', dialCode: '+32', code: 'BE' },
  { name: 'Sweden', flag: '🇸🇪', dialCode: '+46', code: 'SE' },
  { name: 'Norway', flag: '🇳🇴', dialCode: '+47', code: 'NO' },
  { name: 'Denmark', flag: '🇩🇰', dialCode: '+45', code: 'DK' },
  { name: 'Finland', flag: '🇫🇮', dialCode: '+358', code: 'FI' },
  { name: 'Poland', flag: '🇵🇱', dialCode: '+48', code: 'PL' },
  { name: 'Portugal', flag: '🇵🇹', dialCode: '+351', code: 'PT' },
  { name: 'Greece', flag: '🇬🇷', dialCode: '+30', code: 'GR' },
  { name: 'Ireland', flag: '🇮🇪', dialCode: '+353', code: 'IE' },
  { name: 'Austria', flag: '🇦🇹', dialCode: '+43', code: 'AT' },
  { name: 'Czech Republic', flag: '🇨🇿', dialCode: '+420', code: 'CZ' },
  { name: 'Hungary', flag: '🇭🇺', dialCode: '+36', code: 'HU' },
  { name: 'Romania', flag: '🇷🇴', dialCode: '+40', code: 'RO' },
  { name: 'Bangladesh', flag: '🇧🇩', dialCode: '+880', code: 'BD' },
  { name: 'Pakistan', flag: '🇵🇰', dialCode: '+92', code: 'PK' },
  { name: 'Sri Lanka', flag: '🇱🇰', dialCode: '+94', code: 'LK' },
  { name: 'Nepal', flag: '🇳🇵', dialCode: '+977', code: 'NP' },
  { name: 'Bhutan', flag: '🇧🇹', dialCode: '+975', code: 'BT' },
  { name: 'Myanmar', flag: '🇲🇲', dialCode: '+95', code: 'MM' },
  { name: 'Cambodia', flag: '🇰🇭', dialCode: '+855', code: 'KH' },
  { name: 'Laos', flag: '🇱🇦', dialCode: '+856', code: 'LA' },
  { name: 'Maldives', flag: '🇲🇻', dialCode: '+960', code: 'MV' },
  { name: 'Mauritius', flag: '🇲🇺', dialCode: '+230', code: 'MU' },
  { name: 'Seychelles', flag: '🇸🇨', dialCode: '+248', code: 'SC' },
].sort((a, b) => a.name.localeCompare(b.name));

export const getCountryByDialCode = (dialCode: string): Country | undefined => {
  return countries.find((country) => country.dialCode === dialCode);
};

export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find((country) => country.code === code);
};

