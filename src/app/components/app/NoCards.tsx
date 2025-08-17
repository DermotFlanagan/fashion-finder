import React from "react";

function NoCards() {
  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-4 rounded-xl">
      <h1 className="text-4xl mb-4">🥹</h1>
      <h1 className="text-xl font-bold">
        You swiped so far we ran out of items!
      </h1>
      <p className="text-lg text-neutral-400">Check back soon for more</p>
    </div>
  );
}

export default NoCards;
