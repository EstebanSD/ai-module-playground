export function SeoMetaPrompt() {
  return (
    <div>
      SeoMetaPrompt
      <div>
        <blockquote className="border-l-4 pl-4 text-sm text-muted-foreground">
          Generates SEO metadata from the text: title, description, and keywords.
        </blockquote>
        <p className="text-xs text-muted-foreground">
          Output includes a title (≤60 chars), description (≤160 chars), and five SEO keywords.
        </p>
      </div>
    </div>
  );
}
