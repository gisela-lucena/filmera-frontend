const VARIANTS = new Set(["default", "hero", "glow", "glass"]);
const SIZES = new Set(["sm", "md", "xl"]);

export function Button({ variant = "default", size = "md", className = "", ...props }) {
  const v = VARIANTS.has(variant) ? variant : "default";
  const sz = SIZES.has(size) ? size : "md";
  const cls = ["btn", `btn--${v}`, `btn--${sz}`, className].filter(Boolean).join(" ");
  return <button className={cls} {...props} />;
}
