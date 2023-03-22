import React from "react";
import matter from 'gray-matter'
import Link from "next/link";

const Blog = (props: any) => {
    return(
        <div>
            <h1>ブログページ</h1>
            {props.blogs.map((blog:any, index:any) =>
                <div key={index}>
                    <h3>{blog.frontmatter.title}</h3>
                    <p>{blog.frontmatter.date}</p>
                    <Link href={`/blog/${blog.slug}`}>Read more</Link>
                </div>
            )}
        </div>
        
    )
}
export default Blog

export async function getStaticProps() {
    const blogs = ((context:any) => {
        const keys = context.keys()
        const values = keys.map(context)
        const data  = keys.map((key:any, index:any) => {
            let slug = key.replace(/^.*[\\\/]/,'').slice(0, -3)
            const value = values[index]
            const document = matter(value.default)
        return {
            frontmatter: document.data,
            slug: slug
        }
        })
        return data
        
    })(require.context('../data', true, /\.md$/))
    console.log(blogs)
    return {
        props: {
            blogs: JSON.parse(JSON.stringify(blogs))
        },
    }
}