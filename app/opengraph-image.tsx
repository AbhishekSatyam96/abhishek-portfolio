import { ImageResponse } from "next/og";
import { site, hero } from "@/content";

export const alt = `${site.name} — ${site.role} · ${site.positioning}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated social card — "cryptography rendered as light".
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
          padding: 72,
          backgroundColor: "#07090F",
          backgroundImage:
            "radial-gradient(900px 600px at 12% -10%, rgba(91,91,245,0.55), transparent 60%), radial-gradient(820px 560px at 100% 0%, rgba(139,61,255,0.45), transparent 58%), radial-gradient(820px 620px at 80% 120%, rgba(34,211,238,0.40), transparent 60%), radial-gradient(560px 420px at 0% 120%, rgba(232,76,196,0.30), transparent 62%)",
          fontFamily: "sans-serif",
          color: "#EAEDF5",
        }}
      >
        {/* eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              width: 26,
              height: 26,
              borderRadius: 6,
              transform: "rotate(45deg)",
              background: "linear-gradient(135deg,#7C8CFF,#22D3EE)",
            }}
          />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#22D3EE",
            }}
          >
            Post-quantum cryptography
          </div>
        </div>

        {/* name + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 116,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1,
              backgroundImage: "linear-gradient(100deg,#EAEDF5,#7C8CFF 60%,#22D3EE)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {site.name}
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 38, color: "#EAEDF5" }}>
            {site.role} · {site.positioning}
          </div>
        </div>

        {/* stats row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {hero.stats.map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "18px 24px",
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#7C8CFF" }}>
                {s.value}
              </div>
              <div style={{ display: "flex", marginTop: 4, fontSize: 19, color: "#9AA6BD" }}>
                {s.label}
              </div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              fontSize: 24,
              color: "#9AA6BD",
            }}
          >
            {site.location}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
