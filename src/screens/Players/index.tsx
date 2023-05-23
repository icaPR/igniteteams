import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Hightlight } from "@components/Hightlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAdd } from "@storage/players/playerAdd";
import { playersGetByTeam } from "@storage/players/playersGetByTeam";
import { PlayerStorageDTO } from "@storage/players/PlayerStorageDTO";
import { playerRemove } from "@storage/players/playerRemove";
import { groupRemove } from "@storage/group/groupRemove";
import { Loading } from "@components/Loading";

type RouteParams = {
  group: string;
};

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("time a");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const navigation = useNavigation();

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adcionar"
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAdd(newPlayer, group);
      newPlayerNameInputRef.current?.blur();
      fetchPlayers();
      setNewPlayerName("");
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova pessoa", "Não foi possivel adcionar nova pessoa");
      }
    }
  }

  async function fetchPlayers() {
    try {
      setIsLoading(true);
      const playersByTeam = await playersGetByTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert("Pessoas", "Não foi possível carregar as pessoas");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemove(playerName, group);
      fetchPlayers();
    } catch (error) {
      Alert.alert("Remover pessoa", "Não foi possível remover essa pessoa");
    }
  }

  async function removeGroup() {
    try {
      await groupRemove(group);
      navigation.navigate("groups");
      fetchPlayers();
    } catch (error) {
      Alert.alert("Remover grupo", "Não foi possível remover esse grupo");
    }
  }

  async function handleRemoveGroup() {
    Alert.alert("Remover", "Deseja remover a turma?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => removeGroup() },
    ]);
  }

  useEffect(() => {
    fetchPlayers();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Hightlight title={group} subtitle="adcione a galera e separe os times" />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>
      <HeaderList>
        <FlatList
          data={["time a", "time b"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time." />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}
      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
