import React, { Suspense } from "react";
import { HeaderPublic } from "../_components/headerPublic";
import { Footer } from "../_components/footer";
import CafePostClient from "./cafePostClient";

const CafePost = () => {
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
        <Footer />
      </div>
    </div>
  );
};

export default CafePost;
