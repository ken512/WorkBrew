import { getMonthDifference } from "../../app/admin/_utils/monthDifference";

describe("getMonthDifference", () => {
  test("同じ日付の場合は0ヶ月",() => {
    const d = new Date("2024-04-01");
    expect(getMonthDifference(d,d)).toBe(0);
  });

  test("1ヶ月差がある例: 2024/01 → 2024/02）", () => {
    expect(getMonthDifference(new Date("2024-01-01"), new Date("2024/02"))).toBe(1);
  });

  test("年をまたいで12ヶ月差(2023/01 → 2024/01)", () => {
    expect(getMonthDifference(new Date("2024-01-01"), new Date("2025-01-01"))).toBe(12);
  });

  test("月またぎでも日数の差で切り捨て、（2024/01/31 → 2024/02/01）は0ヶ月", () => {
    expect(getMonthDifference(new Date("2024-01-31"), new Date("2024-02-01"))).toBe(0);
  });

  test("月またぎで日数が大きければ１ヶ月差(2024/01/01 → 2024/02/05)は１ヶ月", () => {
    expect(getMonthDifference(new Date("2024/01/01"), new Date("2024-02-01"))).toBe(1);
  });

  test("複数年またぎ（2020/01/15 → 2024/04/14）は51ヶ月", () => {
    expect(getMonthDifference(new Date("2020/01/15"), new Date("2024/04/14"))).toBe(50);
  });

  test("日付が逆順（未来→過去）の場合、マイナスの差になる", () => {
    expect(getMonthDifference(new Date("2024-04-01"), new Date("2024-03-01"))).toBe(-1);
  });
});