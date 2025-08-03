export default function formatPhoneNumber(number: string) {
  // Удаляем все нецифровые символы
  if (/^\+$/.test(number)) return "+";
  const digits = number.replace(/\D/g, "");

  // Если пустая строка, возвращаем пустой результат
  if (!digits) return "";

  // Определяем начало номера
  let formatted = digits;
  if (digits.startsWith("8")) {
    formatted = "7" + digits.slice(1); // Заменяем 8 на 7
  } else if (!digits.startsWith("7")) {
    formatted = "7" + digits; // Добавляем 7 если не начинается с 7
  }

  // Форматируем в зависимости от длины
  if (formatted.length <= 1) {
    return `+${formatted}`;
  } else if (formatted.length <= 4) {
    return `+${formatted[0]} ${formatted.slice(1)}`;
  } else if (formatted.length <= 7) {
    return `+${formatted[0]} ${formatted.slice(1, 4)} ${formatted.slice(4)}`;
  } else if (formatted.length <= 9) {
    return `+${formatted[0]} ${formatted.slice(1, 4)} ${formatted.slice(4, 7)} ${formatted.slice(7)}`;
  } else {
    return `+${formatted[0]} ${formatted.slice(1, 4)} ${formatted.slice(4, 7)} ${formatted.slice(7, 9)} ${formatted.slice(9, 11)}`;
  }
}
