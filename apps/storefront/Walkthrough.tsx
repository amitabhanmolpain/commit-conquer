import { useState, useEffect, useRef } from "react";

interface WalkthroughProps {
  isActive: boolean;
  onFinish: () => void;
  theme: "dark" | "light";
}

interface Step {
  target: string;
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right";
}

const STEPS: Step[] = [
  {
    target: "[data-tour='categories']",
    title: "Browse by Category",
    description: "Explore products by category. Click any category to filter the product grid.",
    position: "bottom",
  },
  {
    target: "[data-tour='search']",
    title: "Search Products",
    description: "Instantly search for products by name or category.",
    position: "bottom",
  },
  {
    target: "[data-tour='sort']",
    title: "Sort Products",
    description: "Sort products by newest, price, or rating.",
    position: "bottom",
  },
  {
    target: "[data-tour='products']",
    title: "Explore Products",
    description: "Click any product to view details, images, and add to cart.",
    position: "top",
  },
];

export default function Walkthrough({ isActive, onFinish, theme }: WalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "dark";

  useEffect(() => {
    if (!isActive) return;

    const updateHighlight = () => {
      const step = STEPS[currentStep];
      const element = document.querySelector(step.target);
      if (element) {
        // Ensure element is in viewport
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Wait for scroll to complete before getting bounding rect
        setTimeout(() => {
          const rect = element.getBoundingClientRect();
          setHighlightRect(rect);
        }, 100);
      }
    };

    updateHighlight();
    window.addEventListener("resize", updateHighlight);
    return () => window.removeEventListener("resize", updateHighlight);
  }, [currentStep, isActive]);

  if (!isActive) return null;

  const step = STEPS[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      handleFinish();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem("commit-conquer-walkthrough-done", "true");
    onFinish();
  };

  return (
    <>
      {/* Backdrop with highlight cutout */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.5)",
          zIndex: 1001,
          pointerEvents: "none",
        }}
      />

      {/* Highlight box */}
      {highlightRect && (
        <div
          style={{
            position: "fixed",
            top: highlightRect.top - 8,
            left: highlightRect.left - 8,
            width: highlightRect.width + 16,
            height: highlightRect.height + 16,
            border: "2px solid #7c6aff",
            borderRadius: 12,
            boxShadow: "0 0 30px rgba(124,106,255,0.4), inset 0 0 30px rgba(124,106,255,0.1)",
            zIndex: 1002,
            pointerEvents: "none",
            animation: "pulse 2s infinite",
          }}
        />
      )}

      {/* Tooltip */}
      {highlightRect && (
        <div
          ref={tooltipRef}
          style={{
            position: "fixed",
            top: (() => {
              // Smart positioning based on element and viewport
              const tooltipHeight = 240;
              const viewportHeight = window.innerHeight;
              const spaceBelow = viewportHeight - highlightRect.bottom;
              const spaceAbove = highlightRect.top;
              
              // If there's enough space below, place tooltip below
              if (spaceBelow > tooltipHeight + 40) {
                return highlightRect.bottom + 20;
              }
              // If there's enough space above, place tooltip above
              if (spaceAbove > tooltipHeight + 40) {
                return highlightRect.top - tooltipHeight - 20;
              }
              // Otherwise, center vertically
              return Math.max(20, highlightRect.top + highlightRect.height / 2 - tooltipHeight / 2);
            })(),
            left: (() => {
              // Smart horizontal positioning
              const tooltipWidth = 320;
              const centerX = highlightRect.left + highlightRect.width / 2;
              const idealLeft = centerX - tooltipWidth / 2;
              
              // Keep within viewport with 20px padding
              const minLeft = 20;
              const maxLeft = window.innerWidth - tooltipWidth - 20;
              
              return Math.max(minLeft, Math.min(idealLeft, maxLeft));
            })(),
            zIndex: 1003,
            animation: "slideIn 0.3s ease",
          }}
        >
          <div
            style={{
              width: 320,
              background: isDark
                ? "linear-gradient(135deg, rgba(20,20,23,0.98) 0%, rgba(12,12,14,0.98) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(250,251,252,0.98) 100%)",
              border: isDark
                ? "1px solid rgba(124,106,255,0.3)"
                : "1px solid rgba(124,106,255,0.2)",
              borderRadius: 12,
              padding: 20,
              backdropFilter: "blur(10px)",
              boxShadow: isDark
                ? "0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(124,106,255,0.1)"
                : "0 10px 40px rgba(0,0,0,0.1), 0 0 30px rgba(124,106,255,0.15)",
            }}
          >
            {/* Title */}
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: isDark ? "#e8e8f0" : "#1a1a1e",
                marginBottom: 8,
              }}
            >
              {step.title}
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.5,
                color: isDark ? "#aaa" : "#666",
                marginBottom: 16,
              }}
            >
              {step.description}
            </p>

            {/* Step counter */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 4,
                }}
              >
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: i === currentStep
                        ? "#7c6aff"
                        : i < currentStep
                        ? "#7c6aff"
                        : isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(124,106,255,0.1)",
                      transition: "all 0.2s ease",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: 12, color: isDark ? "#666" : "#aaa" }}>
                {currentStep + 1} of {STEPS.length}
              </span>
            </div>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: 8,
              }}
            >
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 8,
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(124,106,255,0.15)",
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(124,106,255,0.05)",
                  color: isDark ? (currentStep === 0 ? "#444" : "#aaa") : (currentStep === 0 ? "#ddd" : "#888"),
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: currentStep === 0 ? "not-allowed" : "pointer",
                  opacity: currentStep === 0 ? 0.5 : 1,
                  transition: "all 0.2s ease",
                }}
              >
                ← Back
              </button>

              <button
                onClick={handleFinish}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 8,
                  border: "none",
                  background: isDark ? "rgba(255,255,255,0.1)" : "rgba(124,106,255,0.1)",
                  color: isDark ? "#aaa" : "#888",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDark
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(124,106,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isDark
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(124,106,255,0.1)";
                }}
              >
                Skip
              </button>

              <button
                onClick={handleNext}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 8,
                  border: "none",
                  background: "linear-gradient(135deg, #7c6aff 0%, #9b88ff 100%)",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(124,106,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {isLastStep ? "Done" : "Next"} →
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 30px rgba(124, 106, 255, 0.4), inset 0 0 30px rgba(124, 106, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 50px rgba(124, 106, 255, 0.6), inset 0 0 30px rgba(124, 106, 255, 0.15);
          }
        }
      `}</style>
    </>
  );
}
