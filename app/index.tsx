import React, { useState } from "react";
import { View, StyleSheet, Button, FlatList, ListRenderItem } from "react-native";
import GoalItem from "../components/GoalItem";
import GoalInput from "@/components/GoalInput";

type Goal = {
  text: string;
  key: string;
};

export default function Index() {
  const [courseGoals, setCourseGoals] = useState<Goal[]>([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function addGoalHandler(enteredGoalText: string) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, key: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function deleteGoalHandler(id: string) {
    setCourseGoals((currentCourseGoals) =>
      currentCourseGoals.filter((goal) => goal.key !== id)
    );
  }

  const renderItem: ListRenderItem<Goal> = ({ item }) => (
    <GoalItem
      text={item.text}
      id={item.key}
      onDeleteItem={deleteGoalHandler}
    />
  );

  return (
    <>
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
  goalsContainer: {
    flex: 5,
  },
});
