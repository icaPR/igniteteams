import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Hightlight } from "@components/Hightlight";
import { Input } from "@components/Input";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  async function handleNavigation() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo grupo", "Informe o nome da turma");
      }
      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possivel criar um novo grupo");
      }
      console.log(error);
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Hightlight
          title="Nova Turma"
          subtitle="crie uma turma para adcionar pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroup} />
        <Button
          title="Crirar"
          onPress={handleNavigation}
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  );
}
