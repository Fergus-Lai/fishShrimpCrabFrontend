import React from "react";

export default function image(name: string) {
  return (
    <img
      className="object-none object-cente mx-auto"
      src={require(`../imgs/${name}.png`)}
      alt={name}
    />
  );
}
