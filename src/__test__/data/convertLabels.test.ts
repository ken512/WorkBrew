
import {
  convertSeatAvailability,
  convertPowerOutlets,
  convertWifiAvailable,
  convertWifiSpeed,
  convertWifiStability,
} from "../../app/admin/_utils/convertLabels";

{/*空席状況*/}
describe("空席状況の日本語変換", () => {
  test("AVAILABLEなら空いている、CROWDEDなら混雑中、FULLなら満席、それぞれ日本語に変換させる", () => {
    expect(convertSeatAvailability("AVAILABLE")).toBe("空いている");
    expect(convertSeatAvailability("CROWDED")).toBe("混雑中");
    expect(convertSeatAvailability("FULL")).toBe("満席");
  });

});

  {/*Wi-Fi速度*/}
  describe("Wi-Fi速度の日本語変換", () => {
  test("HIGHなら高速、MEDIUMなら中速、LOWなら低速、それぞれ日本語に変換させる", () => {
    expect(convertWifiSpeed("HIGH")).toBe("高速");
    expect(convertWifiSpeed("MEDIUM")).toBe("中速");
    expect(convertWifiSpeed("LOW")).toBe("低速");
  });
});

  {/*Wi-Fi安定*/}
  describe("Wi-Fi安定の日本語変換", () => {
  test("VERY_STABLEなら非常に安定、STABLEなら安定、UNSTABLEなら不安定、それぞれ日本語に変換させる", () => {
    expect(convertWifiStability("VERY_STABLE")).toBe("非常に安定");
    expect(convertWifiStability("STABLE")).toBe("安定");
    expect(convertWifiStability("UNSTABLE")).toBe("不安定");
  });
});

  {/*Wi-Fiの有無*/}
  describe("Wi-Fiの有無の日本語変換", () => {
  test("TRUEなら有、FALSEなら無、それぞれ日本語に変換させる", () => {
    expect(convertWifiAvailable("TRUE")).toBe("有");
    expect(convertWifiAvailable("FALSE")).toBe("無");
  });
});

  {/*電源の有無*/}
  describe("電源の有無の日本語変換", () => {
  test("TRUEなら有、FALSEなら無、それぞれ日本語に変換させる", () => {
    expect(convertPowerOutlets("TRUE")).toBe("有");
    expect(convertPowerOutlets("FALSE")).toBe("無");
  });
});