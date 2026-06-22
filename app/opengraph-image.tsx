import { ImageResponse } from "next/og";

export const alt = "tattoomachinesetup.com — tattoo machine setup engine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social preview: high-contrast, readable at small sizes in Discord / iOS shares. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(145deg, #0a0c10 0%, #11141b 55%, #0d1a22 100%)",
          color: "#f8fafc",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: "0.06em",
            color: "#7eedff",
            marginBottom: 20,
          }}
        >
          DIALEDIN
        </div>
        <div style={{ fontSize: 38, fontWeight: 650, lineHeight: 1.25, maxWidth: 900 }}>
          Tattoo machine setup engine — stroke, voltage, and style baselines in one accountable
          roadmap.
        </div>
        <div style={{ marginTop: 36, fontSize: 24, color: "#94a3b8", fontWeight: 600 }}>
          Disciplined craft · Technical accountability
        </div>
      </div>
    ),
    { ...size },
  );
}
