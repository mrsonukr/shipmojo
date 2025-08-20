import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { X } from "lucide-react";
import OtpInput from "react-otp-input";
import PopupModal from "./PopupModal";
import Button from "./Button";

export default function OTPModal({ open, onClose, phoneNumber, onVerify }) {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(59);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (open) {
      setTimeLeft(59);
      setIsResendDisabled(true);
      setOtp("");
    }
  }, [open]);

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && isResendDisabled) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isResendDisabled]);

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleResend = () => {
    setTimeLeft(59);
    setIsResendDisabled(true);
    console.log("Resending OTP...");
  };

  const handleVerify = () => {
    onVerify(otp);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
                  style={{
                    flex: 1, // equal width, auto adjust inside flex
                    minWidth: "36px", // chhoti screen me bhi readable
                    maxWidth: "56px", // bahut bada na ho
                    height: "42px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: 600,
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
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
              containerStyle={{
                display: "flex",
                gap: "4px",
                justifyContent: "center",
                width: "100%", // take full popup width
              }}
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
          className="h-8 px-6 rounded-md font-medium text-white text-xs bg-[#0A7EA4] hover:bg-[#086885]"
        >
          Verify and Continue
        </Button>
      </div>
    </PopupModal>
  );
}
