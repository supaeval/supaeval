/**
 * Formats a date using the US locale format
 * @param date - The date to format
 * @returns Formatted date string (e.g., "Jan 15, 2024")
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

/**
 * Formats a date string (ISO format) using the US locale format
 * @param dateString - The date string to format
 * @returns Formatted date string (e.g., "Jan 15, 2024")
 */
export const formatDateString = (dateString: string): string => {
  return formatDate(new Date(dateString));
};
