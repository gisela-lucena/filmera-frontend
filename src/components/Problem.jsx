import { Clock, Frown, Users } from "lucide-react";

const items = [
  { icon: Frown, title: "Endless scrolling", text: "Hours wasted browsing thumbnails without ever pressing play." },
  { icon: Users, title: "No collaboration", text: "Streaming apps were built for one. Watching together shouldn't feel solo." },
  { icon: Clock, title: "Movie night ruined", text: "By the time you decide, it's too late to start anything good." },
];

const Problem = () => (
  <section className="container section">
    <div className="section__head--left">
      <p className="section__eyebrow">The problem</p>
      <h2 className="section__title">Picking a movie shouldn't take longer than the movie.</h2>
    </div>
    <div className="card-grid card-grid--3">
      {items.map(({ icon: Icon, title, text }) => (
        <div key={title} className="card card--hover-lift">
          <div className="card__icon-box"><Icon /></div>
          <h3 className="card__title">{title}</h3>
          <p className="card__text">{text}</p>
        </div>
      ))}
    </div>
  </section>
);
export default Problem;
