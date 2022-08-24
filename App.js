import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "./src/constants";
import Keyboard from "./src/components/Keyboard";

const NUMBER_OF_TRIES = 5;
export default function App() {
  const word = "someone";
  const letters = word.split("");
  const rows = new Array(NUMBER_OF_TRIES).fill(
    new Array(letters.length).fill("a")
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>WORDLE</Text>
      <ScrollView style={styles.map}>
        {rows.map((row) => (
          <View style={styles.row}>
            {letters.map((cell) => (
              <View style={styles.cell}>
                <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <Keyboard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    letterSpacing: 7,
    fontWeight: "bold",
  },
  map: {
    height: 500,
    alignSelf: "stretch",
    marginVertical: 20,
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
  },
  cell: {
    borderColor: colors.grey,
    flex: 1,
    borderWidth: 1,
    height: 30,
    aspectRatio: 1,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    color: colors.lightgrey,
    fontSize: 28,
    fontWeight: "bold",
  },
});
