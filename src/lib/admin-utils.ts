export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function uniqueSlug(
  base: string,
  exists: (slug: string) => Promise<boolean>
): Promise<string> {
  let slug = slugify(base);
  if (!slug) slug = "item";
  let candidate = slug;
  let counter = 2;
  while (await exists(candidate)) {
    candidate = `${slug}-${counter}`;
    counter += 1;
  }
  return candidate;
}

export function parseJsonArray(value: string): string[] {
  if (!value.trim()) return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function joinJsonArray(items: string[]): string {
  return items.join("\n");
}
