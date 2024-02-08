import { ReactNode } from "react";
import Sidebar from "../components/sidebar";
import { Box, useMediaQuery, useTheme } from "@mui/material";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();

    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <Box
      sx={{
        backgroundColor: "#f2f2f2",
        display: "flex",
        color: "white",
        padding: 3,
        gap: 3,
        overflowY: "hidden",
        height: "100vh",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flex: 1, // Take up remaining space
          marginLeft: {
            lg: 30, 
            
          },
          marginBottom: {
            lg: 30, 
            
          },
          marginTop: isLargeScreen ? 0 : 10,


          overflowY: "hide",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
