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