import { useAuth } from '@/contexts/AuthContext';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary-600 flex items-center">
                <Shield className="mr-2 h-8 w-8" />
                SecureAuth
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => setLocation('/login')}
                  className="text-gray-600 hover:text-primary-600"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => setLocation('/register')}
                  className="bg-primary-500 hover:bg-primary-600 text-white"
                >
                  Get Started
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user && getInitials(user.firstName, user.lastName)}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {user && `${user.firstName} ${user.lastName}`}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
