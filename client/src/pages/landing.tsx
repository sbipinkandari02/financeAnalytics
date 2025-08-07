import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export function Landing() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    setLocation('/dashboard');
    return null;
  }

  return (
    <section className="text-center py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Secure Authentication Made Simple
        </h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Experience enterprise-grade security with JWT authentication, protected routes, and seamless user management.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => setLocation('/register')}
            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 text-lg h-auto"
          >
            Create Account
          </Button>
          <Button
            variant="outline"
            onClick={() => setLocation('/login')}
            className="border-primary-500 text-primary-600 hover:bg-primary-50 px-8 py-3 text-lg h-auto"
          >
            Sign In
          </Button>
        </div>
      </div>
    </section>
  );
}
