import React, { useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const AdminLogin = () => {
  const [input, setInput] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const isMobile = useMediaQuery("(max-width:768px)");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        setError("Invalid login");
        return;
      }

      const data = await res.json();
      if (data.token) {
        localStorage.removeItem("customerToken");
        localStorage.removeItem("customerName");
        localStorage.removeItem("customerEmail");
        localStorage.removeItem("customerLoginTime");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userRole");

        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("userRole", "ADMIN");
        localStorage.setItem("adminLoginTime", Date.now().toString());

        navigate("/admin");
      } else {
        setError("Login failed: Token not found");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error");
    }
  };

  return (
    <div
      style={{
        minHeight: "86vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f4f4",
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "2rem",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* Left Panel */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            🚀 Welcome, Admin!
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Manage everything at one place.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "#444" }}>
            🔐 Secure access to user accounts and transactions.
            <br /> 📊 Full dashboard visibility.
            <br /> 👩‍💻 Built for speed and efficiency.
          </Typography>
        </div>

        {/* Right Panel - Login Card */}
        <Paper
          elevation={10}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 400,
            borderRadius: 2,
            backgroundColor: "#efefef",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <AdminPanelSettingsIcon sx={{ fontSize: 50, color: "#0052cc" }} />
          </div>
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            sx={{ mb: 3, color: "#1a1a1a" }}
          >
            Admin Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={input.username}
              onChange={handleChange}
              fullWidth
              required
              autoComplete="username"
              margin="normal"
              variant="outlined"
              InputProps={{
                sx: {
                  backgroundColor: "#ffffff",
                  borderRadius: "6px",
                },
              }}
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={input.password}
              onChange={handleChange}
              fullWidth
              required
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      tabIndex={-1}
                      sx={{ color: "#666" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: "#ffffff",
                  borderRadius: "6px",
                },
              }}
            />
            {error && (
              <Typography
                variant="body2"
                sx={{ color: "#f44336", mt: 1, textAlign: "center" }}
              >
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.4,
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#0052cc",
                borderRadius: "30px",
              }}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default AdminLogin;
