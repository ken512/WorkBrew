import React, { Suspense } from "react";
import { HeaderPublic } from "../_components/HeaderPublic";
import { FooterDefault } from "../_components/Footer/FooterDefault";
import CafePostClient from "./cafePostClient";

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
