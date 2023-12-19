import { Link, useLocation } from "react-router-dom"

const SavedOption = () => {

  const location = useLocation();
  return (
    <ul className="flex border rounded-lg gap-[10px] h-[46px]">
          <li className={`px-[50px] py-[12px]  cursor-pointer ${location.pathname === '/saved/post' ? 'bg-slate-800 border rounded-lg' : ''}`}>
            <Link to={'/saved/post'} className="flex items-center gap-3"><img src="/assets/icons/posts.svg" />
            <p>Post</p>
            </Link>
            
          </li>
          <li className={`px-[50px] py-[12px]  cursor-pointer ${location.pathname === '/saved/reels' ? 'bg-slate-800 border rounded-lg' : ''}`}>
           <Link  className="flex items-center gap-3" to={'/saved/reels'}><img src="/assets/icons/posts.svg" />
            <p>Reel</p></Link>
          </li>
          <li className={`px-[50px] py-[12px]  cursor-pointer ${location.pathname === '/saved/collection' ? 'bg-slate-800 border rounded-lg' : ''}`}>
            <Link  className="flex items-center gap-3" to={'/saved/collection'}><img src="/assets/icons/posts.svg" />
            <p>Collection</p></Link>
          </li>
        </ul>
  )
}

export default SavedOption