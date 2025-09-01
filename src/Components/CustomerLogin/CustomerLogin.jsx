import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Invalid email or password");
        return;
      }

      const data = await res.json();

      localStorage.setItem("customerToken", data.token);
      localStorage.setItem("customerName", data.name);
      localStorage.setItem("customerEmail", data.email);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("customerLoginTime", Date.now().toString());
      window.dispatchEvent(new Event("storage"));

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
          flexDirection: "row",
          gap: "4rem",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* Left Panel - Promo */}
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
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d0d0d0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0072ff",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0072ff",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#666",
                  "&.Mui-focused": { color: "#0072ff" },
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
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d0d0d0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0072ff",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0072ff",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#666",
                  "&.Mui-focused": { color: "#0072ff" },
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
                textTransform: "none",
                fontSize: "1rem",
                boxShadow: "0 4px 12px rgba(0, 82, 204, 0.3)",
                "&:hover": {
                  backgroundColor: "#003b99",
                },
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
