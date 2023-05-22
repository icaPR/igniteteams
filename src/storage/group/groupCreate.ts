import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupGetAll";

export async function groupCreate(newGroupName: string) {
  try {
    const storaedGroups = await groupsGetAll();
    const storage = JSON.stringify([...storaedGroups, newGroupName]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
