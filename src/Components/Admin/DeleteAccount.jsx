import React, { useState } from 'react';
import {
  Container,
  TextField,
  Typography,
  Button,
  Alert,
  Paper,
} from '@mui/material';

const DeleteAccount = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:8080/admin/account/${accountNumber}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const text = await res.text();
      res.ok ? setMessage(text) : setError(text);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Admin: Delete Bank Account
        </Typography>

        <form onSubmit={handleDelete}>
          <TextField
            label="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            fullWidth
            required
            margin="normal"
            variant="outlined"
          />

          <Button
            type="submit"
            variant="contained"
            color="error"
            fullWidth
            sx={{ mt: 2, py: 1.2, borderRadius: 3, fontWeight: 'bold' }}
          >
            Delete Account
          </Button>
        </form>

        {message && <Alert severity="success" sx={{ mt: 3 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
      </Paper>
    </Container>
  );
};

export default DeleteAccount;
