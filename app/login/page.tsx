"use client";

import { useActionState } from "react";
import { signIn } from "@/actions/auth";
import Image from "next/image";

export default function LoginPage() {
  const [state, action, pending] = useActionState(signIn, null);

  return (
    <div className="login-root">
      {/* Background layer */}
      <div className="login-bg">
        <Image
          src="/image/Image_BG.JPG"
          alt="Bali background"
          fill
          className="login-bg-img"
          priority
        />
        <div className="login-bg-overlay" />
        {/* Ornamen dekoratif */}
        <div className="login-ornament login-ornament-top" />
        <div className="login-ornament login-ornament-bottom" />
      </div>

      {/* Main content */}
      <div className="login-content">
        {/* Card */}
        <div className="login-card">
          {/* Logo / Brand */}
          <div className="login-brand">
            <div className="login-logo-ring">
              <Image
                src="/image/logo_STT.jpg"
                alt="Logo STT Candra Sedana"
                width={64}
                height={64}
                className="login-logo-img"
              />
            </div>
            <div className="login-brand-text">
              <p className="login-brand-sub">SEKAA TRUNA TRUNI</p>
              <h1 className="login-brand-title">
                <span className="login-brand-candra">CANDRA </span>
                <span className="login-brand-sedana">SEDANA</span>
              </h1>
              <p className="login-brand-loc">Kutuh Kaja · Petulu · Ubud · Bali</p>
            </div>
          </div>

          {/* Divider */}
          <div className="login-divider">
            <span className="login-divider-line" />
            <span className="login-divider-symbol">✦</span>
            <span className="login-divider-line" />
          </div>

          {/* Title */}
          <div className="login-header">
            <h2 className="login-title">Admin Panel</h2>
            <p className="login-subtitle">Masuk untuk mengelola website</p>
          </div>

          {/* Error message */}
          {state?.error && (
            <div className="login-error" role="alert">
              <span className="login-error-icon">⚠</span>
              {state.error}
            </div>
          )}

          {/* Form */}
          <form action={action} className="login-form" id="login-form">
            <div className="login-field">
              <label htmlFor="email" className="login-label">
                Email
              </label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">✉</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="admin@example.com"
                  className="login-input"
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="password" className="login-label">
                Password
              </label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">🔒</span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="login-input"
                />
              </div>
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              disabled={pending}
              className="login-btn"
            >
              {pending ? (
                <span className="login-btn-loading">
                  <span className="login-spinner" />
                  Memproses...
                </span>
              ) : (
                "Masuk ke Dashboard"
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="login-note">
            Hanya pengurus yang berwenang dapat mengakses panel ini.
          </p>
        </div>
      </div>

      <style>{`
        .login-root {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #0a0a0a;
          font-family: var(--font-poppins, 'Poppins'), sans-serif;
        }

        /* --- Background --- */
        .login-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .login-bg-img {
          object-fit: cover;
          object-position: center;
          filter: brightness(0.35) saturate(1.2);
        }
        .login-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(10, 5, 0, 0.82) 0%,
            rgba(80, 30, 0, 0.55) 50%,
            rgba(10, 5, 0, 0.88) 100%
          );
        }

        /* --- Ornamen dekoratif --- */
        .login-ornament {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          pointer-events: none;
        }
        .login-ornament-top {
          top: -120px;
          right: -80px;
          background: radial-gradient(circle, rgba(184,149,84,0.18) 0%, transparent 70%);
          animation: ornamentPulse 6s ease-in-out infinite;
        }
        .login-ornament-bottom {
          bottom: -120px;
          left: -80px;
          background: radial-gradient(circle, rgba(184,149,84,0.12) 0%, transparent 70%);
          animation: ornamentPulse 6s ease-in-out infinite 3s;
        }
        @keyframes ornamentPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.7; }
        }

        /* --- Content wrapper --- */
        .login-content {
          position: relative;
          z-index: 10;
          width: 100%;
          padding: 1.5rem;
          display: flex;
          justify-content: center;
          animation: fadeInUp 0.6s ease forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* --- Card --- */
        .login-card {
          width: 100%;
          max-width: 440px;
          background: rgba(18, 12, 4, 0.75);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(184, 149, 84, 0.25);
          border-radius: 24px;
          padding: 2.5rem 2rem;
          box-shadow:
            0 0 0 1px rgba(184,149,84,0.08),
            0 32px 80px -20px rgba(0,0,0,0.7),
            inset 0 1px 0 rgba(255,255,255,0.04);
        }

        /* --- Brand --- */
        .login-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .login-logo-ring {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 2px solid rgba(184,149,84,0.6);
          padding: 4px;
          box-shadow: 0 0 20px rgba(184,149,84,0.25), inset 0 0 10px rgba(0,0,0,0.4);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-logo-img {
          border-radius: 50%;
          object-fit: cover;
        }
        .login-brand-text {
          text-align: center;
        }
        .login-brand-sub {
          font-size: 0.6rem;
          letter-spacing: 0.35em;
          color: rgba(184,149,84,0.8);
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .login-brand-title {
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.12em;
        }
        .login-brand-candra { color: #b89554; }
        .login-brand-sedana { color: #d9d9d9; }
        .login-brand-loc {
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          color: rgba(217,217,217,0.4);
          margin-top: 4px;
          font-family: var(--font-eb-garamond, serif);
          font-style: italic;
        }

        /* --- Divider --- */
        .login-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .login-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(184,149,84,0.3), transparent);
        }
        .login-divider-symbol {
          color: rgba(184,149,84,0.6);
          font-size: 0.7rem;
        }

        /* --- Header --- */
        .login-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .login-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #d9d9d9;
          margin-bottom: 0.25rem;
        }
        .login-subtitle {
          font-size: 0.8rem;
          color: rgba(217,217,217,0.45);
          font-family: var(--font-eb-garamond, serif);
        }

        /* --- Error --- */
        .login-error {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(220, 38, 38, 0.1);
          border: 1px solid rgba(220, 38, 38, 0.3);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          font-size: 0.8rem;
          color: #fca5a5;
          margin-bottom: 1.25rem;
        }
        .login-error-icon { font-style: normal; }

        /* --- Form --- */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .login-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .login-label {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: rgba(217,217,217,0.6);
          text-transform: uppercase;
        }
        .login-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .login-input-icon {
          position: absolute;
          left: 0.875rem;
          font-size: 0.85rem;
          color: rgba(184,149,84,0.5);
          pointer-events: none;
        }
        .login-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(184,149,84,0.2);
          border-radius: 10px;
          padding: 0.75rem 0.875rem 0.75rem 2.5rem;
          font-size: 0.875rem;
          color: #d9d9d9;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          font-family: var(--font-poppins, sans-serif);
        }
        .login-input::placeholder { color: rgba(217,217,217,0.2); }
        .login-input:focus {
          border-color: rgba(184,149,84,0.6);
          background: rgba(184,149,84,0.06);
          box-shadow: 0 0 0 3px rgba(184,149,84,0.1);
        }

        /* --- Button --- */
        .login-btn {
          margin-top: 0.5rem;
          width: 100%;
          padding: 0.875rem;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          font-family: var(--font-poppins, sans-serif);
          background: linear-gradient(135deg, #b89554 0%, #d4a96a 50%, #b89554 100%);
          background-size: 200% 200%;
          color: #0a0a0a;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(184,149,84,0.3);
          animation: shimmerBtn 3s ease infinite;
        }
        @keyframes shimmerBtn {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(184,149,84,0.45);
        }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        .login-btn-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .login-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(10,10,10,0.3);
          border-top-color: #0a0a0a;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* --- Note --- */
        .login-note {
          margin-top: 1.25rem;
          text-align: center;
          font-size: 0.7rem;
          color: rgba(217,217,217,0.25);
          font-family: var(--font-eb-garamond, serif);
          font-style: italic;
          letter-spacing: 0.02em;
        }
      `}</style>
    </div>
  );
}
