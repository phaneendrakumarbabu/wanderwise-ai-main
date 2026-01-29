import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    text: 'TravelMate recommended Coorg for my anniversary trip, and it was absolutely perfect! The coffee plantations and misty hills made for the most romantic getaway.',
    destination: 'Coorg'
  },
  {
    name: 'Rahul Verma',
    location: 'Delhi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    text: 'As a solo traveler, I was skeptical about AI recommendations. But the match to Vietnam was spot-on for my budget and adventure interests!',
    destination: 'Vietnam'
  },
  {
    name: 'Ananya Krishnan',
    location: 'Bangalore',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Family trips are always tricky to plan. TravelMate suggested Kerala, and the mix of backwaters, wildlife, and culture kept everyone happy!',
    destination: 'Kerala'
  }
];

export function Testimonials() {
  return (
    <section className="section-padding">
      <div className="container-travel">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Travelers <span className="text-gradient">Love Us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of happy travelers who found their perfect destination with TravelMate AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="glass-card rounded-2xl p-6 relative opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                "{testimonial.text}"
              </p>

              <div className="text-xs text-primary font-medium">
                Traveled to {testimonial.destination}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
