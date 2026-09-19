type Specification = {
  label: string;
  value: string;
};

const specifications: Specification[] = [
  { label: "Reference", value: "THH-SIGNAL-V1" },
  { label: "Edition", value: "Limited Prototype 001" },
  { label: "Case", value: "Brushed 316L stainless steel" },
  { label: "Dial", value: "Graphite black with blue signal grid" },
  { label: "Movement", value: "Automatic mechanical calibre" },
  { label: "Display", value: "Hours, minutes and small seconds" },
  { label: "Crystal", value: "Domed sapphire" },
  { label: "Bracelet", value: "Integrated articulated steel links" },
  { label: "Water resistance", value: "10 ATM" },
  { label: "Origin", value: "Engineered in Vietnam" },
];

export default function SpecsSection() {
  return (
    <section className="content-section specs-section" aria-labelledby="specs-title">
      <p className="eyebrow">Technical specifications</p>
      <h2 id="specs-title">The architecture of precision.</h2>
      <dl className="spec-list">
        {specifications.map((specification) => (
          <div className="spec-row" key={specification.label}>
            <dt>{specification.label}</dt>
            <dd>{specification.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
