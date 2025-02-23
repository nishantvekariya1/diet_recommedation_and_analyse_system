import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

const allergyOptions = [
  "Peanuts", "Tree Nuts", "Milk", "Eggs", "Wheat", "Soy", "Fish", "Shellfish",
  "Sesame", "Mustard", "Celery", "Lupin", "Mollusks", "Sulphites", "Gluten",
];

export default function UpdateProfileForm() {
  const [formData, setFormData] = useState({
    gender: "",
    weight: "",
    height: "",
    diet_type: "",
    healthGoals: "", // Changed from health_goal
    age: "",
    activity_level: "",
    allergies: [],
  });

  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await Axios.post("http://localhost:3000/api/auth/get-user-info", { email });
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (email) {
      fetchUserInfo();
    } else {
      navigate("/login");
    }
  }, [email, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAllergyChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      allergies: checked
        ? [...prevData.allergies, value]
        : prevData.allergies.filter((allergy) => allergy !== value),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await Axios.post("http://localhost:3000/api/auth/update-profile", { ...formData, email });
      navigate("/home");
      // alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", {
        message: error.message,
        response: error.response ? error.response.data : "No response data",
        status: error.response ? error.response.status : "No status",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: "background.paper" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Update Your Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select name="gender" value={formData.gender} onChange={handleInputChange} label="Gender">
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Height (cm)"
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Activity Level</InputLabel>
                  <Select
                    name="activity_level"
                    value={formData.activity_level}
                    onChange={handleInputChange}
                    label="Activity Level"
                  >
                    <MenuItem value="sedentary">Sedentary</MenuItem>
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="moderate">Moderate</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="veryactive">Very Active</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Health Goal</InputLabel>
                  <Select
                    name="healthGoals" // Changed from health_goal
                    value={formData.healthGoals}
                    onChange={handleInputChange}
                    label="Health Goal"
                  >
                    <MenuItem value="loss">Weight Loss</MenuItem>
                    <MenuItem value="gain">Weight Gain</MenuItem>
                    <MenuItem value="maintain">Maintain Weight</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Dietary Preference</InputLabel>
                  <Select
                    name="diet_type"
                    value={formData.diet_type}
                    onChange={handleInputChange}
                    label="Dietary Preference"
                  >
                    <MenuItem value="vegan">Vegan</MenuItem>
                    <MenuItem value="vegetarian">Vegetarian</MenuItem>
                    <MenuItem value="pescatarian">Pescatarian</MenuItem>
                    <MenuItem value="non-vegan">Non-Vegan</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Allergies</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      <Grid container spacing={2}>
                        {allergyOptions.map((allergy) => (
                          <Grid item xs={6} sm={4} key={allergy}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={formData.allergies.includes(allergy)}
                                  onChange={handleAllergyChange}
                                  name="allergies"
                                  value={allergy}
                                />
                              }
                              label={allergy}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                  <Button type="submit" variant="contained" color="primary" size="large">
                    Update Profile
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}