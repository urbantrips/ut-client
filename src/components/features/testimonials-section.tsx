export function TestimonialsSection() {
  const testimonials = [
    { name: "Rohit", location: "Mumbai" },
    { name: "Rohit", location: "Mumbai" },
    { name: "Rohit", location: "Mumbai" },
    { name: "Rohit", location: "Mumbai" },
    { name: "Rohit", location: "Mumbai" },
    { name: "Rohit", location: "Mumbai" },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-4 justify-items-center">
          {testimonials.map((testimonial, index) => {
            const isYellowBackground = index % 2 === 0;
            
            return (
              <div
                key={index}
                className="flex items-center"
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
          })}
        </div>
      </div>
    </section>
  );
}

