import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypePrism from "rehype-prism";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";

import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "katex/dist/katex.min.css";

const MarkdownRenderer = async ({ content }: { content: any }) => {
	const getCleanSource = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkMath, { singleDollarTextMath: false })
		.use(remarkRehype)
		.use(rehypePrism, { plugins: ["copy-to-clipboard", "line-numbers"] })
		.use(rehypeKatex)
		.use(rehypeStringify)
		.process(content);

	return (
		<article
			className='max-w-none overflow-x-auto w-full xl:w-[75%] prose prose-headings:mt-8 prose-headings:font-bold prose-headings:text-black prose-h1:text-[35px] prose-h2:text-[32px] prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-p:text-[1.25rem] prose-code:text-[#111827] prose-li:text-[1.25rem] prose-pre:bg-white-100 dark:prose-headings:text-white'
			id='article_content'
			dangerouslySetInnerHTML={{
				__html: getCleanSource.toString(),
			}}
		/>
	);
};

export default MarkdownRenderer;
