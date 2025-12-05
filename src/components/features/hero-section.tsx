'use client';

export function HeroSection() {
  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070)',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Main Text */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            Plan, book, and explore
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            All with the power of <span className="text-primary">A I.</span>
          </h2>
        </div>

        {/* Search Input Field */}
        <div className="w-full max-w-2xl">
          <input
            type="text"
            placeholder="Where would you like to visit?"
            className="w-full px-6 py-4 rounded-xl bg-white border-2 border-primary text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent text-lg"
          />
        </div>
      </div>

      {/* Trusted Brand Badge - Bottom Right */}
      <div className="absolute bottom-0 right-0 z-10">
        {/* White Container with varying rounded corners */}
        <div 
          className="bg-white px-4 py-3 flex items-center gap-3 shadow-lg"
          style={{
            borderTopLeftRadius: '1.5rem',      // Significantly rounded
            borderTopRightRadius: '0.375rem',   // Slightly rounded
            borderBottomLeftRadius: '0.875rem', // Moderately rounded
            borderBottomRightRadius: '0.875rem', // Moderately rounded (symmetrical)
          }}
        >
          {/* Overlapping Circles */}
          <div className="flex items-center -space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 border border-gray-600" />
            <div className="w-10 h-10 rounded-full bg-gray-300 border border-gray-600" />
            <div className="w-10 h-10 rounded-full bg-gray-300 border border-gray-600" />
            <div className="w-10 h-10 rounded-full bg-gray-300 border border-gray-600" />
          </div>
          {/* Text */}
          <span className="text-sm font-medium text-black whitespace-nowrap">
            Trusted Brand by 1000+ Travelers
          </span>
        </div>
      </div>
    </div>
  );
}

