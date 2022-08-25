import { StatusBar } from "expo-status-bar";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, ENTER, CLEAR } from "./src/constants";
import Keyboard from "./src/components/Keyboard";
import { useState, useEffect } from "react";

const NUMBER_OF_TRIES = 5;
function copyArray(arr) {
  return [...arr.map((row) => [...row])];
}
export default function App() {
  const word = "hello";
  const letters = word.split("");
  //state for whole map
  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(""))
  );
  //for adding the value at the correct position
  //states
  const [currRow, setCurrRow] = useState(0);
  const [currCol, setCurrCol] = useState(0);
  const [status, setStatus] = useState("playing");
  //when key pressed adding the alphabet at correct postion
  const onKeyPressed = (key) => {
    if (status !== "playing") return;
    //copy array since cant change the original state
    const newCopy = copyArray(rows);

    //if clear
    if (key === CLEAR) {
      if (currCol > 0) {
        newCopy[currRow][currCol - 1] = "";
        setCurrCol(currCol - 1);
        setRows(newCopy);
      }
      return;
    }
    //if enter going to next row
    if (key === ENTER) {
      if (currRow < rows.length && currCol === rows[0].length) {
        setCurrRow(currRow + 1);
        setCurrCol(0);
      }
      return;
    }
    //moving to next col cell
    if (currCol < rows[0].length) {
      newCopy[currRow][currCol] = key;
      setCurrCol(currCol + 1);
      setRows(newCopy);
    }
  };
  //is cell active border
  const isCellActive = (i, j) => {
    return i === currRow && j === currCol;
  };
  //getting background color
  const getCellBgColor = (letter, i, j) => {
    //return when col last
    if (i >= currRow) {
      return colors.black;
    }
    if (letter === letters[j]) {
      return colors.primary;
    }
    if (letters.includes(letter)) {
      return colors.secondary;
    }
    return colors.darkgrey;
  };
  //main function for key color
  const getAllLetterWithColor = (color) => {
    return rows.flatMap((row, i) =>
      row.filter((letter, j) => getCellBgColor(letter, i, j) === color)
    );
  };
  //colors for key board
  const greenCaps = getAllLetterWithColor(colors.primary);
  const yellowCaps = getAllLetterWithColor(colors.secondary);
  const blackCaps = getAllLetterWithColor(colors.darkgrey);
  //use effect for checking if we win or lost the game
  useEffect(() => {
    if (currRow > 0) {
      //checking if we won the game
      if (gameWon()) {
        Alert.alert("yay", "you did it");
        setStatus("won");
      } else if (currRow === rows.length) {
        Alert.alert("meh", "try next time");
        setStatus("lost");
      }
    }
  }, [currRow]);
  const gameWon = () => {
    return rows[currRow - 1].every((letter, i) => letter === letters[i]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>WORDLE</Text>
      <ScrollView style={styles.map}>
        {rows.map((row, i) => (
          <View key={`row-${i}`} style={styles.row}>
            {row.map((letter, j) => (
              <View
                key={`col-${j}`}
                style={[
                  styles.cell,
                  {
                    borderColor: isCellActive(i, j)
                      ? colors.lightgrey
                      : colors.darkgrey,
                    backgroundColor: getCellBgColor(letter, i, j),
                  },
                ]}
              >
                <Text style={[styles.cellText]}>{letter.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <Keyboard
        yellowCaps={yellowCaps}
        greyCaps={blackCaps}
        onKeyPressed={onKeyPressed}
        greenCaps={greenCaps}
      />
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
