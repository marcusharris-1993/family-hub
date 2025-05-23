const binConfig = {
  maxUpcoming: 3,
  icons: {
    green: "green_bin.png",
    black: "black_bin.png",
    brown: "brown_bin.png"
  },
  icsText: `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
PRODID://FixMyStreet//Bin Collection Calendars//EN
BEGIN:VEVENT
DTSTART;VALUE=DATE:20250523
SUMMARY:Empty Bin 240L Green
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20250530
SUMMARY:Empty Bin 240L Black
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20250530
SUMMARY:Empty Bin 240L Brown
END:VEVENT
END:VCALENDAR
  `.trim()
};
