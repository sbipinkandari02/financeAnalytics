import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Shield, Calendar, CheckCircle, LogIn, UserCog, ShieldCheck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatMemberSince = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatLastLogin = (date: Date | string | null | undefined) => {
    if (!date) return 'Never';
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <section className="px-4">
      <div className="max-w-4xl mx-auto">
        {/* Dashboard Header */}
        <Card className="rounded-xl shadow-material mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome back, {user.firstName}!
                </h2>
                <p className="text-gray-600">
                  Last login: {formatLastLogin(user.lastLogin)}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Account Status</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Active
                  </span>
                </div>
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white text-lg font-medium">
                  {getInitials(user.firstName, user.lastName)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="rounded-xl shadow-material">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Clock className="text-blue-600 h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Session Duration</p>
                  <p className="text-2xl font-bold text-gray-900">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="rounded-xl shadow-material">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Shield className="text-green-600 h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Security Score</p>
                  <p className="text-2xl font-bold text-gray-900">95%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="rounded-xl shadow-material">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="text-purple-600 h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatMemberSince(user.createdAt)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Profile Card */}
        <Card className="rounded-xl shadow-material mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <p className="text-gray-900">{user.firstName} {user.lastName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                <p className="text-gray-900">Premium</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Two-Factor Auth</label>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Enabled
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <Button className="bg-primary-500 hover:bg-primary-600 text-white">
                Edit Profile
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="rounded-xl shadow-material">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <LogIn className="text-blue-600 h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">Successful login</p>
                  <p className="text-sm text-gray-500">From your current session</p>
                </div>
                <div className="text-sm text-gray-500">Just now</div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <UserCog className="text-green-600 h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">Account created</p>
                  <p className="text-sm text-gray-500">Welcome to SecureAuth</p>
                </div>
                <div className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <ShieldCheck className="text-purple-600 h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">Security settings verified</p>
                  <p className="text-sm text-gray-500">Account security is optimal</p>
                </div>
                <div className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
