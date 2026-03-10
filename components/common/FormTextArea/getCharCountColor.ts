export const getCharCountColor = (current: number, max: number) => {
  const percentage = (current / max) * 100;
  if (percentage >= 100) return 'text-destructive font-medium';
  if (percentage >= 90) return 'text-orange-500 font-medium';
  return 'text-muted-foreground';
};
