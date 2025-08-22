import React, { useState } from 'react'
// import DateRangePicker from "../components/DateRangePicker"
import { Button } from "@mui/material"
import { Calendar } from "lucide-react"

const Home = () => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const topCards = [
        {
            title: "New Orders",
            count: 0,
            icon: "https://panel.shipmozo.com/_next/static/media/box-open.dc3048ef.svg",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-500",
            textColor: "text-blue-700"
        },
        {
            title: "Courier Assigned",
            count: 0,
            icon: "https://panel.shipmozo.com/_next/static/media/box-packed.b51c5482.svg",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-500",
            textColor: "text-orange-700"
        },
        {
            title: "Scheduled",
            count: 0,
            icon: "https://panel.shipmozo.com/_next/static/media/box-time.8948f8a9.svg",
            bgColor: "bg-teal-50",
            borderColor: "border-teal-500",
            textColor: "text-teal-700"
        },
        {
            title: "All Orders",
            count: 0,
            icon: "https://panel.shipmozo.com/_next/static/media/boxes.35a2983e.svg",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-500",
            textColor: "text-blue-700"
        },
        {
            title: "Customer Returns",
            count: 0,
            icon: "https://panel.shipmozo.com/_next/static/media/box-return.a403cec2.svg",
            bgColor: "bg-pink-50",
            borderColor: "border-red-500",
            textColor: "text-red-700"
        },
        {
            title: "RTO",
            count: 0,
            icon: "https://panel.shipmozo.com/_next/static/media/box-return-origin.c2d97400.svg",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-500",
            textColor: "text-yellow-700"
        }
    ];

    return (
        <div className='p-4'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                {topCards.map((card, index) => (
                    <div 
                        key={index}
                        className={`${card.bgColor} rounded-2xl border ${card.borderColor} h-[135px] w-full flex flex-col items-center justify-center cursor-pointer`}
                    >
                        <img 
                            className='w-[50px] h-[50px] mb-2' 
                            src={card.icon} 
                            alt={card.title}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                        />
                        <div 
                            className='w-[50px] h-[50px] mb-2 hidden items-center justify-center text-2xl'
                            style={{ color: card.textColor.replace('text-', '').replace('-600', '') }}
                        >
                            
                        </div>
                        <p className={`text-sm font-medium ${card.textColor}`}>{card.title}</p>
                        <p className={`font-bold text-sm ${card.textColor}`}>{card.count}</p>
                    </div>
                ))}
                        </div>
            
            {/* Date Range Picker Section
            <div className="mt-6 mb-4">
                <Button
                    variant="outlined"
                    startIcon={<Calendar size={20} />}
                    onClick={() => setIsDatePickerOpen(true)}
                    sx={{
                        borderColor: '#0A7EA4',
                        color: '#0A7EA4',
                        '&:hover': {
                            borderColor: '#0A7EA4',
                            backgroundColor: '#0A7EA410'
                        }
                    }}
                >
                    Select Date Range
                </Button> */}
            {/* </div> */}
            
            {/* <DateRangePicker 
                open={isDatePickerOpen} 
                onClose={() => setIsDatePickerOpen(false)}
            /> */}
        </div>
    )
}

export default Home