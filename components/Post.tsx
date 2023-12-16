import Image from "next/image";
import Link from "next/link";

interface PostProps {
  id: string, 
  author: string,
  date: string, 
  thumbnail?: string,
  title: string,
  content: string, 
  links?: string[],
  category:string, 
}
const Post = ({id, author, date, thumbnail, title, content, links, category}: PostProps) => {
  return (
    <div>
      <div className="flex justify-start gap-5 items-center text-[12px]">
        <p>Posted by: <span className="font-bold">{author}</span></p> <p>on: {date}</p>
      </div>
      <div className="w-full h-60 relative">
        {
          thumbnail? (<Image src={thumbnail} alt={title} fill
          className="object-cover rounded-lg object-center"
          />) : (<Image src={'thumbnail.jpg'} alt='placeholder thumbnail' fill
          className="object-cover rounded-lg object-center"/>)
        }
      </div>
      {
        category && (<Link href={`categories/{category}`}>{category}</Link>)
      }
      <h2>{title}</h2>
      <p>{content}</p>
      {
        links && (
          <div>
            {links.map((link, i) =>(<div key={i}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>

              <Link href={link}>{link}</Link>
            </div>) )}
          </div>
        )
      }
    </div>
  );
};

export default Post;