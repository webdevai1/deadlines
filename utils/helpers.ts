export function cutText(text: string, length: number): string {
  if (text.length > length) {
    return `${text.slice(0, length).trim()}...`;
  }
  return text;
}

export function capitalize(str: string): string {
  if (!str || str.length === 0) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
