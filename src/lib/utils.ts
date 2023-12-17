import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(timestamp: string): string {
  const currentDate = new Date();
  const postDate = new Date(timestamp);
  const timeDifference = currentDate.getTime() - postDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return `${secondsDifference} giây trước`;
  } else if (secondsDifference < 3600) {
    const minutesDifference = Math.floor(secondsDifference / 60);
    return `${minutesDifference} phút trước`;
  } else if (secondsDifference < 86400) {
    const hoursDifference = Math.floor(secondsDifference / 3600);
    return `${hoursDifference} giờ trước`;
  } else {
    const daysDifference = Math.floor(secondsDifference / 86400);
    return `${daysDifference} ngày trước`;
  }
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList?.includes(userId);
};


