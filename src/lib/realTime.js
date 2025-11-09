// real time day hour minute second

import { useState, useEffect } from "react";

export const realTime = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return time;
};

export const useRealTimeFormatted = () => {
    const now = realTime();
    const pad = (n) => String(n).padStart(2, '0');
    const day = now.getDate();
    const h12 = (now.getHours() % 12) || 12;
    const m = pad(now.getMinutes());
    const s = pad(now.getSeconds());
    const time12 = `${h12}:${m}:${s}`;
    const time24 = `${pad(now.getHours())}:${m}:${s}`;
    const label = `Today ${day} • ${time12}`;
    return { now, day, time12, time24, label };
};
