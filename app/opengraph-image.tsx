import { ImageResponse } from "next/og";

export const alt = "Ibrahima Samake — We build digital products that move businesses forward";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#08090b",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(107,140,255,0.35), transparent 45%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 56px 56px, 56px 56px",
          color: "#f2f4f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#f2f4f7",
              color: "#08090b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            IS
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>Ibrahima Samake</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: 980 }}>
            We build digital products that move businesses forward.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#a3abb8" }}>
            Web · Mobile · Custom software · E-commerce · Cloud & DevOps · AI
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#6b8cff" }}>samibrahima.tech</div>
      </div>
    ),
    size,
  );
}
