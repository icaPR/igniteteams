import AsyncStorage from "@react-native-async-storage/async-storage";
import { playersGet } from "./playersGet";

export async function playersGetByTeam(group: string, team: string) {
  try {
    const storage = await playersGet(group);

    const players = storage.filter((player) => player.team === team);

    return players;
  } catch (error) {
    throw error;
  }
}
