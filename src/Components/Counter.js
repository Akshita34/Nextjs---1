"use client";
import { useState } from "react";

function Counter({ data }) {
  const [cnt, setCnt] = useState(0);
  console.log(data);
  return (
    <div>
      <p>There are {data.length} users</p>
      <button onClick={() => setCnt((c) => c + 1)}>{cnt}</button>
    </div>
  );
}

export default Counter;
