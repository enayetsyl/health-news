import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

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
 
 const isEditable = true;
  return (
    <div className="border-b border-logo my-4 py-4">
      <div className="flex justify-start gap-5 items-center text-[12px] mt-2">
        <p>Posted by: <span className="font-bold">{author}</span></p> <p>on: {date}</p>
      </div>
      <div className="w-full h-60 relative mt-2 mb-3">
        {
          thumbnail? (<Image src={thumbnail} alt={title} fill
          className="object-cover rounded-lg object-center"
          />) : (<Image src={'thumbnail.jpg'} alt='placeholder thumbnail' fill
          className="object-cover rounded-lg object-center"/>)
        }
      </div>
      {
        category && (<Link href={`categories/{category}`}
        className="bg-logo py-2 px-3 rounded-lg  text-white text-[12px] font-bold"
        >{category}</Link>)
      }
      <h2 className="font-bold py-2">{title}</h2>
      <p>{content}</p>
      {
        links && (
          <div className="py-1 ">
            {links.map((link, i) =>(<div key={i}
            className="flex gap-2 items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-3">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>

              <Link href={link}
              className="text-[10px] underline"
              >{link}</Link>
            </div>) )}
          </div>
        )
      }

      {
        isEditable &&(
          <div className="pt-2">
            <Link href={`/edit-post/${id}`}><button
            className="text-white bg-logo font-bold text-center py-2 px-5 rounded-lg mr-2"
            >Edit</button></Link>
            <DeleteButton />
          </div>
        )
      }
    </div>
  );
};

export default Post;