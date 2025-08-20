import React from "react";
import { Dialog } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function PopupModal({ 
  open, 
  onClose, 
  children, 
  customSize = null
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1300,
            }}
                         onClick={onClose}
          />
          
          <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
            fullWidth={false}
            PaperComponent={motion.div}
            PaperProps={{
              component: motion.div,
              initial: { scale: 0.8, opacity: 0, y: 20 },
              animate: { scale: 1, opacity: 1, y: 0 },
              exit: { scale: 0.8, opacity: 0, y: 20 },
              transition: {
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.3,
              },
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
            sx={{
              "& .MuiBackdrop-root": {
                backgroundColor: "transparent",
              },
            }}
          >
                         {children}
          </Dialog>
        </>
      )}
    </AnimatePresence>
  );
}
