import React from "react";

const Heading = ({ heading }) => {
  return (
    <div className="text-center">
      <div>
        <h3 className="text-3xl font-extrabold uppercase mb-2 mt-4">
          {heading}
        </h3>
      </div>
    </div>
  );
};

export default Heading;
