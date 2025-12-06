interface ExploreSectionProps {
  title: string;
  subtitle: string;
  cardCount?: number;
}

export function ExploreSection({ title, subtitle, cardCount = 4 }: ExploreSectionProps) {
  return (
    <section className="w-full px-4 sm:px-6 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-6 sm:py-12 md:py-10">
          <h2 className="mb-4">
            {title}
          </h2>
          <p>
            {subtitle}
          </p>
        </div>

        <div className="flex overflow-x-auto gap-3 sm:gap-4 md:flex md:justify-center lg:justify-between lg:gap-0 scrollbar-hide">
          {Array.from({ length: cardCount }).map((_, index) => (
            <div
              key={index}
              className={`cursor-pointer group flex-shrink-0 ${index < cardCount - 1 ? 'md:mr-4' : ''}`}
            >
              <div
                className="w-[180px] h-[230px] sm:w-[120px] sm:h-[205px] md:w-[220px] md:h-[280px] lg:w-[246px] lg:h-[310px] bg-gradient-to-br from-gray-200 to-gray-300 mb-4 overflow-hidden relative shadow-lg transition-shadow duration-300 rounded-[15px] sm:rounded-[30px] md:rounded-[25px]"
              >
                {/* Image placeholder with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
                />
              </div>
              <p
                className="text-sm sm:text-base md:text-[15px] font-bold text-black text-center group-hover:text-primary transition-colors duration-300"
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

