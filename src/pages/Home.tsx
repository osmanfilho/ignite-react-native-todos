import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const existingTask = tasks.find(task => task.title === newTaskTitle);

    console.log(1)

    if (existingTask) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );

      return;
    }

    console.log(2)

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };

    console.log(3)

    setTasks(oldState => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldState => oldState.map(
      task => task.id === id ? { ...task, done: true } : task
    ));
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks(oldState => oldState.filter(
              task => task.id !== id
            ));
          },
          style: "default",
        }
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    setTasks(oldState => oldState.map(
      task => task.id === taskId ? { ...task, title: taskNewTitle } : task
    ));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})