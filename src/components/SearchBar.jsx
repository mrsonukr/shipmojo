import React, { useState, useCallback } from "react";
import {
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

// Color constants (same as InputBox.jsx)
const COLORS = {
  primary: "#0A7EA4",
  error: "#f97316",
  border: "#d1d5db",
  background: "#EAEFF4",
  text: "#6b7280",
};

export default function SearchBar({
  searchOptions = [
    { value: "awb", label: "AWB ID" },
    { value: "order", label: "Order ID" },
    { value: "customer", label: "Customer Reviews" },
    { value: "phone", label: "Phone" },
  ],
  selectedOption,
  onOptionChange,
  searchValue,
  onSearchChange,
  placeholder = "Search Order by AWB ID",
  onSearch,
  error = false,
  ...props
}) {
  const [internalOption, setInternalOption] = useState(searchOptions[0]?.value || "awb");
  const [internalSearchValue, setInternalSearchValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Use external or internal state
  const currentOption = selectedOption ?? internalOption;
  const currentSearchValue = searchValue ?? internalSearchValue;

  const handleOptionChange = useCallback((e) => {
    const newOption = e.target.value;
    if (onOptionChange) {
      onOptionChange(newOption);
    } else {
      setInternalOption(newOption);
    }
  }, [onOptionChange]);

  const handleSearchChange = useCallback((e) => {
    const newValue = e.target.value;
    if (onSearchChange) {
      onSearchChange(newValue);
    } else {
      setInternalSearchValue(newValue);
    }
  }, [onSearchChange]);

  const handleSearch = useCallback((e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(currentSearchValue, currentOption);
    }
  }, [currentSearchValue, currentOption, onSearch]);

  // Styles for the combined search bar
  const searchBarStyles = {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${isInputFocused ? (error ? COLORS.error : COLORS.primary) : (error ? COLORS.error : COLORS.border)}`,
    borderRadius: "18px",
    overflow: "hidden",
    height: "40px",
    ...(isInputFocused && {
      boxShadow: `0 0 0 1px ${error ? COLORS.error : COLORS.primary}`,
    }),
    "&:hover": {
      borderColor: error ? COLORS.error : COLORS.primary,
    },
  };

  // Styles for the select dropdown
  const selectStyles = {
    minWidth: "60px",
    height: "42px",
    "& .MuiOutlinedInput-root": {
      height: "42px",
      border: "none",
      borderRadius: 0,
      backgroundColor: COLORS.background,
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
    "& .MuiSelect-select": {
      height: "42px",
      padding: "0 12px",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      color: "#374151",
      fontWeight: "500",
    },
    "& .MuiSelect-icon": {
      color: "#6b7280",
      fontSize: "16px",
    },
  };

  // Styles for the input field
  const inputStyles = {
    flex: 1,
    "& .MuiOutlinedInput-root": {
      height: "42px",
      border: "none",
      borderRadius: 0,
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
      "& input": {
        height: "42px",
        padding: "0 6px",
        fontSize: "12px",
        "&:-webkit-autofill": {
          "-webkit-box-shadow": "0 0 0 1000px white inset !important",
          "-webkit-text-fill-color": "inherit !important",
        },
      },
    },

  };

  return (
    <div>
      <Box sx={searchBarStyles}>
        {/* Select Dropdown */}
        <FormControl sx={selectStyles}>
          <Select
            value={currentOption}
            onChange={handleOptionChange}
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
          >
            {searchOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Search Input */}
        <TextField
          placeholder={placeholder}
          value={currentSearchValue}
          onChange={handleSearchChange}
          onKeyPress={handleSearch}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          sx={inputStyles}
          {...props}
        />
      </Box>
      {error && (
        <p className="text-[10px] text-orange-500 mt-1">
          Please enter a valid search term
        </p>
      )}
    </div>
  );
}
