import React, { useState } from "react";

const API_BASE = (import.meta.env.VITE_API_BASE || "http://localhost:5000/api").replace(/\/$/, "");
const API_BASE_FALLBACKS = (() => {
  const bases = new Set([API_BASE, "http://localhost:5000/api", "http://localhost:7000/api"]);
  try {
    const url = new URL(API_BASE);
    const isLocalhost = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (isLocalhost) {
      const port = Number(url.port);
      if (Number.isFinite(port) && port > 0) {
        for (let p = port; p < port + 10; p += 1) {
          bases.add(`${url.protocol}//${url.hostname}:${p}/api`);
        }
      }
    }
  } catch (e) {
    // ignore invalid base
  }
  return Array.from(bases);
})();

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    try {
      const trimmed = String(mobile || "").trim();
      if (!trimmed) {
        setMessage("Please enter your mobile number");
        return;
      }
      if (!String(code || "").trim()) {
        setMessage("Please enter any code");
        return;
      }

      setIsLoading(true);
      let lastError = "Login failed";
      for (const base of API_BASE_FALLBACKS) {
        const res = await fetch(`${base}/auth/demo/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: trimmed, code: String(code || "").trim() })
        });
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          lastError = "Server returned HTML. Check API base/port.";
          continue;
        }
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("demo_token", data.token);
          onLoginSuccess && onLoginSuccess(data.user, data.token);
          onClose();
          return;
        }
        lastError = data.error || "Login failed";
      }
      setMessage(lastError);
    } catch (e) {
      setMessage(e?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="position-fixed start-0 w-100"
      style={{
        top: "72px",
        height: "calc(100vh - 72px)",
        zIndex: 2000,
        backgroundColor: "rgba(0,0,0,0.35)"
      }}
    >
      <div className="d-flex justify-content-end h-100 p-2 p-md-3">
        <div
          className="d-flex flex-column bg-white rounded-3 overflow-hidden"
          style={{
            width: "100%",
            maxWidth: "460px",
            height: "100%",
            boxShadow: "0 12px 30px rgba(0,0,0,0.2)"
          }}
        >
          <div className="position-relative d-flex align-items-center justify-content-center p-3 border-bottom">
            <h5 className="mb-0 text-center">Login</h5>
            <button
              className="btn btn-sm btn-light position-absolute end-0 me-3"
              onClick={onClose}
            >
              x
            </button>
          </div>

          <div className="p-3 flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
            <>
              <label className="form-label text-start w-100" style={{ maxWidth: "280px" }}>
                Mobile number
              </label>

              <input
                className="form-control mb-3"
                style={{ maxWidth: "280px" }}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter any mobile number"
              />

              <input
                className="form-control mb-3"
                style={{ maxWidth: "280px" }}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter any code"
              />

              <button
                className="btn btn-primary w-100"
                style={{ maxWidth: "280px" }}
                onClick={login}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </>

            {message && <div className="mt-3 text-muted small">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
