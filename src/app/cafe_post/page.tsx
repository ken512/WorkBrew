"use client";
import React, { useEffect } from "react";
import { HeaderPublic } from "@/app/_components/headerPublic";
const CafePost:React.FC = () => {

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch("/api/public/cafe_post", {
          method: "GET",
          headers:{
            "Content-Type": "application/json",
          },
        });
        if(!response.ok) {
          throw new Error("Failed to fetch cafePost");
        }
      } catch(error) {
        console.log("Failed to fetch cafePost:", error);
      }
    };
    fetchData();
  })
  return (
    <div>
      <HeaderPublic />
    </div>
  )
}

export default CafePost;