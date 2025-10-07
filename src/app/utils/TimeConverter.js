export default function formatTime12Hour(time24) {
  if (!time24) return "N/A";
  const [hours, minutes] = time24.split(":");
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${minutes} ${ampm}`;
}
