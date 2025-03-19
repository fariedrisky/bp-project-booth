// time-utils.ts

/**
 * Calculates the end time based on start time and duration
 * @param startTime - The start time Date object
 * @param durationString - Duration string in format like "3h", "4h", etc.
 * @param timezone - Optional timezone string to append to the result
 * @returns Formatted end time string (e.g., "16:00 WIB")
 */
export const calculateEndTime = (
    startTime: Date | null,
    durationString: string | undefined,
    timezone?: string
): string => {
    if (!startTime || !durationString) {
        return "";
    }

    // Extract the number of hours from the duration string (e.g., "3h" -> 3)
    const durationMatch = durationString.match(/^(\d+)h$/);
    if (!durationMatch) {
        return "";
    }

    const durationHours = parseInt(durationMatch[1], 10);

    // Clone the start time to avoid modifying the original
    const endTime = new Date(startTime);

    // Add the duration hours
    endTime.setHours(endTime.getHours() + durationHours);

    // Format the end time as HH:MM
    const hours = endTime.getHours().toString().padStart(2, "0");
    const minutes = endTime.getMinutes().toString().padStart(2, "0");

    // Return formatted string with optional timezone
    return `${hours}:${minutes}${timezone ? ` ${timezone.toUpperCase()}` : ""}`;
};

/**
 * Format a time with optional timezone
 * @param time - The time Date object
 * @param timezone - Optional timezone string to append to the result
 * @returns Formatted time string (e.g., "13:00 WIB")
 */
export const formatTime = (time: Date | null, timezone?: string): string => {
    if (!time) {
        return "";
    }

    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}${timezone ? ` ${timezone.toUpperCase()}` : ""}`;
};