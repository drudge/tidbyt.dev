
import React from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import { useLocation } from 'react-router-dom';

import Row from './table/Row';
import Table from './table/Table';
import Cell from './table/Cell';
import Head from './table/Head';
import Body from './table/Body';
import CodeBlock from './CodeBlock';
import Heading from './Heading';
import Image from './Image';
import Link from './Link';
import ListWrapper from './list/ListWrapper';
import Item from './list/Item';
import Paragraph from './Paragraph';
import { genURL, convertRelativePath } from '../navigation/docs';

type Props = {
    source: string
}

export default function Markdown({ source }: Props) {
    const location = useLocation();

    return (
        <ReactMarkdown
            children={source}
            transformLinkUri={(href, children, title) => {
                if (href.endsWith('.md')) {
                    let path = convertRelativePath(href, location.pathname);
                    return genURL(path);
                }
                return href;
            }}
            transformImageUri={(src, alt, title) => {
                return `/static/${src}`;
            }}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
                code: CodeBlock,
                p: Paragraph,
                h1: Heading,
                h2: Heading,
                h3: Heading,
                h4: Heading,
                h5: Heading,
                h6: Heading,
                a: Link,
                td: Cell,
                th: Cell,
                tr: Row,
                table: Table,
                thead: Head,
                tbody: Body,
                ol: ListWrapper,
                ul: ListWrapper,
                li: Item,
                img: Image,
            }}
        />
    )
}