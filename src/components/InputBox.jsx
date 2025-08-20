import React, { useState, useCallback } from "react";
import {
  TextField,
  InputAdornment,
  Box,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import {
  User,
  Mail,
  Eye,
  EyeOff,
  LockKeyhole,
  Phone,
  CheckCircle,
} from "lucide-react";

// Color constants
const COLORS = {
  primary: "#0A7EA4",
  error: "#f97316",
  border: "#d1d5db",
  background: "#EAEFF4",
  text: "#6b7280",
};

// Icon mapping
const ICONS = {
  email: Mail,
  password: LockKeyhole,
  emailOrPhone: User,
  phone: Phone,
  name: User,
  confirmPassword: LockKeyhole,
  default: User,
};

export default function InputBox({
  type = "default", // input type
  value: externalValue,
  onChange: externalOnChange,
  placeholder,
  label,
  error: externalError,
  onErrorChange,
  showPasswordToggle = true, // Only for password
  required = false,
  options = [], // For select type
  onVerify, // For phone verification
  ...props
}) {
  const [internalValue, setInternalValue] = useState("");
  const [internalError, setInternalError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // external or internal state
  const value = externalValue ?? internalValue;
  const error = externalError ?? internalError;

  // icon mapping
  const IconComponent = ICONS[type] || ICONS.default;

  // default placeholders & labels
  const defaultPlaceholder =
    type === "email"
      ? "Enter your email"
      : type === "password"
      ? "Enter your password"
      : type === "emailOrPhone"
      ? "Enter your email or phone"
      : type === "phone"
      ? "Enter your phone number"
      : type === "name"
      ? "Enter your full name"
      : type === "confirmPassword"
      ? "Confirm your password"
      : type === "select"
      ? "Select an option"
      : "Enter your input";

  const defaultLabel =
    type === "email"
      ? "Email"
      : type === "password"
      ? "Password"
      : type === "emailOrPhone"
      ? "Email or phone"
      : type === "phone"
      ? "Phone"
      : type === "name"
      ? "Name"
      : type === "confirmPassword"
      ? "Confirm Password"
      : type === "select"
      ? "Select"
      : "Input";

  // validation
  const validateField = useCallback(
    (val) => {
      if (type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return val.trim() === "" || !emailRegex.test(val);
      }
      if (type === "emailOrPhone") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return (
          val.trim() === "" ||
          (!emailRegex.test(val) && !phoneRegex.test(val))
        );
      }
      if (type === "phone") {
        const phoneRegex = /^[6-9]\d{9}$/;
        return val.trim() === "" || !phoneRegex.test(val);
      }
      if (type === "name") {
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        return val.trim() === "" || !nameRegex.test(val.trim());
      }
      if (type === "confirmPassword") {
        return val.trim() === "";
      }
      if (type === "select") {
        return val === "" || val === undefined;
      }
      return val.trim() === "";
    },
    [type]
  );

  const handleChange = useCallback(
    (e) => {
      let newValue = e.target.value;
      
      // Phone number validation and formatting
      if (type === "phone") {
        // Remove ALL non-numeric characters immediately
        newValue = newValue.replace(/[^0-9]/g, '');
        
        // Limit to exactly 10 digits
        if (newValue.length > 10) {
          newValue = newValue.slice(0, 10);
        }
        
        // Check if starts with valid digit (6, 7, 8, 9)
        if (newValue.length > 0 && !/^[6-9]/.test(newValue)) {
          newValue = '';
        }
      }
      
      const newError = validateField(newValue);

      if (externalOnChange) {
        // Create a new event with the cleaned value
        const newEvent = {
          ...e,
          target: {
            ...e.target,
            value: newValue
          }
        };
        externalOnChange(newEvent);
      } else {
        setInternalValue(newValue);
      }

      if (onErrorChange) {
        onErrorChange(newError);
      } else {
        setInternalError(newError);
      }
    },
    [externalOnChange, onErrorChange, validateField, type]
  );

  const handleBlur = useCallback(() => {
    const newError = validateField(value);
    if (onErrorChange) {
      onErrorChange(newError);
    } else {
      setInternalError(newError);
    }
  }, [value, onErrorChange, validateField]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // styles for TextField
  const styles = {
    "& .MuiOutlinedInput-root": {
      height: 42,
      paddingLeft: 0,
      paddingRight: type === "password" ? 0 : undefined,
      borderRadius: "8px",
      "& input": {
        height: "42px",
        padding: "0 12px",
        fontSize: "12px",
        // Remove autofill background color
        "&:-webkit-autofill": {
          "-webkit-box-shadow": "0 0 0 1000px white inset !important",
          "-webkit-text-fill-color": "inherit !important",
        },
        "&:-webkit-autofill:hover": {
          "-webkit-box-shadow": "0 0 0 1000px white inset !important",
        },
        "&:-webkit-autofill:focus": {
          "-webkit-box-shadow": "0 0 0 1000px white inset !important",
        },
      },
      "& fieldset": {
        borderColor: error ? COLORS.error : COLORS.border,
      },
      "&:hover fieldset": {
        borderColor: error ? COLORS.error : COLORS.primary,
      },
      "&.Mui-focused fieldset": {
        borderColor: error ? COLORS.error : COLORS.primary,
      },
      "&.Mui-focused:hover fieldset": {
        borderColor: error ? COLORS.error : COLORS.primary,
      },
    },
  };

  // styles for Select
  const selectStyles = {
    height: "42px !important",
    "& .MuiOutlinedInput-root": {
      height: "42px !important",
      minHeight: "42px !important",
      maxHeight: "42px !important",
      paddingLeft: "12px",
      borderRadius: "8px",
      "& fieldset": {
        borderColor: error ? COLORS.error : COLORS.border,
        borderRadius: "8px",
      },
      "&:hover fieldset": {
        borderColor: error ? COLORS.error : "#0A7EA4",
      },
      "&.Mui-focused fieldset": {
        borderColor: error ? COLORS.error : "#0A7EA4",
        borderWidth: "2px",
      },
      "&.Mui-focused:hover fieldset": {
        borderColor: error ? COLORS.error : "#0A7EA4",
      },
    },
    "& .MuiSelect-select": {
      height: "42px !important",
      minHeight: "42px !important",
      maxHeight: "42px !important",
      padding: "0 12px",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      lineHeight: "42px",
    },
    "& .MuiSelect-icon": {
      color: "#6b7280",
      fontSize: "20px",
    },
    // Force override Material-UI's default focus styles with !important
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: `${error ? COLORS.error : "#0A7EA4"} !important`,
      borderWidth: "2px !important",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: `${error ? COLORS.error : "#0A7EA4"} !important`,
    },
    "& .MuiOutlinedInput-root.Mui-focused:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: `${error ? COLORS.error : "#0A7EA4"} !important`,
    },
    // Additional specific overrides
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: error ? COLORS.error : COLORS.border,
      borderRadius: "8px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: `${error ? COLORS.error : "#0A7EA4"} !important`,
      borderRadius: "8px",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: `${error ? COLORS.error : "#0A7EA4"} !important`,
      borderWidth: "2px !important",
      borderRadius: "8px",
    },
  };

  const iconBoxStyles = {
    backgroundColor: COLORS.background,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 42,
    height: 42,
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
  };

  const getErrorMessage = () => {
    if (type === "email") {
      return value.trim() === ""
        ? "Email is required"
        : "Please enter a valid email";
    }
    if (type === "emailOrPhone") {
      return value.trim() === ""
        ? "Email or Phone is required"
        : "Please enter a valid email or phone number";
    }
    if (type === "phone") {
      return value.trim() === ""
        ? "Phone number is required"
        : "Please enter a valid phone number";
    }
    if (type === "name") {
      return value.trim() === ""
        ? "Name is required"
        : "Please enter a valid name (2-50 characters)";
    }
    if (type === "confirmPassword") {
      return value.trim() === ""
        ? "Confirm Password is required"
        : "Please confirm your password";
    }
    if (type === "select") {
      return "Please select an option";
    }
    return `${label || defaultLabel} is required`;
  };

  // --- Select Box render ---
  if (type === "select") {
    return (
      <div>
        <label
          htmlFor={`input-${type}`}
          className="block text-xs font-medium text-gray-700 mb-2"
        >
          {label || defaultLabel}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <FormControl fullWidth>
          <Select
            id={`input-${type}`}
            name={`input-${type}`}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            sx={selectStyles}
            MenuProps={{
              PaperProps: {
                sx: {
                  boxShadow: "none",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  "& .MuiMenuItem-root": {
                    fontSize: "11px",
                    padding: "8px 12px",
                    "&:hover": {
                      backgroundColor: "#0A7EA425 !important",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#0A7EA414 !important",
                      "&:hover": {
                        backgroundColor: "#0a7da450 !important",
                      },
                    },
                  },
                },
              },
            }}
            {...props}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {error && (
          <p className="text-[10px] text-orange-500 mt-1">
            {getErrorMessage()}
          </p>
        )}
      </div>
    );
  }

  // --- Normal Input render ---
  return (
    <div>
      <label
        htmlFor={`input-${type}`}
        className="block text-xs font-medium text-gray-700 mb-2"
      >
        {label || defaultLabel}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <TextField
        id={`input-${type}`}
        name={`input-${type}`}
        type={
          type === "phone" 
            ? "tel"
            : type === "password" || type === "confirmPassword"
            ? showPassword
              ? "text"
              : "password"
            : "text"
        }
        placeholder={placeholder || defaultPlaceholder}
        variant="outlined"
        fullWidth
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        inputProps={{ 
          maxLength: type === "phone" ? 10 : 100,
          pattern: type === "phone" ? "[6-9][0-9]{9}" : undefined,
          inputMode: type === "phone" ? "numeric" : "text",
          type: type === "phone" ? "tel" : "text"
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ marginRight: 0 }}>
              {type === "phone" ? (
                <Box sx={iconBoxStyles}>
                  <span className="text-gray-600 text-xs font-medium">
                    +91
                  </span>
                </Box>
              ) : (
                <Box sx={iconBoxStyles}>
                  <IconComponent size={18} className="text-gray-600" />
                </Box>
              )}
            </InputAdornment>
          ),
          endAdornment: (
            <>
              {type === "password" && showPasswordToggle ? (
                <InputAdornment position="end" sx={{ marginRight: 0 }}>
                  <Box
                    sx={{
                      backgroundColor: COLORS.background,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 42,
                      height: 42,
                      borderTopRightRadius: "8px",
                      borderBottomRightRadius: "8px",
                    }}
                  >
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      size="small"
                      sx={{
                        padding: "8px",
                        "& .MuiTouchRipple-root": {
                          borderRadius: "16px",
                        },
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.04)",
                        },
                      }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </IconButton>
                  </Box>
                </InputAdornment>
              ) : type === "phone" && value && value.length === 10 && /^[6-9]\d{9}$/.test(value) ? (
                <InputAdornment position="end" sx={{ marginRight: 0 }}>
                  <Button
                    onClick={() => onVerify && onVerify(value)}
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#f97316",
                      height: 28,
                      fontSize: "11px",
                      padding: "0 16px",
                      marginRight: "-5px",
                      borderRadius: "50px",
                      textTransform: "none",
                      minWidth: "auto",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#ea580c",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Verify
                  </Button>
                </InputAdornment>
              ) : null}
            </>
          ),
        }}
        sx={styles}
        {...props}
      />
      {error && (
        <p className="text-[10px] text-orange-500 mt-1">
          {getErrorMessage()}
        </p>
      )}
    </div>
  );
}
