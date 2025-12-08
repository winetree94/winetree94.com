import { getImage } from "astro:assets";
import * as cheerio from "cheerio";
import { codeToHtml } from "shiki";

export async function optimizeGhostArticle(html: string) {
  const $ = cheerio.load(html);

  const images = $("img");
  await Promise.all(
    images
      .map(async (i, el) => {
        const src = $(el).attr("src");

        // Ghost 이미지인지 확인 (혹은 모든 외부 이미지)
        if (src && src.startsWith("http")) {
          try {
            const optimized = await getImage({
              src: src,
              format: "webp",
              inferSize: true,
            });

            // 3. HTML 태그의 속성을 Astro가 생성한 경로로 교체
            $(el).attr("src", optimized.src);

            // Ghost가 제공하는 width/height 속성 등이 꼬일 수 있으므로
            // Astro가 계산한 값으로 업데이트하거나 제거하는 것이 좋습니다.
            $(el).attr("width", optimized.attributes.width);
            $(el).attr("height", optimized.attributes.height);
            $(el).attr("loading", "lazy"); // 레이지 로딩 추가
            $(el).attr("decoding", "async");

            // srcset이 있다면 제거하거나 새로 만들어야 함 (여기선 제거)
            $(el).removeAttr("srcset");
          } catch (e) {
            console.error(`이미지 최적화 실패: ${src}`, e);
            // 실패 시 원본 src 유지
          }
        }
      })
      .get(),
  );

  const codeBlocks = $("pre > code");
  await Promise.all(
    codeBlocks
      .map(async (i, el) => {
        const $code = $(el);
        const $pre = $code.parent();

        // class에서 언어 추출 (language-xxx 형식)
        const classList = $code.attr("class")?.split(/\s+/) || [];
        const langClass = classList.find((cls) => cls.startsWith("language-"));
        const lang = langClass ? langClass.replace("language-", "") : "text";

        // 코드 내용 가져오기 (이미 디코딩된 텍스트)
        const code = $code.text();

        try {
          // Shiki로 하이라이팅 (light/dark 테마 모두 생성)
          const highlighted = await codeToHtml(code, {
            lang: lang,
            themes: {
              light: "github-light",
              dark: "github-dark",
            },
            defaultColor: false,
            // CSS 변수를 사용하여 테마 전환
            cssVariablePrefix: "--shiki-",
          });

          // 기존 <pre> 태그를 하이라이팅된 HTML로 교체
          $pre.replaceWith(highlighted);
        } catch (error) {
          // 언어를 인식하지 못하면 원본 유지
          console.warn(
            `Failed to highlight code block with language: ${lang}`,
            error,
          );
        }
      })
      .get(),
  );

  return $.html();
}
