export const HeroSection = () => {
  return (
    <div className="relative">
      <div className="bg-cover bg-center bg-no-repeat min-h-[500px] rounded-3xl inverted-radius relative overflow-hidden" style={{ backgroundImage: 'url(https://picsum.photos/1920/1080?random=1)' }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] px-4 py-12">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
              Plan, book, and explore
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              All with the power of <span className="text-[rgb(var(--primary))]">AI</span>.
            </h2>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-2xl">
            <input
              type="text"
              placeholder="Where would you like to visit?"
              className="w-full px-6 py-4 rounded-xl border-4 border-[rgb(var(--primary))] text-gray-900 placeholder-black placeholder:italic focus:outline-none focus:ring-4 focus:ring-[rgb(var(--primary))]/30 text-lg"
            />
          </div>
        </div>

        {/* Trusted Brand Badge - Positioned in inverted border space */}
      </div>
      <div className="absolute bottom-1 right-1 flex  ]">
        <div className="flex -space-x-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"
            />
          ))}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">Trusted Brand</span>
          <span className="text-xs text-gray-600">by 1000+ Travelers</span>
        </div>
      </div>
    </div>
  );
};