const binConfig = {
  maxUpcoming: 3,
  icons: {
    green: "assets/green_bin.png",
    black: "assets/black_bin.png",
    brown: "assets/brown_bin.png"
  },
  icsContent: `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
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
END:VCALENDAR`.trim()
};