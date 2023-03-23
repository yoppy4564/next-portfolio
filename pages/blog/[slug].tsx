import React from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const SingleBlog = (props:any) => {
    return (
        <div>
            <h1>{props.frontmatter.title}</h1>
            <p>{props.frontmatter.date}</p>
            <ReactMarkdown>{props.markdownBody}</ReactMarkdown>
        </div>
    )
}
export default SingleBlog

export async function getStaticPaths() {
    const blogSlugs = ((context:any) => {
        const keys = context.keys()
        const data = keys.map((key:any, index:any) => {
            let slug = key.replace(/^.*[\\\/]/,'').slice(0,-3)
            return slug
        })
        return data
    })(require.context('../../data', true, /\.md$/))
    const paths = blogSlugs.map((blogSlug:any) => `/blog/${blogSlug}`)
    return{
        paths: paths, 
        fallback: false
    }
}

export async function getStaticProps(context:any) {
    const { slug } = context.params
    const data = await import(`../../data/${slug}.md`)
    const singleDocument = matter(data.default)
    console.log(singleDocument)
    return {
        props: {
            frontmatter: singleDocument.data,
            markdownBody: singleDocument.content,

        }
    }
    
}