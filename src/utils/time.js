/**
 * CNK Time - A Professional, Lightweight Date/Time Utility
 */
class CNKTime {
  constructor(date, timezone = "Asia/Yangon") {
    this.date = date ? new Date(date) : new Date();
    this.timezone = timezone;

    if (isNaN(this.date.getTime())) {
      throw new Error("Invalid Date provided to cnk.time()");
    }
  }

  /**
   * Format Method (Supports AM/PM & Timezones)
   * Pattern keys: YYYY, MM, DD, HH, mm, ss, A (AM), a (am)
   */
  format(pattern = "YYYY-MM-DD") {
    const is12Hour = pattern.includes("A") || pattern.includes("a");

    const options = {
      timeZone: this.timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: is12Hour,
    };

    const formatter = new Intl.DateTimeFormat("en-GB", options);
    const parts = formatter.formatToParts(this.date);
    const d = {};
    parts.forEach(({ type, value }) => (d[type] = value));

    const ampm = d.dayPeriod || "";

    const map = {
      YYYY: d.year,
      MM: d.month,
      DD: d.day,
      HH: d.hour,
      mm: d.minute,
      ss: d.second,
      A: ampm.toUpperCase(),
      a: ampm.toLowerCase(),
    };

    return pattern.replace(
      /YYYY|MM|DD|HH|mm|ss|A|a/g,
      (matched) => map[matched],
    );
  }

  startOfMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    this.date.setHours(0, 0, 0, 0);
    return this;
  }

  endOfMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    this.date.setHours(23, 59, 59, 999);
    return this;
  }

  last(days) {
    this.date.setDate(this.date.getDate() - days);
    return this;
  }

  next(days) {
    this.date.setDate(this.date.getDate() + days);
    return this;
  }

  ago() {
    const seconds = Math.floor((new Date() - this.date) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };
    for (const [unit, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value);
      if (count >= 1) return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
    }
    return "just now";
  }

  clone() {
    return new CNKTime(this.date.getTime(), this.timezone);
  }

  unix() {
    return Math.floor(this.date.getTime() / 1000);
  }
}

const time = (timezone = "Asia/Yangon", date = null) =>
  new CNKTime(date, timezone);
export default time;
