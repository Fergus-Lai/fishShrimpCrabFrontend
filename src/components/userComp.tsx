import { User } from "../interface/user";

export default function userComp(user: User) {
  return (
    <div
      key={user.id}
      className="flex basis-1/3 h-2/3 bg-slate-300/25 rounded-lg border border-gray-300/60"
    >
      <div className="flex h-full aspect-square my-auto bg-slate-500 rounded-full ml-2 border border-gray-300/60">
        <img
          className="flex object-contain object-center mx-auto p-1"
          src={require(`../imgs/${user.icon}.png`)}
          alt="user.icon"
        ></img>
      </div>
      <div className="flex basis-2/3 flex-col">
        <div className="flex basis-1/2 font-sans font-semibold text-2xl text-gray-300 ml-5">
          {user.userName}
        </div>
        <div className="flex basis-1/2 font-sans font-semibold text-2xl text-gray-300 ml-5">
          {user.money.toString()}
        </div>
      </div>
    </div>
  );
}
