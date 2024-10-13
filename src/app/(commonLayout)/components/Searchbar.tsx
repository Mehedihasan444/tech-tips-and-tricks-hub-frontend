// "use client";
// import useDebounce from "@/hooks/debounce.hook";
// import { useSearchPosts } from "@/hooks/search.hook";
// import { ISearchResult } from "@/types/ISearchResult";
// import { Input } from "@nextui-org/react";
// import { SearchIcon } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const Searchbar = () => {
//   const { mutate: handleSearch, data, isPending, isSuccess } = useSearchPosts();
//   const [search, setSearch] = useState("");
//   const [searchResults, setSearchResults] = useState<ISearchResult[] | []>([]);
//   const router = useRouter();

//   const searchTerm = useDebounce(search);

//   const handleSeeAll = (query: string) => {
//     const queryString = query.trim().split(" ").join("+");

//     router.push(`/posts?query=${queryString}`);
//   };
//   useEffect(() => {
//     if (searchTerm) {
//       handleSearch(searchTerm);
//     }
//     handleSeeAll(data.search);
//   }, [searchTerm, data, handleSeeAll, handleSearch]);

//   useEffect(() => {
//     if (!searchTerm) {
//       setSearchResults([]);
//     }
//     if (!isPending && isSuccess && data && searchTerm) {
//       setSearchResults(data?.data?.hits ?? []);
//     }
//   }, [isPending, isSuccess, data, searchTerm]);

//   return (
//     <div className="">
//       <Input
//         onChange={(e) => setSearch(e.target.value)}
//         // label="Search"
//         isClearable
//         radius="full"
//         classNames={{
//           label: "text-black/50 dark:text-white/90 ",
//           input: [
//             "bg-transparent",
//             "text-black/90 dark:text-white/90",
//             "placeholder:text-default-700/50 dark:placeholder:text-white/60",
//           ],
//           innerWrapper: "bg-transparent",
//           inputWrapper: [
//             "shadow-md",
//             "bg-default-200/50",
//             "dark:bg-default/60",
//             "backdrop-blur-xl",
//             "backdrop-saturate-200",
//             "hover:bg-default-200/70",
//             "dark:hover:bg-default/70",
//             "group-data-[focus=true]:bg-default-200/50",
//             "dark:group-data-[focus=true]:bg-default/60",
//             "!cursor-text",
//             "w-[500px] py-7",
//           ],
//         }}
//         placeholder="Type to search..."
//         startContent={
//           <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
//         }
//       />
//       {searchResults.length > 0 && (
//         <div className="mt-2 rounded-xl bg-default-100 p-3">
//           <div className="space-y-3">
//             {searchResults.map((post, index) => (
//               <Link
//                 key={index}
//                 className="text-default-900 block rounded-md from-default-200 p-2 transition-all hover:bg-gradient-to-l"
//                 href={`/posts/${post.id}`}
//               >
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <img
//                       alt="item"
//                       className="h-20 w-20 rounded-md"
//                       src={post.thumbnail}
//                     />
//                     <div>
//                       <p className="text-lg font-semibold">{post.title}</p>
//                       <p className="mt-1 line-clamp-2 h-12 w-full text-sm">
//                         {post.description}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//           <div className="mt-3 flex justify-center border-t-1 border-default-50 pt-3">
//             <button
//               className="flex items-center justify-center gap-1"
//               onClick={() => handleSeeAll(searchTerm)}
//             >
//               <span>See All</span>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Searchbar;
"use client";
import useDebounce from "@/hooks/debounce.hook";
import { useSearchPosts } from "@/hooks/search.hook";
import { ISearchResult } from "@/types/ISearchResult";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Searchbar = () => {
  const { mutate: handleSearch, data, isSuccess } = useSearchPosts();
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const router = useRouter();
  const searchTerm = useDebounce(search);

  const handleSeeAll = (query: string) => {
    const queryString = query.trim().split(" ").join("+");
    router.push(`/posts?query=${queryString}`);
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    } else {
      setSearchResults([]); // Clear results if searchTerm is empty
    }
  }, [searchTerm, handleSearch]);

  useEffect(() => {
    if (isSuccess && data && searchTerm) {
      setSearchResults(data?.data?.hits ?? []);
    }
  }, [isSuccess, data, searchTerm]);

  return (
    <div className="relative">
      <Input
      aria-label="Search"
        onChange={(e) => setSearch(e.target.value)}
        isClearable
        radius="full"
        classNames={{
          label: "text-black/50 dark:text-white/90 ",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-md",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
            "w-[500px] py-7",
          ],
        }}
        placeholder="Type to search..."
        startContent={
          <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
      {searchResults.length > 0 && (
        <div className="absolute top-14  mt-2 rounded-xl bg-default-100 p-3">
          <div className="space-y-3">
            {searchResults?.map((post) => (
              <Link
                key={post.id} // Using post.id instead of index for better key usage
                className="text-default-900 block rounded-md from-default-200 p-2 transition-all hover:bg-gradient-to-l"
                href={`/posts/${post.id}`}
              >
                <div className="flex items-center gap-2">
                  <Image
                    alt="item"
                    className="h-20 w-20 rounded-md"
                    height={80}
                    width={80}
                    src={post.thumbnail}
                  />
                  <div>
                    <p className="text-sm font-semibold">{post.title}</p>
                    <p className="mt-1 line-clamp-2 h-12 w-full text-sm">
                      {/* {post.content.slice(0,100)} */}
                      {
                        post.category
                      }
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-3 flex justify-center border-t-1 border-default-50 pt-3">
            <button
              className="flex items-center justify-center gap-1"
              onClick={() => handleSeeAll(searchTerm)}
            >
              <span>See All</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
