import React from "react";
import { Dialog, Grow } from "@mui/material";

export default function PopupModal({
  open,
  onClose,
  children,
  customSize = null
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth={false}
      TransitionComponent={Grow}
      TransitionProps={{ timeout: 200 }}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          zIndex: 1301,
          ...(customSize && {
            width: customSize.width,
            height: customSize.height,
            maxWidth: "none",
            maxHeight: "none",
          }),
        },
      }}
    >
      {children}
    </Dialog>
  );
}
