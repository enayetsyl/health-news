#Note 

### Creating next js project

- Create a folder and name it to your project name.
- Open the folder in VSCode.
- Open the terminal and type 
```javascript
npx create-next-app@latest .
```
- Answer the following question using arrow key and enter
- Would you like to use TypeScript? ... No / Yes  .......If you use typescript then yes otherwise no.
- Would you like to use ESLint? ... No / Yes......Should be yes
- Would you like to use Tailwind CSS? ... No / Yes       ......Should be yes
- Would you like to use `src/` directory? ... No / Yes   ......Should be yes
- Would you like to use App Router? (recommended) » No / √  ......Should be yes
- Would you like to use App Router? (recommended) ... No / Yes    ......Should be yes
- Would you like to customize the default import alias? ... No / Yes     ......Should be no

### Run a project

- Open terminal and type
```javascript
npm run dev
```
- Press ctrl and click the link

### Customize the website
- Paste the favicon image to the app folder with "favicon.ico" name
- Open the layout page inside the app folder. 

```javascript
export const metadata: Metadata = {
  title: 'Health News',
  description: 'Read and maintain for your well being.',
}
```
- Change the title and description for you project.
- Open the page.jsx/page.tsx file inside the app folder and delete everything and render a h1 tag.
- Open global.css file inside app folder and delete everything except tailwind classes. 

### Create the component folder
- At the root create a folder and name it components.
- You should create all the components inside this folder.

### SetUp the Layout page
- Inside the app folder there is a page called layout.tsx/layout.jsx. 
- This file show all the pages. If you want to show any component in all pages then you should include it here. e.g. navbar, footer etc.

```javascript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <div className="lg:max-w-7xl mx-auto px-8 lg:px-16  min-h-screen flex flex-col shadow-xl">
        <Navbar/>
        <div className="flex-auto my-5">
        {children}
        </div>
        <Footer/>
        </div>
        </body>
    </html>
  );
}
```
- You can set global font here. In our case it is Inter. 

- Inside th body tab inter font is applied so the font will be accessible throughout the app. 

- children prop render all the pages inside layout.

- Navbar and Footer component is added here so that it will be displayed in all pages. 


### Setting up Navbar

- Inside components folder create a file named Navbar.tsx/Navbar.jsx. 
```javascript
import Link from "next/link";

const Navbar = () => {
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
        <button 
        className="bg-white text-black px-3 py-2 rounded-lg font-bold text-sm">Login</button>
    </div>
  );
};

export default Navbar;
```
- Above is a simple Navbar with a logo and login button. 
- In next js inside Link tag 'to' is not used instead 'href' is used for navigating. 
- Link tag is imported from 'next/link'
- All other code is as like react and style is done using tailwind which is familiar to you. 

### Setting up footer component

- If you want to show footer throughout all the pages then you have to render it in layout file.

- Other jsx and design you can do as usual react. 


### Navigation using next link

- Route should be used in navbar inside button or text. e.g. Home, Shop, About etc. In our example we will use it in category tab. 

- The key take way is how to loop an array of and render link with lowercase text and removing spaces between words.

```javascript
import Link from "next/link";

const categories = [
  'All', 'Process Food', 'Chemical Fertilizer', 'Safe Food', 'Preservative', 'Other', 
]


const CategoriesList = () => {
  return (
    <div className="flex gap-3 text-[10px] flex-wrap text-logo font-bold">
      {
        categories.map((category, i) => (
          <Link 
          key={i}
          href={`category/${category.replace(/\s+/g, '').toLowerCase()}`}
          className="px-2 rounded-lg bg-logo text-white py-1 cursor-pointer"          
          >{category}</Link>
        ))
      }
    </div>
  );
};

export default CategoriesList;
```

### Configeration for showing image link.

- If any link is use inside an Image tag then you have to adjust in next.config.js file.
- From the root directory open next.config.js file and adjust as follows:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains: ["www.cdc.gov"]
  }
}

module.exports = nextConfig
```
- Inside images object write a property name as domains as above and it will take an array as value. Inside the array put the image website link. You can put multiple website name using , separator. 