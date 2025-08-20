import React from "react";
import { Button as MuiButton } from "@mui/material";

// Color constants (matching InputBox)
const COLORS = {
  primary: "#0A7EA4",
  error: "#f97316",
  border: "#d1d5db",
  background: "#EAEFF4",
  text: "#6b7280",
};

export default function Button({
  children,
  variant = "outlined", // outlined, filled
  color = "primary", // primary, error
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  type = "button",
  className = "",
  ...props
}) {
  // Button styles - outlined and filled variants
  const getButtonStyles = () => {
    const baseStyles = {
      borderRadius: "8px",
      textTransform: "none",
      fontWeight: 500,
      fontSize: "12px",
      fontWeight: 600,
      height: "38px",
      padding: "8px 24px",
      boxShadow: "none",
      "&:active": {
        // No transform to prevent position change
      },
    };

    // Outlined variant (default)
    if (variant === "outlined") {
      return {
        ...baseStyles,
        backgroundColor: "transparent",
        border: `1px solid ${color === "primary" ? COLORS.primary : COLORS.error}`,
        color: color === "primary" ? COLORS.primary : COLORS.error,
        "&:hover": {
          backgroundColor: color === "primary" ? COLORS.primary : COLORS.error,
          color: "white",
          boxShadow: `0 2px 8px ${color === "primary" ? "rgba(10, 126, 164, 0.2)" : "rgba(249, 115, 22, 0.2)"}`,
        },
        "&:disabled": {
          backgroundColor: "transparent",
          borderColor: "#e5e7eb",
          color: "#9ca3af",
          boxShadow: "none",
        },
      };
    }

    // Filled variant
    if (variant === "filled") {
      return {
        ...baseStyles,
        backgroundColor: color === "primary" ? COLORS.primary : COLORS.error,
        color: "white",
        border: "none",
        "&:hover": {
          backgroundColor: color === "primary" ? "#086a8a" : "#ea580c",
          boxShadow: `0 2px 8px ${color === "primary" ? "rgba(10, 126, 164, 0.2)" : "rgba(249, 115, 22, 0.2)"}`,
        },
        "&:disabled": {
          backgroundColor: "#e5e7eb",
          color: "#9ca3af",
          boxShadow: "none",
        },
      };
    }

    return baseStyles;
  };

  return (
    <MuiButton
      variant={variant === "filled" ? "contained" : "outlined"}
      disabled={disabled}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      type={type}
      className={className}
      sx={getButtonStyles()}
      {...props}
    >
      {children}
    </MuiButton>
  );
}

