import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const isMobile = useMediaQuery("(max-width:768px)");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API}/customer/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Invalid email or password");
        return;
      }

      const data = await res.json();
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminLoginTime");
      localStorage.removeItem("userRole");

      localStorage.setItem("customerToken", data.token);
      localStorage.setItem("userRole", "CUSTOMER");
      localStorage.setItem("customerName", data.name);
      localStorage.setItem("customerEmail", data.email);
      localStorage.setItem("customerLoginTime", Date.now().toString());
      localStorage.setItem("isLoggedIn", "true");

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again.");
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
            🏦 Welcome to EduFund!
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Open a $0 account in under 2 minutes!
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "#444" }}>
            🔐 AI-secured. Instant activation.
          </Typography>
        </div>

        {/* Right Panel */}
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
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            sx={{ mb: 3, color: "#1a1a1a" }}
          >
            Customer Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              autoComplete="email"
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
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

export default CustomerLogin;
