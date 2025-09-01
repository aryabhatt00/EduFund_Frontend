import React, { useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
const AdminLogin = () => {
  const [input, setInput] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
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
        localStorage.setItem("token", data.token);
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
      {" "}
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
        {" "}
        {/* Left Panel - Promo */}{" "}
        <div style={{ flex: 1, textAlign: "center" }}>
          {" "}
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {" "}
            🚀 Welcome, Admin!{" "}
          </Typography>{" "}
          <Typography variant="h6" sx={{ mb: 2 }}>
            {" "}
            Manage everything at one place.{" "}
          </Typography>{" "}
          <Typography
            variant="body1"
            sx={{ fontSize: "1.1rem", color: "#444" }}
          >
            {" "}
            🔐 Secure access to user accounts and transactions. <br /> 📊 Full
            dashboard visibility. <br /> 👩‍💻 Built for speed and efficiency.{" "}
          </Typography>{" "}
        </div>{" "}
        {/* Right Panel - Login Card */}{" "}
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
          {" "}
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            {" "}
            <AdminPanelSettingsIcon
              sx={{ fontSize: 50, color: "#0052cc" }}
            />{" "}
          </div>{" "}
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            sx={{ mb: 3, color: "#1a1a1a" }}
          >
            {" "}
            Admin Login{" "}
          </Typography>{" "}
          <form onSubmit={handleSubmit}>
            {" "}
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
                sx: { color: "#666", "&.Mui-focused": { color: "#0072ff" } },
              }}
            />{" "}
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
                    {" "}
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      tabIndex={-1}
                      sx={{ color: "#666" }}
                    >
                      {" "}
                      {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                    </IconButton>{" "}
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
                sx: { color: "#666", "&.Mui-focused": { color: "#0072ff" } },
              }}
            />{" "}
            {error && (
              <Typography
                variant="body2"
                sx={{ color: "#f44336", mt: 1, textAlign: "center" }}
              >
                {" "}
                {error}{" "}
              </Typography>
            )}{" "}
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
                "&:hover": { backgroundColor: "#003b99" },
              }}
            >
              {" "}
              Sign in{" "}
            </Button>{" "}
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                color: "#0052cc",
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {" "}
              Forgot username or password?{" "}
            </Typography>{" "}
          </form>{" "}
        </Paper>{" "}
      </div>{" "}
    </div>
  );
};
export default AdminLogin;
