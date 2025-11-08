export default function formatPhoneNumber(number: string) {
  // Удаляем все нецифровые символы
  if (/^\+$/.test(number)) return "+";
  const digits = number.replace(/\D/g, "");

  // Если пустая строка, возвращаем пустой результат
  if (!digits) return "";

  // Не форсируем код страны - работаем с любыми номерами
  const formatted = digits;

  // Определяем формат на основе общей длины номера
  // 11 цифр = однозначный код (7 + 10 цифр для России)
  // 12+ цифр = двузначный код (92 + 10 цифр для Пакистана и т.д.)

  if (formatted.length <= 1) {
    return `+${formatted}`;
  } else if (formatted.length <= 11) {
    // Однозначный код страны (например +7)
    if (formatted.length <= 4) {
      return `+${formatted[0]} ${formatted.slice(1)}`;
    } else if (formatted.length <= 7) {
      return `+${formatted[0]} ${formatted.slice(1, 4)} ${formatted.slice(4)}`;
    } else if (formatted.length <= 9) {
      return `+${formatted[0]} ${formatted.slice(1, 4)} ${formatted.slice(4, 7)} ${formatted.slice(7)}`;
    } else {
      return `+${formatted[0]} ${formatted.slice(1, 4)} ${formatted.slice(4, 7)} ${formatted.slice(7, 9)} ${formatted.slice(9, 11)}`;
    }
  } else if (formatted.length <= 12) {
    return `+${formatted.slice(0, 2)} ${formatted.slice(2, 5)} ${formatted.slice(5, 8)} ${formatted.slice(8, 10)} ${formatted.slice(10, 12)}`;
  } else {
    return `+${formatted.slice(0, 3)} ${formatted.slice(3, 6)} ${formatted.slice(6, 9)} ${formatted.slice(9, 11)} ${formatted.slice(11, 13)}`;
  }
}
