import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Hightlight } from "@components/Hightlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { FlatList } from "react-native";
import { useState } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute } from "@react-navigation/native";

type RouteParams = {
  group: string;
};

export function Players() {
  const [team, setTeam] = useState("time a");
  const [players, setPlayers] = useState(["time a", "time b"]);
  const route = useRoute();
  const { group } = route.params as RouteParams;

  return (
    <Container>
      <Header showBackButton />
      <Hightlight title={group} subtitle="adcione a galera e separe os times" />
      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
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
      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
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
      <Button title="Remover Turma" type="SECONDARY" />
    </Container>
  );
}
