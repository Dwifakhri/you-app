const data = [
  { start: "03-21", end: "04-19", zodiac: "Ram", horoscope: "Aries" },
  { start: "04-22", end: "05-20", zodiac: "Bull", horoscope: "Taurus" },
  { start: "05-21", end: "06-21", zodiac: "Twins", horoscope: "Gemini" },
  { start: "06-22", end: "07-22", zodiac: "Crab", horoscope: "Cancer" },
  { start: "07-23", end: "08-22", zodiac: "Lion", horoscope: "Leo" },
  { start: "08-23", end: "09-23", zodiac: "Virgin", horoscope: "Virgo" },
  { start: "09-23", end: "10-21", zodiac: "Balance", horoscope: "Libra" },
  { start: "10-24", end: "11-21", zodiac: "Scorpion", horoscope: "Scorpius" },
  {
    start: "11-22",
    end: "12-21",
    zodiac: "Archer",
    horoscope: "Sagittarius",
  },
  { start: "12-22", end: "01-19", zodiac: "Goat", horoscope: "Capriconus" },
  {
    start: "01-20",
    end: "02-18",
    zodiac: "Water Bearer",
    horoscope: "Aquarius",
  },
  { start: "02-19", end: "03-20", zodiac: "Fish", horoscope: "Pisces" },
];

export const generateZodiac = (date: string, zodiac = true) => {
  const dateX = new Date(date);
  const year = dateX.getFullYear().toString();
  let result;
  data.forEach((item, i) => {
    const [monthStart, dateStart] = item.start.split("-");
    const [monthEnd, dateEnd] = item.end.split("-");
    const currentYear = dateX.getFullYear();
    const current = new Date(currentYear, dateX.getMonth(), dateX.getDate());

    let start, end;

    if (+monthStart > +monthEnd) {
      start = new Date(currentYear - 1, +monthStart - 1, +dateStart);
      end = new Date(currentYear, +monthEnd - 1, +dateEnd);
    } else {
      start = new Date(currentYear, +monthStart - 1, +dateStart);
      end = new Date(currentYear, +monthEnd - 1, +dateEnd);
    }

    if (current >= start && current <= end) {
      result = zodiac ? item.zodiac : item.horoscope;
      return;
    }
  });
  return result;
};
