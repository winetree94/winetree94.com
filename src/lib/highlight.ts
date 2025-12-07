import { codeToHtml } from "shiki";

/**
 * Ghost CMS HTML에서 코드블록을 찾아 syntax highlighting 적용
 */
export async function highlightGhostHTML(html: string): Promise<string> {
  // Ghost는 <pre><code class="language-xxx"> 형식으로 코드블록 생성
  const codeBlockRegex =
    /<pre><code(?:\s+class="language-(\w+)")?>([\s\S]*?)<\/code><\/pre>/g;

  const matches = Array.from(html.matchAll(codeBlockRegex));

  if (matches.length === 0) {
    return html;
  }

  let result = html;

  for (const match of matches) {
    const [fullMatch, lang = "text", code] = match;

    // HTML 엔티티 디코딩
    const decodedCode = code
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    try {
      // Shiki로 하이라이팅
      const highlighted = await codeToHtml(decodedCode, {
        lang: lang,
        theme: "github-light", // 원하는 테마로 변경 가능
        transformers: [
          {
            name: "line-numbers",
            line(node, line) {
              node.properties["data-line"] = line;
              this.addClassToHast(node, "line");
            },
            code(node) {
              node.properties["data-line-numbers"] = "";
            },
          },
        ],
      });

      result = result.replace(fullMatch, highlighted);
    } catch (error) {
      // 언어를 인식하지 못하면 원본 유지
      console.warn(
        `Failed to highlight code block with language: ${lang}`,
        error,
      );
    }
  }

  return result;
}
