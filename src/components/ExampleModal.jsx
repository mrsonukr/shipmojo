import React from "react";
import { Button, Typography, Box } from "@mui/material";
import PopupModal from "./PopupModal";

export default function ExampleModal() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        Open Example Modal
      </Button>

      <PopupModal
        open={open}
        onClose={handleClose}
        title="Example Modal"
        maxWidth="md"
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          This is an example of how to use the reusable PopupModal component.
        </Typography>
        
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained">
            Confirm
          </Button>
        </Box>
      </PopupModal>
    </>
  );
}
