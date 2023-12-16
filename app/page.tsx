import CategoriesList from "@/components/CategoriesList";
import Post from "@/components/Post";
import {postsData} from "@/data"

export default function Home() {
  return (
    <>
    <CategoriesList/>
    <div>
    {
      postsData && postsData.length > 0 ? (postsData.map((post, i) => <Post id={post.id} author={post.author} date={post.datePublished} thumbnail={post.thumbnail} category={post.category} content={post.content} title={post.title} links={post.links}
      key={i}
      />)) : (<p>No posts to display</p>)
    }
    </div>
    </>
  )
}
