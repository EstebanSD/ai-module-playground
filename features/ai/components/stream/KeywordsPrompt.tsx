export function KeywordsPrompt() {
  return (
    <div>
      GenerateKeywordsPrompt
      <blockquote className="border-l-4 pl-4 text-sm text-muted-foreground">
        Extracts the most relevant keywords from a piece of content. The prompt expects plain text
        and returns a comma-separated list of keywords optimized for SEO usage.
      </blockquote>
      <p className="text-xs text-muted-foreground">
        Input: text and keyword limit. Output: comma-separated keyword list.
      </p>
    </div>
  );
}
