'use client';

const travelStyles = [
  { id: 1, name: 'Romantic' },
  { id: 2, name: 'Beach' },
  { id: 3, name: 'Adventure' },
  { id: 4, name: 'Heritage' },
  { id: 5, name: 'Romantic' },
];

export function TravelStyleSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <div className="lg:px-20 sm:px-10 md:px-10">
        <h2 className="py-6 sm:py-12 text-left">
          Select Your Travel Style
        </h2>
        {/* Cards Container */}
        <div className="flex overflow-x-auto gap-3 sm:gap-4 md:flex-wrap md:gap-4 lg:justify-between lg:gap-0 scrollbar-hide">
          {travelStyles.map((style) => (
            <div
              key={style.id}
              className="relative flex flex-col items-center justify-between bg-primary-50 border-2 border-primary-200 p-4 cursor-pointer hover:border-primary-400 transition-colors w-[83px] h-[95px] sm:w-[83px] sm:h-[95px] md:w-[180px] md:h-[208px] lg:w-[180px] lg:h-[208px] rounded-[15px] flex-shrink-0"
            >
              {/* Circular Icon Area */}
              <div className="flex-1 flex items-center justify-center w-full">
                <div 
                  className="rounded-full bg-white/80 shadow-sm w-[49px] h-[46px] sm:w-[49px] sm:h-[46px] md:w-[100px] md:h-[100px] lg:w-[115px] lg:h-[115px]"
                />
              </div>

              {/* Label */}
              <div className="text-[10px] sm:text-[10px] md:text-base font-semibold text-gray-900">
                {style.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

