import React from "react";
import { Box, Typography, Button } from "@mui/material";

const BookingSuccess = ({ onReset }: { onReset: () => void }) => {
  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Congratulations!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your booking was successful.
      </Typography>
      <Button variant="contained" color="primary" onClick={onReset}>
        Book Another Vehicle
      </Button>
    </Box>
  );
};

export default BookingSuccess;
