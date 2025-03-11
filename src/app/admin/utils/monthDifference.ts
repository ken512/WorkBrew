"use client";

export const getMonthDifference = (olderInput: Date, newerInput: Date):number => {
  const older = new Date(olderInput);
  const newer = new Date(newerInput);
  const yearsDiff = newer.getFullYear() - older.getFullYear();
  let monthsDiff = newer.getMonth() - older.getMonth() + yearsDiff * 12;
  if(newer.getDate() < older.getDate()) {
    monthsDiff -= 1;
  }
  return monthsDiff;
}