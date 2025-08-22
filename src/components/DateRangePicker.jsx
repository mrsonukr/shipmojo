import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";

const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

export default function DateRangePicker
({ open, onClose }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);

  // Days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysArray = Array.from({ length: firstDay }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const handleDayClick = (day) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(new Date(year, month, day));
      setSelectedEnd(null);
    } else {
      const endDate = new Date(year, month, day);
      if (endDate < selectedStart) {
        setSelectedStart(endDate);
        setSelectedEnd(null);
      } else {
        setSelectedEnd(endDate);
      }
    }
  };

  const isInRange = (day) => {
    if (!selectedStart || !selectedEnd) return false;
    const date = new Date(year, month, day);
    return date >= selectedStart && date <= selectedEnd;
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent>
        {/* Predefined Ranges */}
        <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
          {["Today","Yesterday","This Week","Last Week","This Month","Last Month"].map((label, idx) => (
            <Button key={idx} variant="outlined" size="small">
              {label}
            </Button>
          ))}
        </Box>

        {/* Month Year Selector */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <IconButton
            onClick={() => {
              if (month === 0) {
                setMonth(11);
                setYear(year - 1);
              } else {
                setMonth(month - 1);
              }
            }}
          >
            <ChevronLeft />
          </IconButton>

          <Box display="flex" gap={1}>
            <Select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              size="small"
            >
              {months.map((m, i) => (
                <MenuItem key={i} value={i}>{m}</MenuItem>
              ))}
            </Select>
            <Select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              size="small"
            >
              {Array.from({ length: 20 }, (_, i) => 2015 + i).map((y) => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </Box>

          <IconButton
            onClick={() => {
              if (month === 11) {
                setMonth(0);
                setYear(year + 1);
              } else {
                setMonth(month + 1);
              }
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>

        {/* Calendar */}
        <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" textAlign="center" mb={1}>
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d, i) => (
            <Typography key={i} variant="body2" fontWeight="bold">
              {d}
            </Typography>
          ))}
        </Box>
        <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
          {daysArray.map((day, i) =>
            day ? (
              <Button
                key={i}
                variant={
                  selectedStart?.getDate() === day && selectedStart?.getMonth() === month
                    ? "contained"
                    : selectedEnd?.getDate() === day && selectedEnd?.getMonth() === month
                    ? "contained"
                    : isInRange(day)
                    ? "outlined"
                    : "text"
                }
                size="small"
                onClick={() => handleDayClick(day)}
              >
                {day}
              </Button>
            ) : (
              <span key={i}></span>
            )
          )}
        </Box>

        {/* Selected Dates */}
        <Typography variant="body2" mt={2}>
          {selectedStart && selectedEnd
            ? `${selectedStart.toLocaleDateString()} → ${selectedEnd.toLocaleDateString()}`
            : selectedStart
            ? `Start: ${selectedStart.toLocaleDateString()}`
            : "No dates selected"}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            setSelectedStart(null);
            setSelectedEnd(null);
          }}
        >
          Reset
        </Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onClose}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
