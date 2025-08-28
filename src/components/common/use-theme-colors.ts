import { useTheme } from "./theme-context";

/*
  Tailwind safelist для тёмной темы:
  text-white text-[#727272] text-gray-400 bg-[#151516] bg-[#727272] 
  text-black bg-[#F0EDE8] placeholder-[#727272] border-[#F0EDE8] 
  border-white bg-[#F0EDE8] text-[#151516]
*/

export function useThemeColors() {
  const { theme } = useTheme();

  const isLight = theme === "light";

  return {
    // Цвета текста
    textPrimary: isLight ? "text-black" : "text-white",
    textSecondary: isLight ? "text-[#C8C8C8]" : "text-[#727272]",
    textMuted: isLight ? "text-gray-500" : "text-gray-400",

    // Цвета фона
    bgPrimary: isLight ? "bg-[#F0EDE8]" : "bg-[#151516]",

    // Цвета для chip компонентов
    chipBg: isLight ? "bg-[#C8C8C8]" : "bg-[#727272]",
    chipText: "text-[#F0EDE8]",
    chipSelectedBg: isLight ? "bg-[#151516]" : "bg-[#F0EDE8]",
    chipSelectedText: isLight ? "text-[#F0EDE8]" : "text-black",
    chipHoverBg: "bg-[#FF3F1A]",
    chipHoverText: "text-black",

    // Цвета для input полей
    inputText: isLight ? "text-[#151516]" : "text-white",
    inputPlaceholder: isLight
      ? "placeholder-[#C8C8C8]"
      : "placeholder-[#727272]",
    inputBorder: isLight ? "border-gray" : "border-[#F0EDE8]",
    inputBorderFocus: isLight ? "border-[#5A5A5A]" : "border-white",

    // Цвета для кнопок
    buttonBg: isLight ? "bg-[#151516]" : "bg-[#F0EDE8]",
    buttonText: isLight ? "text-[#F0EDE8]" : "text-[#151516]",
    buttonHoverBg: "bg-[#FF3F1A]",
    buttonHoverText: "text-[#151516]",
    buttonDisabledBg: isLight ? "bg-[#C8C8C8]" : "bg-[#727272]",
    buttonDisabledHover: "bg-[#969696]",

    // Утилиты для условного применения классов
    conditional: (lightClass: string, darkClass: string) =>
      isLight ? lightClass : darkClass,
  };
}
