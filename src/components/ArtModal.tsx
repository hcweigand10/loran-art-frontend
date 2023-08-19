// import React, { SetStateAction, useState, Dispatch } from "react";
// import { artPiece } from "../interfaces/interfaces";
// import ArtPiece from "./ArtPiece";
// import categoryIdToName from "../utils/categoryIdToName";

// interface props {
//   artpiece: {
//     id: number;
//     title: string;
//     description: string;
//     height: number;
//     width: number;
//     depth: number;
//     price: number;
//     web: boolean;
//     image: string;
//     notes: string;
//     web_sort: number;
//     link_url: string;
//     link_text: string;
//     categoryId: number;
//     category?: string;
//     Tags: any[];
//   };
//   setShowModal: Dispatch<SetStateAction<boolean>>;
// }

// const ArtModal = (props: props) => {
//   return (
//     <div className="fixed inset-0 z-10 overflow-y-auto">
//       <div
//         className="fixed inset-0 w-full h-full bg-black opacity-40"
//         onClick={() => props.setShowModal(false)}
//       ></div>
//       <div className="flex items-center min-h-screen px-4 py-8">
//         <div className="relative w-full max-w-2xl mx-auto bg-white rounded-md shadow-lg">
//           {/* header */}
//           <ArtPiece
//             id={props.artpiece.id}
//             key={props.artpiece.id}
//             title={props.artpiece.title}
//             description={props.artpiece.description}
//             height={props.artpiece.height}
//             width={props.artpiece.width}
//             depth={props.artpiece.depth}
//             price={props.artpiece.price}
//             web={props.artpiece.web}
//             image={props.artpiece.image}
//             web_sort={props.artpiece.web_sort}
//             link_url={props.artpiece.link_url}
//             link_text={props.artpiece.link_text}
//             category={categoryIdToName(props.artpiece.categoryId)}
//             tags={props.artpiece.Tags.map((tagObj: any) => tagObj.name)}
//           />
//           {/* footer  */}
//           <div className="items-center gap-2 mt-2 bg-gray-50 py-2 px-4 flex justify-end rounded-md">
//             <button
//               className="bg-white p-2 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
//               onClick={() => props.setShowModal(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtModal;
export default {}
