import { useState, useEffect } from "react";

interface OnboardingProps {
  onGetStarted: () => void;
  onSkip: () => void;
  theme: "dark" | "light";
}

export default function Onboarding({ onGetStarted, onSkip, theme }: OnboardingProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen onboarding
    const hasSeenOnboarding = localStorage.getItem("commit-conquer-onboarding-seen");
    if (!hasSeenOnboarding) {
      setIsVisible(true);
    }
  }, []);

  const handleGetStarted = () => {
    localStorage.setItem("commit-conquer-onboarding-seen", "true");
    setIsVisible(false);
    onGetStarted();
  };

  const handleSkip = () => {
    localStorage.setItem("commit-conquer-onboarding-seen", "true");
    setIsVisible(false);
    onSkip();
  };

  if (!isVisible) return null;

  const isDark = theme === "dark";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleSkip}
        style={{
          position: "fixed",
          inset: 0,
          background: isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.5)",
          zIndex: 999,
          animation: "fadeIn 0.4s ease",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          animation: "scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(20,20,23,0.95) 0%, rgba(12,12,14,0.95) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,251,252,0.95) 100%)",
            border: isDark
              ? "1px solid rgba(124,106,255,0.2)"
              : "1px solid rgba(124,106,255,0.15)",
            borderRadius: 20,
            padding: 48,
            maxWidth: 500,
            width: "calc(100% - 48px)",
            backdropFilter: "blur(10px)",
            boxShadow: isDark
              ? "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(124,106,255,0.1)"
              : "0 20px 60px rgba(0,0,0,0.1), 0 0 40px rgba(124,106,255,0.15)",
            textAlign: "center" as const,
          }}
        >
          {/* Icon */}
          <div
            style={{
              fontSize: 56,
              marginBottom: 24,
              animation: "bounce 2s infinite",
            }}
          >
            🚀
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 16,
              color: isDark ? "#e8e8f0" : "#1a1a1e",
              letterSpacing: "-0.5px",
            }}
          >
            Welcome to Commit Conquer
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: isDark ? "#aaa" : "#666",
              marginBottom: 32,
            }}
          >
            Discover collections, explore products, and shop effortlessly with our modern storefront
            experience.
          </p>

          {/* Features */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 32,
              textAlign: "left" as const,
            }}
          >
            {[
              { icon: "🎨", label: "Browse" },
              { icon: "🔍", label: "Search" },
              { icon: "⭐", label: "Explore" },
              { icon: "🛒", label: "Shop" },
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  padding: 16,
                  borderRadius: 12,
                  background: isDark
                    ? "rgba(124,106,255,0.08)"
                    : "rgba(124,106,255,0.06)",
                  border: isDark
                    ? "1px solid rgba(124,106,255,0.15)"
                    : "1px solid rgba(124,106,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 20 }}>{feature.icon}</span>
                <span style={{ color: isDark ? "#e8e8f0" : "#1a1a1e", fontWeight: 600 }}>
                  {feature.label}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <button
              onClick={handleSkip}
              style={{
                padding: "12px 28px",
                borderRadius: 10,
                border: isDark
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(124,106,255,0.15)",
                background: isDark ? "rgba(255,255,255,0.05)" : "rgba(124,106,255,0.05)",
                color: isDark ? "#aaa" : "#888",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(124,106,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(124,106,255,0.05)";
              }}
            >
              Skip
            </button>
            <button
              onClick={handleGetStarted}
              style={{
                padding: "12px 28px",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(135deg, #7c6aff 0%, #9b88ff 100%)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 16px rgba(124,106,255,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(124,106,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,106,255,0.3)";
              }}
            >
              Get Started →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </>
  );
}
