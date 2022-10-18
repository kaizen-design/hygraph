import Image from "next/image";

const Author = ({ author }) => {  
  return (
    <div className="text-center mt-20 mb-8 px-6 py-12 lg:p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="absolute left-0 right-0 -top-12">
        <Image 
          src={author.photo.url} 
          width="96"
          height="96"
          alt={author.name} 
          className="w-24 h-24 rounded-full align-middle" 
        />
      </div>
      <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white">{author.bio}</p>
    </div>
  );
};

export default Author;