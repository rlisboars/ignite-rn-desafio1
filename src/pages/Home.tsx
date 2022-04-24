import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    const existingTask = tasks.find(task => task.title === newTaskTitle)
    if (!existingTask) setTasks(oldState => [...oldState, newTask])
    else Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
  }

  function handleToggleTaskDone(id: number) {
    let newTasks = [...tasks]
    const taskIndex = newTasks.findIndex(task => task.id === id)
    newTasks[taskIndex] = { ...newTasks[taskIndex], done: !newTasks[taskIndex].done }
    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover Item', 'Tem certeza que você deseja remover esse item?', [
      { text: 'Não', onPress: () => { } },
      {
        text: 'Sim', onPress: () => {
          let newTasks = [...tasks]
          const taskIndex = newTasks.findIndex(task => task.id === id)
          newTasks.splice(taskIndex, 1)
          setTasks(newTasks)
        }
      }
    ])
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    let newTasks = [...tasks]
    const taskIndex = newTasks.findIndex(task => task.id === id)
    newTasks[taskIndex] = { ...newTasks[taskIndex], title: taskNewTitle }
    setTasks(newTasks)
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