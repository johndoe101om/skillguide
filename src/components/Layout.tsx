import { useAuth } from "@/contexts/AuthContext";
import Navigation from "./Navigation";
import TrainerNavigation from "./TrainerNavigation";
import AdminNavigation from "./AdminNavigation";

interface LayoutProps {
  children: React.ReactNode;
  forceNavigation?: "user" | "trainer" | "admin" | "none";
}

const Layout: React.FC<LayoutProps> = ({ children, forceNavigation }) => {
  const { user, isAuthenticated } = useAuth();

  const getNavigation = () => {
    // If forceNavigation is specified, use that
    if (forceNavigation) {
      switch (forceNavigation) {
        case "admin":
          return <AdminNavigation />;
        case "trainer":
          return <TrainerNavigation />;
        case "user":
          return <Navigation />;
        case "none":
          return null;
        default:
          return <Navigation />;
      }
    }

    // If user is authenticated, show navigation based on role
    if (isAuthenticated && user) {
      switch (user.role) {
        case "admin":
          return <AdminNavigation />;
        case "trainer":
          return <TrainerNavigation />;
        case "user":
          return <Navigation />;
        default:
          return <Navigation />;
      }
    }

    // Default navigation for non-authenticated users
    return <Navigation />;
  };

  return (
    <>
      {getNavigation()}
      {children}
    </>
  );
};

export default Layout;
