import React, { Suspense } from "react";
import { HeaderPublic } from "../_components/HeaderPublic";
import { FooterDefault } from "../_components/Footer/FooterDefault";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import CafePostClient from "./CafePostClient";
=======
import CafePostClient from "./cafePostClient";
>>>>>>> 2750038 (commit)
=======
import CafePostClient from "./cafePostClient";
=======
import CafePostClient from "./CafePostClient";
>>>>>>> 087321a (commit)
>>>>>>> 0a76d59 (commit)
=======
import CafePostClient from "./cafePostClient";
>>>>>>> 9909b5f (commit)

const CafePost: React.FC = () => {
  return (
    <div>
      <HeaderPublic />
      <div className="bg-tan-300 min-h-screen flex flex-col items-center justify-center">
        <Suspense
          fallback={
            <p className="text-center text-lg font-semibold mt-20">
              ☕️ コーヒーを淹れています... お待ちください
            </p>
          }
        >
          <CafePostClient />
        </Suspense>
        <FooterDefault />
      </div>
    </div>
  );
};

export default CafePost;
