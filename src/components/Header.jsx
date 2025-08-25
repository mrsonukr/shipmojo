import React from "react";
import { Menu } from "lucide-react";
import { IconButton, Avatar, Box, CircularProgress, Typography } from "@mui/material";
import SearchBar from "./SearchBar";

export default function Header() {
    const handleSearch = (value, option) => {
        console.log("Searching for:", value, "with option:", option);
    };

    return (
        <div>
            {/* Header */}
            <header className="bg-white h-[54px] flex items-center justify-between px-4 shadow-sm">
                {/* Left side - menu (hamburger) icon + search + progress */}
                <div className="flex items-center gap-6">
                    {/* Menu Icon */}
                    <IconButton aria-label="open menu" sx={{ width: 36, height: 36 }}>
                        <Menu className="text-gray-800" size={20} />
                    </IconButton>

                    <div className="hidden md:block w-[350px]">
                        <SearchBar
                            onSearch={handleSearch}
                            placeholder="Search Order by AWB ID"
                        />
                    </div>



                    {/* Circular Progress with % */}
                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                        <CircularProgress
                            variant="determinate"
                            value={25}
                            size={32}       // 🔥 32x32 size
                            thickness={4}   // halka patla arc
                            sx={{
                                color: "#0A7EA4",
                                backgroundColor: "#f3f4f6",
                                borderRadius: "50%",
                            }}
                        />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: "absolute",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                variant="caption"
                                component="div"
                                sx={{ fontSize: "10px", fontWeight: "bold", color: "#374151" }}
                            >
                                25%
                            </Typography>
                        </Box>
                    </Box>
                    <div className="w-[24px] h-[24px]">
                        <img src="https://panel.shipmozo.com/images/svgs/warn-alert.svg" alt="" />
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-primary">Notification Credits: 0</p>
                    </div>

                </div>

                {/* Right side - Avatar */}
                <IconButton
                    aria-label="profile"
                    sx={{
                        width: 54,
                        height: 54,
                        position: "relative",
                        "&:hover .MuiAvatar-root": {
                            bgcolor: "#0A7EA4",
                            color: "#fff",
                        },
                        "&:hover::before": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            borderRadius: "50%",
                            zIndex: 0,
                        },
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: "#0A7EA4",
                            width: 30,
                            height: 30,
                            fontSize: 14,
                            zIndex: 1,
                            transition: "all 0.3s ease",
                        }}
                    >
                        SK
                    </Avatar>
                </IconButton>
            </header>
        </div>
    );
}
