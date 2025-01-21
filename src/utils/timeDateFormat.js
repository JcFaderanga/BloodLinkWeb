// 1year (365 days x 24 hours x 60 minutes x 60 seconds)
// 1 month (30 days x 24 hours x 60 minutes x 60 seconds)
// 1 week (7 days x 24 hours x 60 minutes x 60 seconds)
// 1 day (24 hours x 60 minutes x 60 seconds)
// 1hour (60 minutes x 60 seconds)



export const TimeAgo = (timestamp) => {
    if(!timestamp) return;
    const time = [31536000, 2592000, 604800, 86400, 3600, 60];
    const date = ['year', 'month', 'week', 'day', 'hour', 'minute'];
    const now = new Date();
    const postDate = new Date(timestamp);
    const seconds = Math.floor((now - postDate) / 1000);
  
    for (let i = 0; i < time.length; i++) {
        const interval = Math.floor(seconds / time[i]);
        if (interval >= 1) {
            return `${interval} ${date[i]}${interval === 1 ? '' : 's'} ago`;
        }
    }
    return 'just now';
  };
  
  export const TimeToGo = (isoString) => {
    if (!isoString) {
      return "Date not valid";
    }
  
    const targetDate = new Date(isoString);
    if (isNaN(targetDate.getTime())) {
      return "Invalid date format.";
    }
  
    const now = new Date();
  
    // Check if the current time is the target date and time
    if (now.toDateString() === targetDate.toDateString()) {
      return "It's time";
    }
  
    // If the current time is after the target date
    if (now > targetDate) {
      return "Missed Schedule";
    }
  
    const timeDiff = targetDate - now;
  
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  
    if (days > 0) return `${days} ${days === 1 ? "day to go" : "days to go"}`;
    if (hours > 0) return `${hours} ${hours === 1 ? "hour to go" : "hours to go"}`;
  };
  
  
  export const LongDateFormat = (date) => {
      return date ? date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) : 'Select Date';
    };
  
  
    export const DayAndDate =(inputDate)=> {
      if (!inputDate) {
        return "Date not valid";
      }
      const date = new Date(inputDate);
    
      const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long', 
        month: 'long',   
        day: 'numeric'   
      });
    
      return formatter.format(date); 
    }
  
    export const CalculateAge = (dob) => {
      const birthDate = new Date(dob);
  
      const today = new Date();
    
  
      let age = today.getFullYear() - birthDate.getFullYear();
  
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
    
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }
    
      return age;
    };
    
    export const NumberDate = (date) => {
      if (!date) {
        return 'Select Date'; // Handle null or undefined
      }
    
      const dateToFormat = new Date(date);
      
      // Check if the date is valid
      if (isNaN(dateToFormat.getTime())) {
        return 'Invalid Date';
      }
    
      return dateToFormat.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    };
  

    export function formatMMDDYYYY(dateString) {
      const date = new Date(dateString); // Parse the date string
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 to month since it's zero-indexed
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
    
      return `${month}/${day}/${year}`;
    }
    
    