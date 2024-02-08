import { Link, useLocation } from "react-router-dom";
import { Box, Button, Hidden, Typography } from "@mui/material";
import HomeIcon from "../assets/icons/icon-nav-home.svg";
import UsersIcon from "../assets/icons/users-svgrepo-com.svg";
import AppointmentIcon from "../assets/icons/icon-appointment.svg";
import { SignOut } from "../config/AuthService";

// const sidebarColor = "#ffffff";
const navLinks = [
  {
    name: "Home",
    icon: HomeIcon,
    link: "/",
  },

  {
    name: "Users",
    icon: UsersIcon,
    link: "/users",
  },
  {
    name: "Appointments",
    icon: AppointmentIcon,
    link: "/appointments",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  const handleSignOut = async () => {
    await SignOut();
  };
  return (
    <Box
      sx={{
        backgroundColor: " #0A1C40",
        padding: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: {
          xs: "row",
          lg: "column",
        },
        alignItems: "center",
        justifyContent: "space-between",
        width: {
          xs: "80%",
          sm: "93%",
          md: "93%",
          lg: "30vh",
          xl: "30vh",
        },
        position: "fixed",
        top: 20,
        height: {
          xs: "6vh", // Height for extra-small screens
          sm: "7vh", // Height for small screens
          md: "8vh", // Height for medium screens
          lg: "90vh", // Height for large screens
          xl: "90vh", // Height for extra-large screens
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "row",
            lg: "column",
          },
          gap: 5,
          alignItems: {
            xs: "center",
            lg: "start",
          },
          width: "100%",
        }}
      >
        <Hidden smDown>
          <Typography
            variant="h4"
            component="h1"
            my={1}
            fontWeight={800}
            fontSize={30}
          >
            Clinic
          </Typography>
        </Hidden>

        <Box
          sx={{
            py: {
              xs: "0px",
              lg: "16px",
              
            },
            display: "flex",
            flexDirection: {
              
              xs: "row",
              lg: "column",
            },
            
            gap: 4,
          }}
        >
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  style={{
                    width: "18px",
                    filter: `${
                      pathname === item.link
                        ? "invert(58%) sepia(14%) saturate(10000%) hue-rotate(312deg) brightness(91%) contrast(87%)"
                        : "invert(84%)"
                    }`,
                  }}
                />
                <Hidden mdDown>
                  <Typography>{item.name}</Typography>
                </Hidden>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
      <Button onClick={handleSignOut} variant="contained" sx={{color:'white', backgroundColor:'#F24949', borderRadius:'10px'}}>SignOut</Button>
    </Box>
  );
};

export default Sidebar;
