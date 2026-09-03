import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

export type Heading = { depth: 2 | 3; id: string; text: string };

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
};

function textContent(node: HastNode): string {
  if (node.type === "text") return node.value ?? "";
  if (!node.children) return "";
  return node.children.map(textContent).join("");
}

/**
 * Reads each fenced block's language into an ordered queue before shiki runs.
 * @shikijs/rehype rebuilds the `pre`/`code` nodes from scratch rather than
 * mutating them, so anything stashed as a property on the original node is
 * lost by the time it reaches later plugins — the queue survives that
 * rebuild because `rehypeCodeShell` drains it in the same document order.
 */
function rehypeStashLang(queue: string[]) {
  return (tree: HastNode) => {
    visit(tree as never, "element", (node: HastNode) => {
      if (node.tagName === "pre" && node.children?.[0]?.tagName === "code") {
        const code = node.children[0];
        const classes = (code.properties?.className as string[] | undefined) ?? [];
        const langClass = classes.find((c) => c.startsWith("language-"));
        queue.push(langClass ? langClass.replace("language-", "") : "text");
      }
    });
  };
}

/** Wraps every `<pre>` in a manga-panel shell with a language tab and copy button (wired up client-side by CodeEnhancer). */
function rehypeCodeShell(queue: string[]) {
  return (tree: HastNode) => {
    visit(
      tree as never,
      "element",
      (node: HastNode, index: number | null, parent: HastNode | null) => {
        if (node.tagName !== "pre" || !parent || index === null) return;
        const lang = queue.shift() ?? "text";

        const shell: HastNode = {
          type: "element",
          tagName: "div",
          properties: { className: ["code-shell"] },
          children: [
            {
              type: "element",
              tagName: "div",
              properties: { className: ["code-bar"] },
              children: [
                { type: "element", tagName: "span", properties: {}, children: [{ type: "text", value: lang }] },
                {
                  type: "element",
                  tagName: "button",
                  properties: { className: ["copy-btn"], type: "button", dataCopied: "false" },
                  children: [{ type: "text", value: "COPY" }],
                },
              ],
            },
            node,
          ],
        };
        (parent.children as HastNode[])[index] = shell;
      }
    );
  };
}

export async function compileMarkdown(
  source: string
): Promise<{ html: string; headings: Heading[] }> {
  const headings: Heading[] = [];

  function rehypeCollectHeadings() {
    return (tree: HastNode) => {
      visit(tree as never, "element", (node: HastNode) => {
        if (node.tagName === "h2" || node.tagName === "h3") {
          const id = (node.properties?.id as string) ?? "";
          if (!id) return;
          headings.push({
            depth: node.tagName === "h2" ? 2 : 3,
            id,
            text: textContent(node),
          });
        }
      });
    };
  }

  const langQueue: string[] = [];

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: { className: ["heading-anchor"], ariaHidden: "true", tabIndex: -1 },
      content: { type: "text", value: " #" },
    })
    .use(rehypeCollectHeadings)
    .use(rehypeStashLang, langQueue)
    .use(rehypeShiki, { theme: "github-dark" })
    .use(rehypeCodeShell, langQueue)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(source);

  return { html: String(file), headings };
}
