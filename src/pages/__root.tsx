import { useState, useEffect } from "react";
import PillNav from "@/components/PillNav/PillNav";
import { createRootRoute, Outlet, useRouter } from '@tanstack/react-router';
import logo from '@/assets/logo.png';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Handle initial hash
    handleHashChange();

    // Listen to route changes (including hash changes)
    const unsubscribe = router.history.subscribe(() => {
      handleHashChange();
    });

    return unsubscribe;
  }, [router.history]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-6 flex justify-center items-center transition-all duration-300`}
      >
        <PillNav
          logo={logo}
          logoAlt="Company Logo"
          items={[
            { label: "Home", href: "#home" },
            { label: "About", href: "#about" },
            { label: "Projects", href: "#projects" },
            { label: "Contact", href: "#contact" },
          ]}
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="linear-gradient(135deg, #021129 0%, #1E3A8A 100%)"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#021129"
        />
      </div>
      
      <Outlet />
    </>
  );
}