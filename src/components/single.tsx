import image from "./image";

export default function single(name: string) {
  return <div className="basis-full md:basis-1/3 my-2">{image(name)}</div>;
}
