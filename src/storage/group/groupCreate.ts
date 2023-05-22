import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroupName: string) {
  try {
    const storaedGroups = await groupsGetAll();

    const groupAlreadyExists = await storaedGroups.includes(newGroupName);

    if (groupAlreadyExists) {
      throw new AppError("Um grupo com esse nome já existe");
    }

    const storage = JSON.stringify([...storaedGroups, newGroupName]);
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
