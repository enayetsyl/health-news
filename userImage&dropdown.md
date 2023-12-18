## Showing user image in the navbar and creating dropdown menu from navbar

- Following navbar code is used as an example to illustrate it.

```javascript
'use client'

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { status, data:session } = useSession();
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const popupRef = useRef<HTMLDivElement | null>(null)

  useEffect(() =>{
    const handleClickOutside = (e: MouseEvent)=>{
      if(popupRef.current && !popupRef.current.contains(e.target as Node)){
        setIsPopupVisible(false)
      }
    };
    document.addEventListener("click", handleClickOutside)

    if(!isPopupVisible){
      document.removeEventListener("click", handleClickOutside)
    }

    return() => {
      document.removeEventListener("click", handleClickOutside)
    }

  },[isPopupVisible])
  
  return (
    <div className="flex justify-between items-center border-b-black border-b p-5 bg-logo relative">
        {/* left div */}
      <div className="space-y-2">
        <Link href={'/'}>
        <h1 className="text-4xl font-bold text-white">Health News</h1>
        </Link>
        <p className="text-[12px] font-bold">Vital View: Health Headlines Unveiled</p>
      </div>
        {/* right div */}
      {
        status === 'authenticated' ? (
            <>
            <div 
            ref={popupRef}
            className={`absolute z-30 right-0 top-20 p-4 bg-white shadow-lg rounded-lg flex-col gap-2 text-right min-w-[160px] ${(isPopupVisible) ? 'flex' : 'hidden'}`}>
              <p>{session?.user?.name }</p>
              <p>{session?.user?.email}</p>
              <Link href={'/dashboard'} className="hover:underline"
              onClick={() => setIsPopupVisible(false)}
              >Dashboard</Link>
              <Link href={'/create-post'} className="hover:underline"
               onClick={() => setIsPopupVisible(false)}
              >Create Post</Link>
          <button
          className="bg-logo text-white px-3 py-2 rounded-lg font-bold text-sm"
          onClick={() => signOut()}
          >Log Out</button>
        </div>
       <div className="flex gap-2 items-center mr-5">
        <Link href={'create-post'}
        className="hidden md:flex gap-1 items-center text-white"
        >
        <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
        </span>
        <span>Create New</span>
        </Link>
       <Image src={session?.user?.image || ''}
        width={36} height={36} alt="Profile Image"
        className="rounded-full cursor-pointer"
        onClick={() => setIsPopupVisible((prev) => !prev)}
        />
       </div>
            </>
        ) : (
<button 
        className="bg-white text-black px-3 py-2 rounded-lg font-bold text-sm">
          <Link href={'/login'}>
          Login
          </Link>
        </button>
        )
      }
    </div>
  );
};
export default Navbar;
```

```javascript
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
```
- Link is imported to redirect the user in different route.
- signOut is imported to logout the user when logout button is clicked.
- useSession is imported to get user login status as well as to get user info like name, email etc. 
- Image is imported to show image.
- useEffect, useRef and useState hooks are imported from react to do different functions that will be explained later. 

```javascript
const { status, data:session } = useSession();
```
- status object hold information about whether user is logged in or not. 

- data object hold user information about user like name, email, image etc.

```javascript
const [isPopupVisible, setIsPopupVisible] = useState(false)
```
- This state is used to open or close the popup when user click the image. 

```javascript
 const popupRef = useRef<HTMLDivElement | null>(null)
```
- This popupRef is used to get a reference to the div element in the JSX code (that will open and close when user click the image) and then be passed around in  React components, allowing  to manipulate it. So after opening it if user click outside it we can close it by using some code that will be explained later in useEffect hook explanation. 


```javascript
 useEffect(() =>{
    const handleClickOutside = (e: MouseEvent)=>{
      if(popupRef.current && !popupRef.current.contains(e.target as Node)){
        setIsPopupVisible(false)
      }
    };
    document.addEventListener("click", handleClickOutside)
    if(!isPopupVisible){
      document.removeEventListener("click", handleClickOutside)
    }
    return() => {
      document.removeEventListener("click", handleClickOutside)
    }
  },[isPopupVisible])
  
```

- The above code is usa  the useEffect hook. It sets up an event listener to handle clicks outside a specified popupRef element and manages the cleanup of the event listener when the component unmounts or when the isPopupVisible state changes. 

- handleClickOutside function: This function checks if the click occurred outside the popupRef element. If so, it sets the isPopupVisible state to false, indicating that the popup should be closed.

- document.addEventListener("click", handleClickOutside): Adds a click event listener to the entire document. This listener triggers the handleClickOutside function whenever there's a click anywhere on the document.

- Cleanup for Event Listener:if (!isPopupVisible) { document.removeEventListener("click", handleClickOutside); }: If the popup is not visible, it removes the click event listener. This is done to avoid unnecessary event handling when the popup is not in view.

- return () => { document.removeEventListener("click", handleClickOutside); }: This is the cleanup function for the useEffect hook. It ensures that the click event listener is removed when the component unmounts.

- The dependency array [isPopupVisible] means that the effect will run whenever isPopupVisible changes. 

```javascript
{/* Popup Container */}
<div
  ref={popupRef}
  className={`absolute z-30 right-0 top-20 p-4 bg-white shadow-lg rounded-lg flex-col gap-2 text-right min-w-[160px] ${(isPopupVisible) ? 'flex' : 'hidden'}`}
>
  <p>{session?.user?.name}</p>
  <p>{session?.user?.email}</p>
  {/* Dashboard Link */}
  <Link
    href={'/dashboard'}
    className="hover:underline"
    onClick={() => setIsPopupVisible(false)}
  >
    Dashboard
  </Link>
  {/* Create Post Link */}
  <Link
    href={'/create-post'}
    className="hover:underline"
    onClick={() => setIsPopupVisible(false)}
  >
    Create Post
  </Link>
  {/* Log Out Button */}
  <button
    className="bg-logo text-white px-3 py-2 rounded-lg font-bold text-sm"
    onClick={() => signOut()}
  >
    Log Out
  </button>
</div>

{/* User Profile and Create New Section */}
<div className="flex gap-2 items-center mr-5">
  {/* Create New Link */}
  <Link
    href={'create-post'}
    className="hidden md:flex gap-1 items-center text-white"
  >
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </span>
    <span>Create New</span>
  </Link>
  {/* User Profile Image */}
  <Image
    src={session?.user?.image || ''}
    width={36}
    height={36}
    alt="Profile Image"
    className="rounded-full cursor-pointer"
    onClick={() => setIsPopupVisible((prev) => !prev)}
  />
</div>

```

- Popup Container (<div>):

- This is a container for the user menu or dropdown. The ref={popupRef} attaches the popupRef created with useRef to this element.
- The className conditionally applies styles based on whether isPopupVisible is true or false, toggling between 'flex' and 'hidden'.
- Inside the popup, there are paragraphs displaying the user's name and email.
- Two Link components represent links to the Dashboard and Create Post pages, both with click event handlers to close the popup (setIsPopupVisible(false)). This is to ensure that the popup goes out when the user navigate to dashboard or create post route. 
- A button for logging out with an onClick handler invoking the signOut function.

- User Profile and Create New Section (<div>): This section contains a link for creating a new post and the user's profile image.
- The link has an associated SVG icon and text.
- The user's profile image is displayed using the Image component from Next.js next/image.
- Clicking on the profile image toggles the visibility of the popup (setIsPopupVisible).













