/**
 * Экранирует HTML-специальные символы для предотвращения XSS-атак
 * @param str Строка для экранирования
 * @returns Экранированная строка
 */
export const escapeHtml = (str: string): string => {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Валидирует и очищает строку от потенциально опасных символов
 * @param str Строка для валидации
 * @returns Очищенная строка или null, если строка содержит опасные символы
 */
export const sanitizeString = (str: string): string | null => {
  if (!str) return ''

  /* Проверяем на наличие потенциально опасных HTML-тегов */
  if (/<[^>]*>/g.test(str)) {
    return null
  }

  /* Проверяем на наличие потенциально опасных JavaScript-выражений */
  if (/javascript:|data:|vbscript:|on\w+\s*=/i.test(str)) {
    return null
  }

  return escapeHtml(str)
}
