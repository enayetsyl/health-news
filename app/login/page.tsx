import Image from "next/image";

const page = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-5">
    <h1 className="text-4xl font-bold mb-5">Login</h1>      
    <div>
      <button className="bg-logo px-8 py-3 gap-3 text-white flex justify-center items-center rounded-3xl">
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
      <button className="bg-logo px-8 py-3 gap-3 text-white flex justify-center items-center rounded-3xl">
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