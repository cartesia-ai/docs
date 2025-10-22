export const StuckWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        getComputedStyle(document.documentElement).getPropertyValue("--background").includes("0, 0, 0");
      setIsDark(isDarkMode);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999 }}>
      {isOpen && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: -1 }} onClick={() => setIsOpen(false)} />
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              right: "0",
              backgroundColor: isDark ? "#000000" : "#ffffff",
              color: isDark ? "#ffffff" : "#000000",
              border: `1px solid ${isDark ? "#333333" : "#e5e7eb"}`,
              borderRadius: "12px",
              padding: "16px",
              width: "280px",
              maxWidth: "calc(100vw - 48px)",
              boxShadow: isDark
                ? "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
                : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              fontSize: "14px",
              lineHeight: "1.5",
              fontWeight: "400",
            }}
          >
            <div
              style={{
                color: isDark ? "#9ca3af" : "#6b7280",
                marginBottom: "12px",
                lineHeight: "1.4",
              }}
            >
              This is a new release and we're here to help.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <a
                href="mailto:support@cartesia.ai"
                style={{
                  color: isDark ? "#ffffff" : "#000000",
                  textDecoration: "none",
                  padding: "8px 10px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = isDark ? "rgba(96, 165, 250, 0.1)" : "rgba(59, 130, 246, 0.1)")
                }
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
              >
                <span style={{ pointerEvents: "none" }}>📧</span>
                <span style={{ pointerEvents: "none" }}>Email support@cartesia.ai</span>
              </a>
              <a
                href="https://github.com/cartesia-ai/line/issues"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: isDark ? "#ffffff" : "#000000",
                  textDecoration: "none",
                  padding: "8px 10px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = isDark ? "rgba(96, 165, 250, 0.1)" : "rgba(59, 130, 246, 0.1)")
                }
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
              >
                <span style={{ pointerEvents: "none" }}>🐛</span>
                <span style={{ pointerEvents: "none" }}>Open an issue on GitHub</span>
              </a>
            </div>
          </div>
        </>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: isDark ? "#1a1a1a" : "#f9f9f9",
          color: isDark ? "#ffffff" : "#000000",
          border: `1px solid ${isDark ? "#333333" : "#d1d5db"}`,
          borderRadius: "8px",
          padding: "12px 24px",
          fontSize: "14px",
          fontWeight: "500",
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          cursor: "pointer",
          boxShadow: isDark
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          transition: "all 0.2s ease",
          lineHeight: "1.4",
          letterSpacing: "-0.01em",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>🚨</span>
          <span>Did you get stuck?</span>
        </span>
      </button>
    </div>
  );
};
