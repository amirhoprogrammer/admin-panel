import localFont from "next/font/local";

export const iranYekan = localFont({
  src: [
    {
      path: "../fonts/iranYekan/Qs_Iranyekan_thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/iranYekan/Qs_Iranyekan_light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/iranYekan/Qs_Iranyekan.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/iranYekan/Qs_Iranyekan_medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/iranYekan/Qs_Iranyekan_bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/iranYekan/Qs_Iranyekan_extrabold.ttf",
      weight: "800",
      style: "normal",
    },
    //{ path: "../fonts/Qs_Iranyekan_black.ttf", weight: "900", style: "normal" },
    // extrablack هم وزن ۹۰۰ حساب می‌شه؛ اگه جدا می‌خوای، بعداً بگو
  ],
  variable: "--font-iranyekan",
  display: "swap",
});
