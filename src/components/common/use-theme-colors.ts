import { useTheme } from "./theme-context";

/*
  Tailwind safelist для тёмной темы:
  text-[#F0EDE8] text-[#727272] text-gray-400 bg-[#151516] bg-[#727272] 
  text-[#151516] bg-[#F0EDE8] placeholder-[#727272] border-[#F0EDE8] [#151516]
  border-[#F0EDE8] bg-[#F0EDE8] text-[#151516]
*/

export function useThemeColors() {
  const { theme } = useTheme();

  const themeColors = {
    light: {
      // Цвета текста
      textPrimary: "text-[#151516]",
      textSecondary: "text-[#C8C8C8]",
      textMuted: "text-gray-500",
      // Цвета фона
      bgPrimary: "bg-[#F0EDE8]",
      // Цвета для chip компонентов
      chipBg: "bg-[#C8C8C8]",
      chipText: "text-[#F0EDE8]",
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
      buttonDisabledBg: "hover:!bg-[#C8C8C8] bg-[#C8C8C8]",
      buttonProps: {},
    },
    dark: {
      // Цвета текста
      textPrimary: "text-[#F0EDE8]",
      textSecondary: "text-[#727272]",
      textMuted: "text-gray-400",
      // Цвета фона
      bgPrimary: "bg-[#151516]",
      // Цвета для chip компонентов
      chipBg: "bg-[#727272]",
      chipText: "text-[#F0EDE8]",
      chipSelectedBg: "bg-[#F0EDE8]",
      chipSelectedText: "text-[#151516]",
      // Цвета для input полей
      inputText: "text-[#F0EDE8]",
      inputPlaceholder: "placeholder-[#727272]",
      inputBorder: "border-[#F0EDE8A0]",
      inputBorderFocus: "border-[#F0EDE8]",
      // Цвета для кнопок
      buttonBg: "bg-[#F0EDE8]",
      buttonText: "text-[#151516]",
      buttonDisabledText: "text-[#F0EDE8]",
      buttonDisabledBg: "hover:!bg-[#727272] bg-[#727272]",
      buttonProps: {},
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
      buttonDisabledText: "text-[#F0EDE8]",
      buttonDisabledBg: "bg-[#C8C8C8]",
      buttonProps: { "custom-cursor": "black" },
    },
  };

  return {
    ...themeColors[theme || "light"],

    // Утилиты для условного применения классов
    conditional: (
      lightClass: string,
      darkClass: string,
      orangeClass?: string,
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
