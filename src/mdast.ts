import type { Node } from "@types/mdast"
import { fromMarkdown } from "mdast-util-from-markdown"
import { mdxFromMarkdown } from "mdast-util-mdx"
import { mdxjs } from "micromark-extension-mdxjs"

export function* mdastToWords(node: Node): Generator<string> {
  switch (node.type) {
    case "root":
    case "paragraph":
    case "emphasis":
    case "link":
    case "list":
    case "listItem":
      for (const childGen of node.children.flatMap(mdastToWords)) {
        yield* childGen
      }

    case "text":
      if (node.value) {
        yield* node.value.replaceAll("\n", " ").split(/\s+/)
      }

    case "mdxJsxFlowElement":
    case "mdxJsxTextElement":
    case "mdxFlowExpression":
      return

    default:
      throw new Error(`Unhandled mdast node type: ${node.type}`)
  }
}

export function fromMdx(raw: string): Node {
  return fromMarkdown(raw, {
    extensions: [mdxjs()],
    mdastExtensions: [mdxFromMarkdown()],
  })
}

export function excerpt(mdx: string): string {
  const buffer = []
  const wordGen = mdastToWords(fromMdx(mdx))
  for (let i = 0; i < 55; ++i) {
    const nextWord = wordGen.next()
    if (nextWord.done) {
      break
    }
    buffer.push(nextWord.value)
  }

  return buffer.join(" ")
}

export function plaintext(mdx: string): string {
  const buffer = []
  const wordGen = mdastToWords(fromMdx(mdx))
  let word = wordGen.next()
  while (!word.done) {
    buffer.push(word.value)
    word = wordGen.next()
  }

  return buffer.join(" ")
}
