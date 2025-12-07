export function TestimonialsSection() {
  const testimonials = [
    { name: "Rohit", location: "Mumbai" },
    { name: "Rohit", location: "Mumbai" },
    { name: "Rohit", location: "Mumbai" },
    { name: "Rohit", location: "Mumbai" },
    { name: "Rohit", location: "Mumbai" },
    { name: "Rohit", location: "Mumbai" },
  ];

  const firstRow = testimonials.slice(0, 3);
  const secondRow = testimonials.slice(3, 6);

  const renderCard = (testimonial: { name: string; location: string }, index: number, rowIndex: number) => {
    const isYellowBackground = (rowIndex * 3 + index) % 2 === 0;
    
    return (
      <div
        key={`${rowIndex}-${index}`}
        className="flex items-center flex-shrink-0 w-[193px] h-[70px] md:w-[399px] md:h-[108px] rounded-[15px] md:rounded-[30px] p-2 md:p-4 gap-2 md:gap-3"
        style={{
          backgroundColor: isYellowBackground ? '#FFF9E6' : 'white',
          border: isYellowBackground ? 'none' : '1px solid #F5C842',
        }}
      >
        {/* Avatar/Icon */}
        <div
          className="flex-shrink-0 w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-[8px] md:rounded-[12px]"
          style={{
            backgroundColor: '#F5C842',
          }}
        />
        
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <p className="font-bold text-black text-[10px] md:text-base leading-tight mb-0.5 md:mb-1">
            Every detail thought of. Highly recommend!
          </p>
          <p className="text-black text-[10px] md:text-base">
            {testimonial.name} - {testimonial.location}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="py-6 sm:py-12">
          What our Customer&apos;s say?
        </h2>
        
        {/* First Row - Marquee to Right */}
        <div className="mb-2 md:mb-4 overflow-hidden">
          <div className="flex gap-2 md:gap-4 animate-marquee-left" style={{ width: 'fit-content' }}>
            {/* First set of cards */}
            {firstRow.map((testimonial, index) => renderCard(testimonial, index, 0))}
            {/* Duplicate set for seamless loop */}
            {firstRow.map((testimonial, index) => renderCard(testimonial, index, 0))}
          </div>
        </div>

        {/* Second Row - Marquee to Left */}
        <div className="overflow-hidden">
          <div className="flex gap-2 md:gap-4 animate-marquee-right" style={{ width: 'fit-content' }}>
            {/* First set of cards */}
            {secondRow.map((testimonial, index) => renderCard(testimonial, index, 1))}
            {/* Duplicate set for seamless loop */}
            {secondRow.map((testimonial, index) => renderCard(testimonial, index, 1))}
          </div>
        </div>
      </div>
    </section>
  );
}

