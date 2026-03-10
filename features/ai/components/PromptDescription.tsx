type PromptDescriptionType = {
  desc: string;
  inout: string;
};
export function PromptDescription({ desc, inout }: PromptDescriptionType) {
  return (
    <>
      <blockquote className="border-l-4 pl-4 text-sm text-muted-foreground">{desc}</blockquote>
      <p className="text-xs text-muted-foreground">{inout}</p>
    </>
  );
}
