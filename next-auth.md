## In this post we will learn how to integrate next-auth in your project.

### Install next auth

- In your vscode terminal write

```javascipt
npm i next-auth
```

### Create folder

- Go to app folder and create a folder named 'api'.
- Inside the api folder create a folder named 'auth'.
- Inside the auth folder create a folder named '[...nextauth]'.
- Inside the [...nextauth] folder create a file named 'route.ts'.

### Setup route.ts file

- Inside the route.ts file write the following code
```javascript
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'


const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: 
      clientSecret: 
    }),
    GoogleProvider({
      clientId: ,
      clientSecret: ,
    })
  ],
  pages:{
    signIn: '/login'
  },
  secret: ,
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

```javascript 
import { NextAuthOptions } from "next-auth";
```
- The provided line imports the NextAuthOptions type from the "next-auth" module, representing the configuration options for NextAuth in a Next.js application. This type defines the structure for specifying authentication settings in the code.

```javascript 
import NextAuth from "next-auth/next";
```
- This line imports the NextAuth library, which is a flexible authentication library for Next.js applications. It provides a set of tools and utilities to easily implement authentication in a Next.js project.

```javascript 
import GitHubProvider from 'next-auth/providers/github'
```
- This line imports the GitHub provider module from NextAuth. In the context of authentication, a provider is a service that allows users to sign in. Here, the GitHub provider enables authentication using GitHub accounts. To use this provider, you would typically configure it with your GitHub OAuth client ID and client secret.

```javascript 
import GoogleProvider from 'next-auth/providers/google'
```
- Similar to the GitHub provider, this line imports the Google provider module from NextAuth. The Google provider enables authentication using Google accounts. To use this provider, you would need to configure it with your Google OAuth client ID and client secret.

```javascript 
const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: 
      clientSecret: 
    }),
    GoogleProvider({
      clientId: ,
      clientSecret: ,
    })
  ],
  pages:{
    signIn: '/login'
  },
  secret: ,
};
```
- This code is defining a configuration object (authOptions) for NextAuth, specifying various settings for authentication in a Next.js application:

- providers:

- It's an array containing configuration objects for authentication providers.
- Two providers are included: GitHubProvider and GoogleProvider.
- Each provider is configured with its own set of properties, such as clientId and clientSecret. You need to replace the empty values with your actual credentials obtained from GitHub and Google.

- pages:

- It's an object specifying custom pages for authentication.
- In this case, the signIn property is set to '/login', indicating that the custom sign-in page is located at the '/login' route.

- secret:

- It's a required field representing a secret string for session encryption.
- You need to provide a secure and unique string for this field to ensure the security of user sessions.

```javascript
const handler = NextAuth(authOptions)
```
-This line is creating a NextAuth handler by calling the NextAuth function with the specified authOptions. The resulting handler is an object or function that handles authentication requests based on the provided configuration.

```javascript
export { handler as GET, handler as POST }
```
- These lines export the handler object or function as both GET and POST. In the context of Next.js API routes, a single handler can be used for both GET and POST requests. This export syntax allows you to use the same authentication handler for both types of HTTP requests in your application. 

### How to get github and google client id and client secret

- Open github account and click the profile image  at the top right corner.
- In the dropdown list click Settings
- Go to the left side menu and click Developer settings.
- On the left menu click OAuth Apps
- Click New OAuth App button
- In the Application name field type your website name
- In the Homepage URL field type 'http://localhost:3000/'
- In the Authorization callback URL field type 'http://localhost:3000/api/auth/callback/github'
- Click on Register application button
- Click  Generate a new client secret.
- Create a .env file in root and write 'GITHUB_CLIENT_ID=' and 'GITHUB_CLIENT_SECRET=' and paste the id and secret that you get from github page. Also in the gitignore file type .env so that env file does not pushed to the github. 
```javascript
 GitHubProvider({
      clientId: 
      clientSecret: 
    }),
```
- In the above portion of code write
```javascript
clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
```
- For google client id and secret go to the following link 'https://console.developers.google.com/apis/credentials'
- Click CREATE CREDENTIALS button. A dropdown menu will appear. 
- Click OAuth client ID
- In the application type dropdown select Web application.
- In the name input field type your website name.
- In the Authorized JavaScript origins filed paste 'http://localhost:3000/'. Make sure to delete last '/'.
- In the Authorized redirect URIs filed paste 'http://localhost:3000/api/auth/callback/google'. 
- Click the CREATE button. 
- A modal will open and it will show client id and secret. 
- In the .env file  write 'GOOGLE_CLIENT_ID=' and 'GOOGLE_CLIENT_SECRET=' and paste the id and secret that you get from above modal.
```javascript
 GoogleProvider({
      clientId: 
      clientSecret: 
    }),
```
- In the above portion of code write
```javascript
clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
```

### Setting up next auth url and next auth secret
- In the .env file type
```javascript
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
```
- Open the terminal and type
```javascript
$ openssl rand -base64 32
```
- You will get a code, paste it in the NEXTAUTH_SECRET at .env file. 

- In the route.ts file write 
```javascript
pages:{
    signIn:
  },
  secret: process.env.NEXTAUTH_SECRET,
```

### Linking the login/signin page
- In the route.ts file provide the login/signin path. 
```javascript
pages:{
    signIn: '/login'
  },
```
### Creating a wrapper and access the session
- In order to know whether the user is logged in or not we have to do some steps. 
- Ideally in the component folder or in authProvider folder we have to create a file named Providers.tsx and pase the following code in it. 

```javascript
'use client'

import { SessionProvider } from "next-auth/react"

export const NextAuthProvider = ({
  children,
}:{
  children: React.ReactNode;
}) => {
  return <SessionProvider>{children}</SessionProvider>
}
```
- 'use client' Statement: This statement is a pragma comment used in Vercel's Next.js environment. It indicates that the code should be processed on the client side. It ensures that this specific file is used only in the client-side code during development or build processes.

- Imports: The code imports the SessionProvider component from the "next-auth/react" module. The SessionProvider is a part of the NextAuth library and is used to provide session information to the React components in the Next.js application.

- NextAuthProvider Component:This is a React functional component named NextAuthProvider. It takes a single prop, children, which is a React node representing the child components that will be wrapped by this provider.

- Component Implementation: The component returns a JSX element that wraps its children with the SessionProvider. This implies that any component wrapped with NextAuthProvider will have access to session information provided by NextAuth.

- Now inside layout.tsx file wrap everything inside body tag by <NextAuthProvider> tag. Your code will look like as follow

```javascript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NextAuthProvider } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Health News",
  description: "Read and maintain for your well being.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
        <div className="lg:max-w-7xl mx-auto px-8 lg:px-16  min-h-screen flex flex-col shadow-xl">
        <Navbar/>
        <div className="flex-auto my-5">
        {children}
        </div>
        <Footer/>
        </div>
        </NextAuthProvider>
        </body>
    </html>
  );
}
```
### Accessing session information in Navbar component

- Usually session information is used to conditionally render login/logout button in the navbar. It will be explained below. 

```javascript
'use client'

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { status } = useSession();

  return (
    <div className="flex justify-between items-center border-b-black border-b p-5 bg-logo">
        {/* left div */}
      <div className="space-y-2">
        <Link href={'/'}>
        <h1 className="text-4xl font-bold text-white">Health News</h1>
        </Link>
        <p className="text-[12px] font-bold">Vital View: Health Headlines Unveiled</p>
      </div>
        {/* right div */}
      {
        status === 'authenticated' ? (<div>
          <button
          className="bg-white text-black px-3 py-2 rounded-lg font-bold text-sm"
          onClick={() => signOut()}
          >Log Out</button>
        </div>) : (

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
- Pragma Comment: 'use client': This pragma comment is specific to Vercel's Next.js environment, indicating that the code should be processed on the client side.

- Imports: 'signOut' and 'useSession' are imported from "next-auth/react" to handle authentication-related functionalities.

```javascript
const { status } = useSession();
```

- useSession(): This is a hook provided by NextAuth. It returns an object containing information about the user's authentication status and session data.

- const { status }: The curly braces {} are used for destructuring assignment. It allows you to pull specific properties out of an object. In this case, it's extracting the status property from the object returned by useSession()

- So, after this line is executed, the status variable will contain the authentication status of the user, which could be one of the following strings: 'authenticated': Indicates that the user is authenticated. 'unauthenticated': Indicates that the user is not authenticated. You can then use the status variable to conditionally render different parts of your UI based on the user's authentication status.

```javascript
 {
        status === 'authenticated' ? (<div>
          <button
          className="bg-white text-black px-3 py-2 rounded-lg font-bold text-sm"
          onClick={() => signOut()}
          >Log Out</button>
        </div>) : (
<button 
        className="bg-white text-black px-3 py-2 rounded-lg font-bold text-sm">
          <Link href={'/login'}>
          Login
          </Link>
        </button>
        )
      }
```

- This code block conditionally renders either a "Log Out" button or a "Login" button based on the user's authentication status (status). If the user is authenticated, the "Log Out" button is shown, and if not, the "Login" button is displayed with a link to the login page.

### Activation buttons in login/signin page

- When user will click at login button at navbar he/she will be redirected to the login page. In this page at the github and google login button the signin functionality need to add. A typical code will be as follows. 
```javascript
'use client'
import { signIn } from "next-auth/react";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-5">
    <h1 className="text-4xl font-bold mb-5">Login</h1>      
    <div>
      <button 
      onClick={() => signIn('google')}
      className="bg-logo px-8 py-3 gap-3 text-white flex justify-center items-center rounded-3xl">
        <span>
          <Image src={'/google-logo.png'}
          width={20}
          height={30}
          alt='Google logo'
          />
        </span> <span className="font-bold">Login with Google</span>
      </button>
    </div>
    <div>
      <button 
      onClick={() => signIn('github')}
      className="bg-logo px-8 py-3 gap-3 text-white flex justify-center items-center rounded-3xl">
        <span>
          <Image src={'/git-hub-logo.png'}
          width={20}
          height={30}
          alt='github logo'
          />
        </span> <span className="font-bold">Login with GitHub</span>
      </button>
    </div>
    </div>
  );
};

export default page;
```

- We have to make the page as client side by using 'use client'

```javascript
import { signIn } from "next-auth/react";
```
- The import { signIn } from "next-auth/react"; statement makes the signIn function available for use in your Next.js application, enabling you to implement user authentication and sign-in functionality.

```javascript
  onClick={() => signIn('google')}
  onClick={() => signIn('github')}
```
- When a user clicks the button, the onClick event handler executes the signIn function with the argument 'google', 'github' initiating the authentication process for signing in with a Google and github account.


### Making a route protected / private route

