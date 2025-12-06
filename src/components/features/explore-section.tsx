interface ExploreSectionProps {
  title: string;
  subtitle: string;
  cardCount?: number;
}

export function ExploreSection({ title, subtitle, cardCount = 4 }: ExploreSectionProps) {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 px-2">
            {subtitle}
          </p>
        </div>

        <div className="flex justify-between">
          {Array.from({ length: cardCount }).map((_, index) => (
            <div
              key={index}
              className="cursor-pointer group"
            >
              <div
                className="w-[246px] h-[310px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4 overflow-hidden relative shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
        
              >
                {/* Image placeholder with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
                />
              </div>
              <p
                className="text-sm sm:text-base font-bold text-black text-center group-hover:text-primary transition-colors duration-300"
              >
                Bali
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

