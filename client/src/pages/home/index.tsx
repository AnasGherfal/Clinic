import React from "react";
import Layout from "../../layout";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dentist from "../../assets/pics/Dentist-Check-Up.jpg";
import checkUp from "../../assets/pics/check-up.jpeg";
import babyCheck from "../../assets/pics/newborn-check.jpg";
import { useNavigate } from "react-router-dom";



const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#fff",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease-in-out", // Added transition property
          "&:hover": {
            transform: "scale(1.05)", // Added hover effect
          },
        },
      },
    },
  },
});

const Home = () => {
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            overflow: "auto",
            textAlign: "center",
            color: "#60636c",
          }}
        >
          <Typography variant="h2" mb={2}>
            Welcome to the Clinic
          </Typography>
          <Typography variant="body1" mb={4}>
            Providing Quality Healthcare for a Healthier Tomorrow
          </Typography>
          <Button
          onClick={() => navigate('/appointments')}

            variant="contained"
            sx={{ backgroundColor: "#2358ba" }}
          >
            Schedule Appointment
          </Button>
        </Box>

        <Box mt={6} sx={{ color: "black" }}>
          <Typography variant="h4" mb={2}>
            Our Services
          </Typography>
          <Grid
            container
            spacing={4}
            sx={{
              textAlign: "center",
            }}
          >
            {services.map((service) => (
              <Grid
                item
                xs={12}
                sm={isSm ? 6 : 12}
                md={isMd ? 4 : 6}
                key={service.title}
              >
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={service.image}
                    alt={service.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6" mb={2}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </ThemeProvider>
    </Layout>
  );
};

const services = [
  {
    title: "Medical Checkups",
    image: dentist,
    description:
      "Comprehensive health assessments to monitor and maintain your well-being.",
  },
  {
    title: "Dental Care",
    image: checkUp,

    description: "Quality dental services for a bright and healthy smile.",
  },
  {
    title: "Pediatric Services",
    image: babyCheck,
    description: "Specialized care for infants, children, and adolescents.",
  },
];

export default Home;
