import { format } from 'date-fns';

export function safeHtml(value: string): string {
  let div = document.createElement('div');
  div.innerHTML = value;
  return div.textContent || div.innerText || '';
}

export function formatDate(date:any, dateFormat = 'HH:mm'): string {
  if (!date) return '';
  return format(date, dateFormat);
}

export function truncate(value: string, limit: number): string {
  if (!value) return '';
  let newValue = value.trim();
  return newValue.length > limit ? newValue.substring(0, limit) + '...' : value;
}
