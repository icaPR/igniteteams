import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playersGet } from "./playersGet";
import { PLAYER_COLLECTION } from "@storage/storageConfig";

export async function playerAdd(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const storedPlayers = await playersGet(group);
    const playerAlreadyExists = storedPlayers.filter(
      (player) => player.name === newPlayer.name
    );

    if (playerAlreadyExists.length > 0) {
      throw new AppError(`Player "${newPlayer.name}" já existe`);
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
