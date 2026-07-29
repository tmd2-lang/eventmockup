import React, { useState, useRef, useEffect } from 'react';

interface AddToCalendarProps {
  title: string;
  description: string;
  location: string;
  timeFull: string;
  buttonStyle?: React.CSSProperties;
  buttonClassName?: string;
  buttonText?: string;
  wrapperStyle?: React.CSSProperties;
}

export function AddToCalendar({
  title,
  description,
  location,
  timeFull,
  buttonStyle,
  buttonClassName,
  buttonText = "Add to Calendar",
  wrapperStyle = { width: '100%' }
}: AddToCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Naive date parser for mockup time strings like 'Thu, Nov 12 at 7:30 PM - 9:00 PM (EST)'
  const parseDates = (timeStr: string) => {
    const currentYear = new Date().getFullYear();
    let start = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // default tomorrow
    let end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

    const match = timeStr.match(/(?:[A-Z][a-z]{2},\s)?([A-Z][a-z]{2} \d{1,2}) at (\d{1,2}:\d{2} [AP]M) - (\d{1,2}:\d{2} [AP]M)/);
    if (match) {
      const datePart = match[1];
      const startPart = match[2];
      const endPart = match[3];
      
      const parsedStart = new Date(`${datePart}, ${currentYear} ${startPart}`);
      const parsedEnd = new Date(`${datePart}, ${currentYear} ${endPart}`);
      
      if (!isNaN(parsedStart.getTime())) start = parsedStart;
      if (!isNaN(parsedEnd.getTime())) end = parsedEnd;
    }
    return { start, end };
  };

  const formatGoogleDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const handleGoogleCalendar = () => {
    const { start, end } = parseDates(timeFull);
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatGoogleDate(start)}/${formatGoogleDate(end)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
    window.open(googleUrl, '_blank');
    setIsOpen(false);
  };

  const handleAppleCalendar = () => {
    const { start, end } = parseDates(timeFull);
    
    // Format dates for ICS (YYYYMMDDTHHMMSSZ)
    const formatICSDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${formatICSDate(start)}`,
      `DTEND:${formatICSDate(end)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
      `LOCATION:${location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'event.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', ...wrapperStyle }} ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={buttonStyle}
        className={buttonClassName}
      >
        {buttonText}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(20, 20, 20, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          width: '200px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: 9999,
        }}>
          <button 
            onClick={handleAppleCalendar}
            style={{
              background: 'transparent',
              color: '#fff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
             Apple Calendar
          </button>
          <button 
            onClick={handleGoogleCalendar}
            style={{
              background: 'transparent',
              color: '#fff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Google Calendar
          </button>
        </div>
      )}
    </div>
  );
}
