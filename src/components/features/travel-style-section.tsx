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
    <section className="w-full mt-6 px-4 sm:px-6 lg:px-8">
      <div className="px-20">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-8">
          Select Your Travel Style
        </h2>
        {/* Cards Container */}
        <div className="flex flex-wrap justify-between">
          {travelStyles.map((style) => (
            <div
              key={style.id}
              className="relative flex flex-col items-center justify-between bg-[#FEF9E7] border-primary-200 p-4 cursor-pointer hover:border-primary-400 transition-colors"
              style={{
                width: '180px',
                height: '208px',
                borderRadius: '30px',
                borderWidth: '2px',
                borderStyle: 'solid',
              }}
            >
              {/* Circular Icon Area */}
              <div className="flex-1 flex items-center justify-center w-full">
                <div 
                  className="rounded-full bg-white/80 shadow-sm"
                  style={{
                    width: '115px',
                    height: '115px',
                  }}
                />
              </div>

              {/* Label */}
              <div className="text-base font-semibold text-gray-900">
                {style.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

