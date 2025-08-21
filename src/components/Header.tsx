import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { user, isAdmin, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { data: profileInfo } = useQuery({
    queryKey: ['profile-info'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile_info')
        .select('key, value');
      
      if (error) throw error;
      
      const profileMap: Record<string, string> = {};
      data.forEach((item) => {
        profileMap[item.key] = item.value;
      });
      
      return profileMap;
    },
  });

  const name = profileInfo?.name || 'Dr. Sujit Biswas';
  const title = profileInfo?.title || 'Assistant Professor';

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Research Areas', href: '#research' },
    { name: 'Publications', href: '#publications' },
    { name: 'Projects', href: '#projects' },
    { name: 'Teaching', href: '#teaching' },
    { name: 'Students', href: '#students' },
    { name: 'About Me', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-card">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {title}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
            ))}
          </div>

          {/* Auth & Mobile Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden lg:flex items-center gap-3">
                {isAdmin && (
                  <NavLink to="/admin">
                    <Button variant="outline" size="sm" className="shadow-card hover:shadow-elevated transition-shadow">
                      <Shield className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  </NavLink>
                )}
                <Button onClick={signOut} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            ) : (
              <NavLink to="/auth" className="hidden lg:block">
                <Button variant="outline" size="sm" className="shadow-card hover:shadow-elevated transition-shadow">
                  <LogIn className="w-4 h-4 mr-2" />
                  Admin Login
                </Button>
              </NavLink>
            )}
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border/50 bg-background/95 backdrop-blur-md rounded-lg shadow-card">
            <div className="flex flex-col space-y-2 pt-4 px-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left py-3 text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-border/50 space-y-2">
                {user ? (
                  <>
                    {isAdmin && (
                      <NavLink to="/admin" className="block">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Shield className="w-4 h-4 mr-2" />
                          Admin
                        </Button>
                      </NavLink>
                    )}
                    <Button onClick={signOut} variant="outline" size="sm" className="w-full">
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <NavLink to="/auth" className="block">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <LogIn className="w-4 h-4 mr-2" />
                      Admin Login
                    </Button>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;