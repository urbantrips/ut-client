'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { countries, type Country, getCountryByCode } from '@/lib/countries';
import { cn } from '@/lib/utils';

interface CountryPickerProps {
  value?: string; // Country code (e.g., 'US', 'IN', 'CA')
  onValueChange: (countryCode: string) => void; // Returns country code
  disabled?: boolean;
  className?: string;
}

export function CountryPicker({
  value,
  onValueChange,
  disabled = false,
  className,
}: CountryPickerProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCountry = useMemo(() => {
    return value ? getCountryByCode(value) : countries.find(c => c.code === 'IN') || countries[0];
  }, [value]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) {
      return countries;
    }

    const query = searchQuery.toLowerCase();
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.dialCode.includes(query) ||
        country.code.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSelect = (country: Country) => {
    onValueChange(country.code);
    setOpen(false);
    setSearchQuery('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
        >
          {selectedCountry && (
            <>
              <ReactCountryFlag
                countryCode={selectedCountry.code}
                svg
                style={{
                  width: '20px',
                  height: '15px',
                }}
                title={selectedCountry.name}
              />
              <span>{selectedCountry.dialCode}</span>
            </>
          )}
          <ChevronDown className="h-4 w-4 opacity-50 ml-auto" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            />
          </div>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {filteredCountries.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              No countries found
            </div>
          ) : (
            <div className="p-1">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country)}
                    className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-gray-100',
                    selectedCountry?.code === country.code && 'bg-yellow-50'
                  )}
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  <ReactCountryFlag
                    countryCode={country.code}
                    svg
                    style={{
                      width: '24px',
                      height: '18px',
                    }}
                    title={country.name}
                  />
                  <span className="flex-1 text-left">{country.name}</span>
                  <span className="text-gray-500">{country.dialCode}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

