import { useState, useEffect } from "react";
import { adToBS, formatBSDateFull } from "@/lib/nepaliCalendar";

export function useNepalTime() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Nepal is UTC+5:45
  const utc = time.getTime() + time.getTimezoneOffset() * 60000;
  const nepalTime = new Date(utc + 5.75 * 3600000);
  
  const hours = nepalTime.getHours().toString().padStart(2, "0");
  const minutes = nepalTime.getMinutes().toString().padStart(2, "0");
  const seconds = nepalTime.getSeconds().toString().padStart(2, "0");

  // Convert to BS
  const bsDate = adToBS(nepalTime);
  const dateStr = formatBSDateFull(bsDate, nepalTime.getDay());

  return {
    timeStr: `${hours}:${minutes}:${seconds}`,
    dateStr,
    nepalTime,
    bsDate,
  };
}

export function useCountdown(targetDate: Date) {
  const [now, setNow] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, expired: false };
}
