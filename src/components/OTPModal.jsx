import React, { useState, useEffect, useCallback } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import { X } from "lucide-react";
import OtpInput from "react-otp-input";
import PopupModal from "./PopupModal";
import Button from "./Button";

export default function OTPModal({ open, onClose, phoneNumber, onVerify }) {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(59);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setTimeLeft(59);
      setIsResendDisabled(true);
      setOtp("");
      setIsVerifying(false);
    }
  }, [open]);

  // Timer effect
  useEffect(() => {
    let timer;
    if (timeLeft > 0 && isResendDisabled) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isResendDisabled]);

  const handleOtpChange = useCallback((value) => {
    setOtp(value);
  }, []);

  const handleResend = useCallback(() => {
    setTimeLeft(59);
    setIsResendDisabled(true);
    console.log("Resending OTP...");
  }, []);

  const handleVerify = useCallback(() => {
    if (!otp || otp.length !== 6) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onVerify(otp);
    }, 2000);
  }, [otp, onVerify]);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const buttonStyles = {
    height: "32px !important",
    padding: "6px 20px !important",
    fontSize: "12px !important",
    borderRadius: "6px !important",
    backgroundColor: "#0A7EA4 !important",
    color: "white !important",
    boxShadow: "none !important",
    textTransform: "none !important",
    "&:hover": {
      backgroundColor: "#086a8a !important",
      boxShadow: "none !important"
    }
  };

  const inputStyles = {
    flex: 1,
    minWidth: "36px",
    maxWidth: "56px",
    height: "42px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: 600,
    outline: "none",
    transition: "border-color 0.2s",
  };

  const containerStyles = {
    display: "flex",
    gap: "4px",
    justifyContent: "center",
    width: "100%",
  };

  return (
    <PopupModal open={open} onClose={onClose} customSize={{ width: "444px" }}>
      {/* Header */}
      <div className="relative px-6 py-3 border-b border-gray-200">
        <h2 className="m-0 font-semibold text-gray-900">
          Phone number verification
        </h2>
        <IconButton
          onClick={onClose}
          sx={{
            color: "#6b7280",
            padding: "8px",
            "&:hover": { backgroundColor: "rgba(107,114,128,0.1)" },
          }}
          className="!absolute top-[8px] right-[8px]"
        >
          <X size={18} />
        </IconButton>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <p className="text-gray-700 mb-4 text-xs leading-relaxed m-0">
          We sent a verification code to your mobile number{" "}
          {phoneNumber}. Enter the code in
          below fields to continue.
        </p>

        <div className="mb-4">
          <p className="text-gray-800 mb-3 text-xs font-medium m-0">
            Type your 6 digits OTP
          </p>

          <div className="flex gap-2 justify-center">
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              renderSeparator={<span style={{ width: "8px" }}></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={inputStyles}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0A7EA4";
                    e.target.style.borderWidth = "2px";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.borderWidth = "1px";
                  }}
                />
              )}
              containerStyle={containerStyles}
            />
          </div>
        </div>

        <div className="flex justify-start">
          <p
            className={`text-xs m-0 ${isResendDisabled
              ? "text-gray-800 cursor-default"
              : "text-gray-800 cursor-pointer"
              }`}
            onClick={!isResendDisabled ? handleResend : undefined}
          >
            {isResendDisabled ? (
              <>
                Resend code after{" "}
                <span className="text-[#0A7EA4] font-medium">
                  {formatTime(timeLeft)} sec
                </span>
              </>
            ) : (
              <>
                Didn't get the code?{" "}
                <span className="text-[#0A7EA4] underline font-medium cursor-pointer">
                  Resend
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-6  py-3 flex justify-end">
        <Button
          onClick={handleVerify}
          variant="filled"
          color="primary"
          disabled={isVerifying || !otp || otp.length !== 6}
          sx={buttonStyles}
        >
          <div className="flex items-center space-x-2">
            {isVerifying && <CircularProgress size={14} sx={{ color: 'white' }} />}
            <span>Verify and Continue</span>
          </div>
        </Button>
      </div>
    </PopupModal>
  );
}
