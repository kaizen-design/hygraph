const Footer = () => {
  return (
    <div className="container mx-auto px-4 sm:px-10">
      <div className="border-t w-full flex justify-between items-center border-blue-300 py-8">
        <p className="text-white text-sm text-center font-medium w-full">
          &copy; {new Date().getFullYear()} Hygraph. All rights reserved.
        </p>      
      </div>  
    </div>
  )
};

export default Footer;