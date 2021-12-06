import * as Device from "expo-device";
export const isSmallDevice =
  Device.modelName.includes("iPhone x") ||
  Device.modelName.includes("iPhone 8") ||
  Device.modelName.includes("iPhone SE");
export const isLargeIosDevice =
  Device.modelName.includes("iPhone 11") ||
  Device.modelName.includes("iPhone 12") ||
  Device.modelName.includes("iPhone 13");
