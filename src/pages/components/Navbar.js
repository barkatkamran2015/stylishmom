import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '../../../lib/firebaseConfig';
import { useAuth } from '../../../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import imageLogo from '../Assets/logo1.png';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState({});
  const [isClient, setIsClient] = useState(false);
  const desktopDropdownRef = useRef(null); // Ref for desktop dropdown
  const mobileDropdownRef = useRef(null);  // Ref for mobile dropdown
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && drawerOpen) setDrawerOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawerOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideDesktop = desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target);
      const isOutsideMobile = mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target);
      // Only close dropdown if the click is outside both desktop and mobile dropdowns
      if (isOutsideDesktop && isOutsideMobile) {
        setMobileMenuOpen({});
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        router.push('/auth/signin');
      })
      .catch((error) => console.error('Error signing out: ', error));
  };

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const toggleMobileMenu = (menuLabel) => {
    setMobileMenuOpen((prev) => ({
      ...prev,
      [menuLabel]: !prev[menuLabel],
    }));
  };

  const closeNavbarAndNavigate = () => {
    setDrawerOpen(false);
    setMobileMenuOpen({});
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    {
      label: 'Recipe',
      dropdown: [
        { label: 'Food', path: '/food' },
        { label: 'Drinks', path: '/drinks' },
        { label: 'Dessert', path: '/dessert' },
      ],
    },
    { label: 'Blog', path: '/blog' },
    { label: 'Products Review', path: '/productsreview' },
    { label: 'Contact', path: '/contact' },
  ];

  if (!isClient) return null;

  return (
    <AppBar
  position="sticky"
  sx={{
    background: 'rgba(155, 29, 42, 0.94)',
    backdropFilter: 'blur(14px)',
    borderBottom: '3px solid #d4af37',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    top: 0,
    zIndex: 1200,
    transition: 'all 0.3s ease',
  }}
>
  <Toolbar sx={{ justifyContent: 'space-between', padding: { xs: '0 16px', md: '0 32px' }, minHeight: '80px' }}>
    {/* Logo */}
    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
      <Link href="/">
        <img
          src={imageLogo.src}
          alt="The Stylish Mama Logo"
          style={{
            height: '68px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </Link>
    </Typography>

    {/* Desktop Menu */}
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }} ref={desktopDropdownRef}>
      {menuItems.map((menu, index) =>
        menu.dropdown ? (
          <Box key={index} sx={{ position: 'relative' }}>
            <Button
              onClick={() => toggleMobileMenu(menu.label)}
              endIcon={<ExpandMoreIcon />}
              sx={{
                color: '#fdf2f2',
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
                padding: '10px 20px',
                borderRadius: '12px',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 10,
                  left: '50%',
                  width: 0,
                  height: '2.5px',
                  background: '#d4af37',
                  transition: 'all 0.35s ease',
                  transform: 'translateX(-50%)',
                },
                '&:hover:after': { width: '70%' },
                '&:hover': { backgroundColor: 'rgba(212, 175, 55, 0.15)' },
              }}
            >
              {menu.label}
            </Button>

            {mobileMenuOpen[menu.label] && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: 'rgba(155, 29, 42, 0.98)',
                  borderRadius: '12px',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
                  minWidth: '180px',
                  mt: 1,
                  overflow: 'hidden',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                }}
              >
                {menu.dropdown.map((item, idx) => (
                  <Button
                    key={idx}
                    component={Link}
                    href={item.path}
                    onClick={() => setMobileMenuOpen({})}
                    sx={{
                      display: 'block',
                      color: '#fdf2f2',
                      padding: '12px 24px',
                      textAlign: 'left',
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': { backgroundColor: 'rgba(212, 175, 55, 0.2)' },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        ) : (
          <Button
            key={index}
            component={Link}
            href={menu.path}
            sx={{
              color: '#fdf2f2',
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              padding: '10px 20px',
              borderRadius: '12px',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 10,
                left: '50%',
                width: 0,
                height: '2.5px',
                background: '#d4af37',
                transition: 'all 0.35s ease',
                transform: 'translateX(-50%)',
              },
              '&:hover:after': { width: '70%' },
              '&:hover': { backgroundColor: 'rgba(212, 175, 55, 0.15)' },
            }}
          >
            {menu.label}
          </Button>
        )
      )}

      {/* Auth Buttons */}
      {!user ? (
        <>
          <Button
            component={Link}
            href="/auth/signin"
            sx={{
              color: '#fdf2f2',
              fontWeight: 600,
              padding: '10px 20px',
              borderRadius: '12px',
              '&:hover': { backgroundColor: 'rgba(212, 175, 55, 0.15)' },
            }}
          >
            Sign In
          </Button>
          <Button
            component={Link}
            href="/auth/signup"
            sx={{
              background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
              color: '#600d17',
              fontWeight: 700,
              padding: '12px 32px',
              borderRadius: '12px',
              boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 30px rgba(212, 175, 55, 0.5)',
              },
            }}
          >
            Sign Up
          </Button>
        </>
      ) : (
        <Button
          onClick={handleLogout}
          sx={{
            color: '#fdf2f2',
            fontWeight: 600,
            padding: '10px 20px',
            borderRadius: '12px',
            '&:hover': { backgroundColor: 'rgba(212, 175, 55, 0.15)' },
          }}
        >
          Logout
        </Button>
      )}
    </Box>

   

        {/* Mobile Menu Button */}
        <IconButton
          edge="end"
          onClick={toggleDrawer(true)}
          sx={{
            display: { xs: 'block', md: 'none' },
            color: 'white',
            padding: '10px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
          }}
        >
          <MenuIcon sx={{ fontSize: '28px' }} />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: { xs: '80vw', sm: '300px' },
              height: '100vh',
              backgroundColor: '#0b9299',
              padding: '20px',
              boxSizing: 'border-box',
              transition: 'width 0.3s ease',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
              Menu
            </Typography>
            <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
          <List ref={mobileDropdownRef}>
            {menuItems.map((menu, index) =>
              menu.dropdown ? (
                <Box key={index}>
                  <ListItem
                    button
                    onClick={() => toggleMobileMenu(menu.label)}
                    sx={{ padding: '12px 16px', color: 'white' }}
                  >
                    <ListItemText
                      primary={menu.label}
                      primaryTypographyProps={{ fontSize: '16px', fontWeight: 600 }}
                    />
                    <ExpandMoreIcon sx={{ color: 'white', transform: mobileMenuOpen[menu.label] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                  </ListItem>
                  {mobileMenuOpen[menu.label] && (
                    <Box sx={{ pl: 4 }}>
                      {menu.dropdown.map((item, idx) => (
                        <ListItem
                          key={idx}
                          button
                          component={Link}
                          href={item.path}
                          onClick={closeNavbarAndNavigate}
                          sx={{ padding: '10px 16px', color: 'white' }}
                        >
                          <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '14px' }} />
                        </ListItem>
                      ))}
                    </Box>
                  )}
                </Box>
              ) : (
                <ListItem
                  key={index}
                  button
                  component={Link}
                  href={menu.path}
                  onClick={closeNavbarAndNavigate}
                  sx={{ padding: '12px 16px', color: 'white' }}
                >
                  <ListItemText primary={menu.label} primaryTypographyProps={{ fontSize: '16px', fontWeight: 600 }} />
                </ListItem>
              )
            )}
          </List>
          <Divider sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {!user ? (
              <>
                <Button
                  component={Link}
                  href="/auth/signin"
                  onClick={closeNavbarAndNavigate}
                  sx={{
                    color: 'white',
                    border: '2px solid white',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                  }}
                >
                  Sign In
                </Button>
                <Button
                  component={Link}
                  href="/auth/signup"
                  onClick={closeNavbarAndNavigate}
                  sx={{
                    backgroundColor: '#FFD700',
                    color: '#0b9299',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#ffea00' },
                  }}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  handleLogout();
                  closeNavbarAndNavigate();
                }}
                sx={{
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
