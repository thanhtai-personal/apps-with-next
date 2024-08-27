export const getStartOfDay = (date: Date): Date => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  return startOfDay;
};

export const getStartOfMonth = (date: Date): Date => {
  const startOfMonth = new Date(date);
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  return startOfMonth;
};

export const getStartOfYear = (date: Date): Date => {
  const startOfYear = new Date(date);
  startOfYear.setMonth(0); // January (0-indexed month)
  startOfYear.setDate(1); // First day of the month
  startOfYear.setHours(0, 0, 0, 0); // Start of the day
  return startOfYear;
};

export const getEndOfDay = (date: Date): Date => {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999); // Set to end of the day
  return endOfDay;
};

export const getEndOfMonth = (date: Date): Date => {
  const endOfMonth = new Date(date);
  endOfMonth.setMonth(date.getMonth() + 1); // Move to next month
  endOfMonth.setDate(0); // Set to last day of current month
  endOfMonth.setHours(23, 59, 59, 999); // Set to end of the day
  return endOfMonth;
};

export const getEndOfYear = (date: Date): Date => {
  const endOfYear = new Date(date);
  endOfYear.setFullYear(date.getFullYear() + 1); // Move to next year
  endOfYear.setMonth(0); // January (0-indexed month)
  endOfYear.setDate(0); // Set to last day of December
  endOfYear.setHours(23, 59, 59, 999); // Set to end of the day
  return endOfYear;
};

export const isLaterDate = (sourceDate: Date, targetDate: Date): boolean => {
  return sourceDate.getTime() >= targetDate.getTime();
};
