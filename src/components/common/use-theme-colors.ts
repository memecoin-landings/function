import { useTheme } from "./theme-context";

export function useThemeColors() {
  const { theme } = useTheme();
  
  const isLight = theme === "light";
  
  return {
    // Цвета текста
    textPrimary: isLight ? "text-black" : "text-white",
    textSecondary: isLight ? "text-gray-700" : "text-gray-300",
    textMuted: isLight ? "text-gray-500" : "text-gray-400",
    
    // Цвета фона
    bgPrimary: isLight ? "bg-[#F0EDE8]" : "bg-[#151516]",
    
    // Цвета для chip компонентов
    chipBg: isLight ? "bg-[#C8C8C8]" : "bg-[#727272]",
    chipText:  "text-[#F0EDE8]",
    chipSelectedBg: isLight ? "bg-[#151516]" : "bg-[#F0EDE8]",
    chipSelectedText: isLight ? "text-[#F0EDE8]" : "text-black",
    chipHoverBg: "bg-[#FF3F1A]",
    chipHoverText: "text-black",
    
    // Цвета для input полей
    inputText: isLight ? "text-[#151516]" : "text-white",
    inputPlaceholder: isLight ? "placeholder-[#C8C8C8]" : "placeholder-[#727272]",
    inputBorder: isLight ? "border-[#5A5A5A]" : "border-[#F0EDE8]",
    inputBorderFocus: isLight ? "border-gray-900" : "border-white",
    
    // Цвета для кнопок
    buttonBg: isLight ? "bg-[#151516]" : "bg-[#F0EDE8]",
    buttonText: isLight ? "text-[#F0EDE8]" : "text-[#151516]",
    buttonHoverBg: "bg-[#FF3F1A]",
    buttonHoverText: "text-[#151516]",
    
    // Утилиты для условного применения классов
    conditional: (lightClass: string, darkClass: string) => 
      isLight ? lightClass : darkClass
  };
} 