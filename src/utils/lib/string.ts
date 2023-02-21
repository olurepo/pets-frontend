import { BACKEND_URL } from './constants';

export function truncateStringIfNeeded(value: string, maxLength: number) {
  return `${value.substring(0, maxLength)}${value.length > maxLength ? '...' : ''}`;
}

export function getImageUrl(fileName?: string) {
  return `${BACKEND_URL}${fileName}`;
}

export default {
    truncateStringIfNeeded,
};
