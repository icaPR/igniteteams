import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Hightlight } from "@components/Hightlight";
import { Input } from "@components/Input";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";

export function NewGroup() {
  const navigation = useNavigation();

  function handleNavigation() {
    navigation.navigate("players", { group: "a" });
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
        <Input placeholder="Nome da turma" />
        <Button
          title="Crirar"
          onPress={handleNavigation}
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  );
}
