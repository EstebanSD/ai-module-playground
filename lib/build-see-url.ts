export function buildSSEUrl(path: string, params: Record<string, string>) {
  const search = new URLSearchParams(params);
  return `${process.env.NEXT_PUBLIC_API_URL}${path}?${search}`;
}
