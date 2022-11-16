export interface User {
  id: string;
  userName: string;
  icon: string;
  money: number;
  bets: Array<number>;
}

export function createUser(
  id: string,
  userName: string,
  icon: string,
  money: number
): User {
  return {
    id,
    userName,
    icon,
    money,
    bets: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };
}
