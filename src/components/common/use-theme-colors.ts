import { useTheme } from "./theme-context";

/*
  Tailwind safelist для тёмной темы:
  text-white text-[#727272] text-gray-400 bg-[#151516] bg-[#727272] 
  text-black bg-[#F0EDE8] placeholder-[#727272] border-[#F0EDE8] 
  border-white bg-[#F0EDE8] text-[#151516]
*/

export function useThemeColors() {
  const { theme } = useTheme();

  const themeColors = {
    light: {
      // Цвета текста
      textPrimary: "text-black",
      textSecondary: "text-[#C8C8C8]",
      textMuted: "text-gray-500",
      // Цвета фона
      bgPrimary: "bg-[#F0EDE8]",
      // Цвета для chip компонентов
      chipBg: "bg-[#C8C8C8]",
      chipText: "text-[#151516]",
      chipSelectedBg: "bg-[#151516]",
      chipSelectedText: "text-[#F0EDE8]",
      // Цвета для input полей
      inputText: "text-[#151516]",
      inputPlaceholder: "placeholder-[#C8C8C8]",
      inputBorder: "border-[#5A5A5A]",
      inputBorderFocus: "border-[#5A5A5A]",
      // Цвета для кнопок
      buttonBg: "bg-[#151516]",
      buttonText: "text-[#F0EDE8]",
      buttonDisabledText: "text-[#F0EDE8]",
      buttonDisabledBg: "bg-[#C8C8C8]",
    },
    dark: {
      // Цвета текста
      textPrimary: "text-white",
      textSecondary: "text-[#727272]",
      textMuted: "text-gray-400",
      // Цвета фона
      bgPrimary: "bg-[#151516]",
      // Цвета для chip компонентов
      chipBg: "bg-[#727272]",
      chipText: "text-[#F0EDE8]",
      chipSelectedBg: "bg-[#F0EDE8]",
      chipSelectedText: "text-black",
      // Цвета для input полей
      inputText: "text-white",
      inputPlaceholder: "placeholder-[#727272]",
      inputBorder: "border-[#F0EDE8A0]",
      inputBorderFocus: "border-[#F0EDE8]",
      // Цвета для кнопок
      buttonBg: "bg-[#F0EDE8]",
      buttonText: "text-[#151516]",
      buttonDisabledText: "text-[#F0EDE8]",
      buttonDisabledBg: "bg-[#727272]",
    },
    orange: {
      // Цвета текста
      textPrimary: "text-[#FF3F1A]",
      textSecondary: "text-[#FF3F1A]",
      textMuted: "text-[#FF3F1A]",
      // Цвета фона
      bgPrimary: "bg-[#FF3F1A]",
      // Цвета для chip компонентов
      chipBg: "bg-[#C8C8C8]",
      chipText: "text-[#F0EDE8]",
      chipSelectedBg: "bg-[#FF3F1A]",
      chipSelectedText: "text-[#F0EDE8]",
      // Цвета для input полей
      inputText: "text-[#FF3F1A]",
      inputPlaceholder: "placeholder-[#FF8770]",
      inputBorder: "border-[#5A5A5A]",
      inputBorderFocus: "border-[#5A5A5A]",
      // Цвета для кнопок
      buttonBg: "bg-[#FF3F1A]",
      buttonText: "text-[#F0EDE8]",
      buttonDisabledText: "text-white",
      buttonDisabledBg: "bg-[#C8C8C8]",
    },
  };

  return {
    ...themeColors[theme || "light"],

    // Утилиты для условного применения классов
    conditional: (
      lightClass: string,
      darkClass: string,
      orangeClass?: string
    ) => {
      const classes = {
        light: lightClass,
        dark: darkClass,
        orange: orangeClass || darkClass,
      };
      return classes[theme as keyof typeof classes] || lightClass;
    },
  };
}
