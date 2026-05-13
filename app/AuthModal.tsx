import { useState, useEffect } from 'react';
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: { isOpen: boolean, onClose: () => void, initialMode?: 'login' | 'signup' }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        onClose();
        window.location.reload(); 
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onClose]);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during Google sign-in.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!inputValue.includes('@')) {
      setError('Please enter a valid email address. Phone number login is not currently supported.');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    try {
      setLoading(true);
      setError('');
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, inputValue, password);
      } else {
        await createUserWithEmailAndPassword(auth, inputValue, password);
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message || 'An error occurred during authentication. (Ensure Email/Password auth is enabled in Firebase Console)');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-[100] flex animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
      {/* Left side: Image (Desktop only) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-zinc-900 object-cover">
         <Image referrerPolicy="no-referrer" fill src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" alt="Fashion background" className="object-cover opacity-80 mix-blend-overlay" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
         <div className="absolute bottom-12 left-12 text-white">
            <h2 className="text-4xl font-serif font-bold mb-4">Discover Your Style</h2>
            <p className="text-zinc-300 max-w-md">Join Shevaly to access exclusive collections, early sales, and personalized recommendations crafted just for you.</p>
         </div>
      </div>

      {/* Right side: Form (Takes full width on mobile) */}
      <div className="w-full lg:w-1/2 h-[100dvh] overflow-y-auto bg-white flex flex-col relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors z-20"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-24 py-12 max-w-2xl mx-auto w-full">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-16 h-16 relative">
                <Image referrerPolicy="no-referrer" fill src="https://i.postimg.cc/RZfy16hW/Whats-App-Image-2026-05-04-at-3-12-21-PM.jpg" alt="Logo" className="object-contain mix-blend-multiply" />
              </div>
              <span className="text-4xl font-black tracking-tight text-[#80091B]" style={{ fontFamily: 'var(--font-logo)', marginTop: '2px' }}>
                Shevaly
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              {mode === 'login' ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              {mode === 'login' ? 'Sign in to continue to your account' : 'Sign up to start shopping with Shevaly'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-2xl border border-red-100 flex items-start gap-3">
              <div className="mt-0.5">⚠️</div>
              <div>{error}</div>
            </div>
          )}

          <div>
            <form onSubmit={handleContinue} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-gray-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all" 
                  placeholder="Enter your email address" 
                  disabled={loading}
                />
              </div>
              <div className="relative">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-gray-400 mb-2">Password</label>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all pr-12" 
                  placeholder="Enter your password" 
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-4 px-4 rounded-full shadow-md bg-zinc-900 hover:bg-black text-white text-sm font-bold transition-all hover:shadow-lg disabled:opacity-50"
              >
                Continue
              </button>
            </form>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200/60"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400 font-medium">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex justify-center items-center py-4 px-4 rounded-full shadow-sm bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 group"
              >
                <svg className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fillRule="evenodd"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              {mode === 'login' ? (
                <>
                  Don&apos;t have an account?{' '}
                  <button onClick={() => setMode('signup')} className="font-bold text-zinc-900 hover:underline">
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button onClick={() => setMode('login')} className="font-bold text-zinc-900 hover:underline">
                    Sign in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
