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