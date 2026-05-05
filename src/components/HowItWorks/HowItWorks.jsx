import { DoorOpen, Film, Heart, Sparkles } from "lucide-react";

const steps = [
    { icon: DoorOpen, title: "Create a room", text: "Spin up a private room and share the code with your partner or friends." },
    { icon: Film, title: "Pick genres", text: "Choose the moods you're in. Comedy, thriller, sci-fi — or surprise me." },
    { icon: Heart, title: "Swipe together", text: "Like or skip movies in real time. Everyone votes from their own phone." },
    { icon: Sparkles, title: "Instant match", text: "When everyone likes the same film, FILMERA lights up. Press play." },
];

const HowItWorks = () => (
    <section id="how" className="container section">
        <div className="section__head--center">
            <p className="section__eyebrow">How it works</p>
            <h2 className="section__title">From "I don't know" to "press play" in 4 steps.</h2>
        </div>
        <div className="card-grid card-grid--4">
            {steps.map(({ icon: Icon, title, text }, i) => (
                <div key={title} className="card how__card">
                    <div className="how__badge">{i + 1}</div>
                    <Icon className="how__icon" />
                    <h3 className="card__title">{title}</h3>
                    <p className="card__text card__text--sm">{text}</p>
                </div>
            ))}
        </div>
    </section>
);
export default HowItWorks;
