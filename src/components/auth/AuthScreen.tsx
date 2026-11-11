import React, { useState, useEffect } from 'react';
import { ArrowRight, HeartPulse, ShieldCheck, Sparkles, X, Smartphone, KeyRound, Clock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { otpService } from '../../services/otpService';
import { useEscapeKey } from '../../utils/useEscapeKey';
import { TermsOfServiceModal } from '../legal/TermsOfServiceModal';
import { PrivacyPolicyModal } from '../legal/PrivacyPolicyModal';

type AuthMethod = 'OTP' | 'PASSWORD';
type AuthMode = 'signin' | 'register';

export const AuthScreen: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => {
  useEscapeKey(onDismiss);
  const { loginUser, setUserProfile, showToast } = useApp();

  const [authMethod, setAuthMethod] = useState<AuthMethod>('OTP');
  const [mode, setMode] = useState<AuthMode>('signin');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // Password fields
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Legal modals
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    if (!otpService.isValidIndianMobile(phone)) {
      setError('Please enter a valid 10-digit Indian mobile number (e.g. 98765 43210)');
      return;
    }

    setIsSendingOtp(true);
    const res = await otpService.sendOtp(phone);
    setIsSendingOtp(false);

    if (res.success) {
      setIsOtpSent(true);
      setResendCooldown(60);
      showToast(res.message);
    } else {
      setError(res.message);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!otp.trim()) {
      setError('Please enter the 6-digit OTP code.');
      return;
    }

    const res = await otpService.verifyOtp(phone, otp);
    if (!res.success) {
      setError(res.message);
      return;
    }

    // Success: log user in & update profile with verified phone
    loginUser(phone, 'verified_phone_session');
    setUserProfile((prev) => ({
      ...prev,
      phone: otpService.formatIndianMobile(phone),
      name: fullName.trim() || prev.name || 'Verified Patient',
    }));

    showToast('Mobile number verified! Welcome to SehatSetu.');
    onDismiss();
  };

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedIdentifier = phoneOrEmail.trim();
    const trimmedPassword = password.trim();

    if (!trimmedIdentifier || !trimmedPassword) {
      setError('Enter your mobile number or email and password.');
      return;
    }

    if (mode === 'register') {
      const trimmedName = fullName.trim();
      const trimmedEmail = email.trim();
      if (!trimmedName || !trimmedEmail || !trimmedIdentifier) {
        setError('Complete all fields to create your account.');
        return;
      }
    }

    const success = loginUser(trimmedIdentifier, trimmedPassword);
    if (!success) {
      setError('Please enter a password with at least 4 characters.');
      return;
    }

    if (mode === 'register') {
      setUserProfile((profile) => ({
        ...profile,
        id: `usr-${Date.now()}`,
        name: fullName.trim(),
        phone: trimmedIdentifier,
        email: email.trim(),
      }));
    }

    setError(null);
    showToast(mode === 'register' ? 'Your account is ready' : 'Welcome back to SehatSetu');
    onDismiss();
  };

  const handleDemoLogin = () => {
    const success = loginUser('9876543210', 'demo123');
    if (!success) {
      setError('Demo login is unavailable right now.');
      return;
    }

    setError(null);
    showToast('Signed in as demo patient');
    onDismiss();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6 animate-in fade-in duration-200">
      <div className="relative mx-auto grid min-h-full max-w-6xl items-center gap-6 py-8 md:grid-cols-2 md:gap-10">
        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-0 top-0 z-10 rounded-full bg-white/90 p-2 text-slate-600 shadow-sm transition hover:bg-white hover:text-slate-900"
          aria-label="Close sign in"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Branding Showcase */}
        <div className="hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-800 p-8 text-white shadow-[0_25px_75px_rgba(13,58,48,0.35)] md:block md:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl font-black shadow-inner">S</div>
            <div>
              <div className="text-xl font-black tracking-tight">SehatSetu</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-100/80">Anywhere Healthcare</div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-emerald-100">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            NMC & DPDP Act 2023 Compliant Care Network
          </div>

          <h1 className="mt-6 text-4xl font-black leading-tight lg:text-5xl">
            Better care starts with a stronger connection.
          </h1>

          <p className="mt-4 max-w-md text-sm leading-7 text-emerald-50/90">
            Book verified doctors, monitor live OPD tokens, access digital prescriptions, and securely link your ABHA health ID.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
              <HeartPulse className="mb-2 h-5 w-5 text-emerald-300" />
              <div className="text-lg font-black">12k+</div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-emerald-100/70">consultations</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
              <Sparkles className="mb-2 h-5 w-5 text-emerald-300" />
              <div className="text-lg font-black">4.9/5</div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-emerald-100/70">patient rating</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
              <ShieldCheck className="mb-2 h-5 w-5 text-emerald-300" />
              <div className="text-lg font-black">24/7</div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-emerald-100/70">care access</div>
            </div>
          </div>
        </div>

        {/* Right Auth Card */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.12)] sm:p-8">
          <div className="mb-5">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
              Verified Patient Portal
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-heading">
              {authMethod === 'OTP' ? 'Mobile Number Sign In' : mode === 'signin' ? 'Sign in with Password' : 'Create Account'}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {authMethod === 'OTP'
                ? 'Sign in securely with instant Indian mobile (+91) OTP verification'
                : 'Access your health locker, appointments, and care network'}
            </p>
          </div>

          {/* Method Selector: Mobile OTP vs Password */}
          <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => {
                setAuthMethod('OTP');
                setError(null);
              }}
              className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${
                authMethod === 'OTP' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile OTP</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMethod('PASSWORD');
                setError(null);
              }}
              className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${
                authMethod === 'PASSWORD' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Password</span>
            </button>
          </div>

          {/* METHOD 1: MOBILE OTP AUTH (INDIAN STANDARD) */}
          {authMethod === 'OTP' && (
            <div className="space-y-4">
              {!isOtpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Full Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Priya Debbarma"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      10-Digit Mobile Number
                    </label>
                    <div className="flex rounded-xl border border-slate-200 bg-slate-50 overflow-hidden focus-within:border-emerald-500 focus-within:bg-white">
                      <span className="px-3 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 border-r border-slate-200">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="98765 43210"
                        className="w-full px-3 py-2.5 text-xs text-slate-900 outline-none bg-transparent"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSendingOtp}
                    className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-xs"
                  >
                    <span>{isSendingOtp ? 'Sending OTP...' : 'Send Verification OTP'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3.5">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">OTP sent to:</span>
                      <span className="font-bold text-emerald-900">+91 {phone}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsOtpSent(false)}
                      className="text-xs font-bold text-emerald-700 hover:underline"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Enter 6-Digit OTP Code
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      autoFocus
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="Enter 6-digit OTP"
                      className="w-full text-center tracking-[0.5em] font-mono font-bold text-lg rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>

                  {error && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                      {error}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span>Didn't receive SMS?</span>
                    {resendCooldown > 0 ? (
                      <span className="flex items-center gap-1 font-mono text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>Resend in {resendCooldown}s</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSendOtp()}
                        className="font-bold text-emerald-700 hover:underline"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify OTP & Sign In</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* METHOD 2: PASSWORD SIGN IN */}
          {authMethod === 'PASSWORD' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  {mode === 'register' ? 'Mobile Number' : 'Mobile Number or Email'}
                </label>
                <input
                  type="text"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder={mode === 'register' ? '9876543210' : 'Enter mobile or email'}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  minLength={4}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-xs"
              >
                <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setMode(mode === 'signin' ? 'register' : 'signin')}
                  className="text-xs font-bold text-emerald-800 hover:underline"
                >
                  {mode === 'signin' ? "Don't have an account? Register" : 'Already have an account? Sign In'}
                </button>
              </div>
            </form>
          )}

          {/* Quick Demo Button */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2 px-3 border border-dashed border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <span>Instant Test: Sign in as Demo Patient</span>
            </button>
          </div>

          {/* Legal Compliance Links */}
          <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-400">
            By signing in, you agree to our{' '}
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="text-emerald-700 font-bold hover:underline"
            >
              Terms of Service
            </button>{' '}
            and{' '}
            <button
              type="button"
              onClick={() => setShowPrivacyModal(true)}
              className="text-emerald-700 font-bold hover:underline"
            >
              Privacy Policy
            </button>{' '}
            under the DPDP Act 2023.
          </p>
        </div>
      </div>

      {showTermsModal && <TermsOfServiceModal onClose={() => setShowTermsModal(false)} />}
      {showPrivacyModal && <PrivacyPolicyModal onClose={() => setShowPrivacyModal(false)} />}
    </div>
  );
};
