export default function timeAgo(timestamp: string): string {
    const pastTime = new Date(timestamp);
    const currentTime = new Date();
    const timeDiff = (currentTime.getTime() - pastTime.getTime()) / 1000;
  
    const seconds = Math.floor(timeDiff);
    const minutes = Math.floor(timeDiff / 60);
    const hours = Math.floor(timeDiff / 3600);
    const days = Math.floor(timeDiff / 86400);
  
    if (seconds < 60) {
      return `${seconds}s`;
    } else if (minutes < 60) {
      return minutes === 1 ? "1m" : `${minutes}mn`;
    } else if (hours < 24) {
      return hours === 1 ? "1h" : `${hours}h`;
    } else {
      return days === 1 ? "1j" : `${days} jours`;
    }
  }