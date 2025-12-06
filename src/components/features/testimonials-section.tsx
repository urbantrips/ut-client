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
        className="flex items-center flex-shrink-0"
        style={{
          width: '399px',
          height: '108px',
          borderRadius: '30px',
          backgroundColor: isYellowBackground ? '#FFF9E6' : 'white',
          border: isYellowBackground ? 'none' : '1px solid #F5C842',
          padding: '16px',
          gap: '12px',
        }}
      >
        {/* Avatar/Icon */}
        <div
          className="flex-shrink-0"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            backgroundColor: '#F5C842',
          }}
        />
        
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <p className="font-bold text-black text-base leading-tight mb-1">
            Every detail thought of. Highly recommend!
          </p>
          <p className="text-black text-base">
            {testimonial.name} - {testimonial.location}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* First Row - Marquee to Right */}
        <div className="mb-4 overflow-hidden">
          <div className="flex gap-4 animate-marquee-left" style={{ width: 'fit-content' }}>
            {/* First set of cards */}
            {firstRow.map((testimonial, index) => renderCard(testimonial, index, 0))}
            {/* Duplicate set for seamless loop */}
            {firstRow.map((testimonial, index) => renderCard(testimonial, index, 0))}
          </div>
        </div>

        {/* Second Row - Marquee to Left */}
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-marquee-right" style={{ width: 'fit-content' }}>
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

