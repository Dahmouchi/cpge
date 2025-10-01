'use client'
import { RotatingTriangles } from "react-loader-spinner";
const isLoading = () => {
  return (
    <>
      <RotatingTriangles
        visible={true}
        height="80"
        width="80"
        ariaLabel="rotating-triangles-loading"
      />
    </>
  );
};

export default isLoading;
