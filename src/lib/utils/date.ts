/**
 * Get time-based greeting message
 * @returns Greeting based on current hour
 */
export function getGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 5) {
    return "Good night";
  } else if (hour < 12) {
    return "Good morning";
  } else if (hour < 17) {
    return "Good afternoon";
  } else if (hour < 21) {
    return "Good evening";
  } else {
    return "Good night";
  }
}

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param date - Date to compare
 * @returns Relative time string
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;

  return date.toLocaleDateString();
}

export const formatDate = (
  dateString: string | undefined | null,
  includeTime: boolean = false,
): string => {
  if (!dateString) return ""; // Handle jika dateString kosong

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Handle jika bukan format tanggal valid

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  let formattedDate = `${day}/${month}/${year}`;

  if (includeTime) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    formattedDate += ` ${hours}:${minutes}:${seconds}`;
  }

  return formattedDate;
};

export function getDateNowYmdHis() {
  const now = new Date();

  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1); // Bulan dimulai dari 0
  const day = pad(now.getDate());
  const hour = pad(now.getHours());
  const minute = pad(now.getMinutes());
  const second = pad(now.getSeconds());

  return `${year}${month}${day}${hour}${minute}${second}`;
}
