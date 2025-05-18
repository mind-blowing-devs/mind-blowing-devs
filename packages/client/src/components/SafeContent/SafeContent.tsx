import { escapeHtml } from '../../utils/sanitize'

interface SafeContentProps {
  content: string
  className?: string
}

/**
 * Компонент для безопасного отображения контента
 * Экранирует HTML-специальные символы для предотвращения XSS-атак
 */
export default function SafeContent({ content, className }: SafeContentProps) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: escapeHtml(content) }} />
}
