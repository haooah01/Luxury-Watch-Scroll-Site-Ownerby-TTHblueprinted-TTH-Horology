type PricingTier = {
  label: string;
  recommendedPrice: string;
  options: string[];
};

const pricingTiers: PricingTier[] = [
  {
    label: "Phiên bản quốc tế · International",
    recommendedPrice: "$1,199 USD",
    options: ["$799 (source code only)", "$1,999–$2,499 (custom branding)"],
  },
  {
    label: "Phiên bản Việt Nam · Vietnam",
    recommendedPrice: "30.000.000 VNĐ",
    options: [
      "20.000.000 VNĐ (bàn giao mã nguồn)",
      "50.000.000–65.000.000 VNĐ (tùy chỉnh theo thương hiệu)",
    ],
  },
];

export default function ProductPricing() {
  return (
    <section
      className="content-section product-pricing-section"
      id="product-pricing"
      aria-labelledby="product-pricing-title"
    >
      <p className="eyebrow">Pricing reference · Website service</p>
      <h2 id="product-pricing-title">Định giá sản phẩm</h2>
      <p className="product-pricing-note">
        Đây là định giá tham khảo cho website trải nghiệm đồng hồ cao cấp, không
        phải giá của chiếc đồng hồ vật lý. This is reference pricing for a luxury
        watch experience website service, not the price of a physical watch.
      </p>

      <div className="product-pricing-grid">
        {pricingTiers.map((tier) => (
          <article className="product-pricing-card" key={tier.label}>
            <h3>{tier.label}</h3>
            <p className="product-pricing-recommended">
              Giá đề xuất · Recommended: <strong>{tier.recommendedPrice}</strong>
            </p>
            <ul className="product-pricing-options">
              {tier.options.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
