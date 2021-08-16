import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => console.log(tasks), [tasks]);

  function handleAddTask(newTaskTitle: string) {
    setTasks(oldState => oldState.concat({
      ...oldState,
      id: new Date().getTime(),
      title: newTaskTitle
    }));
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldState => oldState.map(task => {
      return task.id === id ? {
        ...task,
        done: !task.done
      } : {
        ...task
      }
    }));
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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