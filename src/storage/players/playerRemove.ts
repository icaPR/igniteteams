import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGet } from "./playersGet";

export async function playerRemove(playerName: string, group: string) {
  try {
    const storage = await playersGet(group);

    const filtered = storage.filter((player) => player.name !== playerName);

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify(filtered)
    );
  } catch (error) {}
}
