import image from "./image";

export default function triple(name: string) {
  return <div className="flex flex-row h-1/2">{image(name)}</div>;
}
