type Feature = {
  title: string;
  description: string;
  icon: string;
};

const features: Feature[] = [
  {
    title: "Signal System",
    description: "A restrained dial language turns timekeeping into a clear instrument read.",
    icon: "◈",
  },
  {
    title: "Blueprinted Case",
    description: "Brushed steel surfaces meet exact edges shaped for a calm, technical presence.",
    icon: "□",
  },
  {
    title: "Mechanical Core",
    description: "The movement is presented as the working heart rather than a hidden detail.",
    icon: "◌",
  },
  {
    title: "Balanced Bracelet",
    description: "Articulated links carry the weight of the case evenly across the wrist.",
    icon: "⌁",
  },
  {
    title: "Prototype 001",
    description: "A limited first expression, marked with the identity of its original system.",
    icon: "01",
  },
  {
    title: "Engineered in Vietnam",
    description: "Local design and mechanical ambition meet in a watch made to be examined.",
    icon: "＋",
  },
];

export default function FeaturesSection() {
  return (
    <section className="content-section features-section" id="features" aria-labelledby="features-title">
      <p className="eyebrow">Crafted without compromise</p>
      <h2 id="features-title">A system with nothing to hide.</h2>
      <div className="feature-grid">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <span className="feature-icon" aria-hidden="true">
              {feature.icon}
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
