import { Gamepad2, Globe, Users2, Zap } from "lucide-react";

const features = [
  { icon: Users2, title: "Rooms for 2 or more", text: "Movie night with your partner, or a group watch party with friends across the world." },
  { icon: Gamepad2, title: "Tinder-style swipes", text: "Gamified discovery that makes choosing as fun as watching." },
  { icon: Zap, title: "Instant matching", text: "Real-time sync. The moment you both like a film, you'll know." },
  { icon: Globe, title: "Powered by TMDB", text: "Thousands of movies with posters, trailers, ratings and where to watch." },
];

const Features = () => (
  <section id="features" className="container section">
    <div className="section__head--left">
      <p className="section__eyebrow">Why FILMERA</p>
      <h2 className="section__title">Built for joint decisions, not solo scrolling.</h2>
    </div>
    <div className="card-grid card-grid--2">
      {features.map(({ icon: Icon, title, text }) => (
        <div key={title} className="card card--hover-accent features__row">
          <div className="features__icon"><Icon /></div>
          <div>
            <h3 className="card__title card__title--tight">{title}</h3>
            <p className="card__text">{text}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
export default Features;
