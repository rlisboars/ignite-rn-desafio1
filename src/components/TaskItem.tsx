import React, { useEffect, useRef, useState } from 'react'
import { Image, Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native'
import { Task } from './TasksList'
import Icon from 'react-native-vector-icons/Feather'
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

interface TaskItemProps {
	index: number
	task: Task
	toggleTaskDone: (id: number) => void
	removeTask: (id: number) => void
	editTask: (id: number, newTaskTile: string) => void
}



export function TaskItem({ index, task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [newTitle, setNewTitle] = useState(task.title)
	const textInputRef = useRef<TextInput>(null)

	function handleStartEditing() {
		setIsEditing(true)
	}

	function handleCancelEditing() {
		setIsEditing(false)
	}

	function handleSubmitEditing() {
		if (newTitle.trim().length !== 0) {
			editTask(task.id, newTitle)
			setIsEditing(false)
		}
	}

	useEffect(() => {
		if (textInputRef.current) {
			if (isEditing) {
				textInputRef.current.focus()
			} else {
				textInputRef.current.blur()
			}
		}
	}, [isEditing])

	return (
		<>
			<View>
				<TouchableOpacity
					testID={`button-${index}`}
					activeOpacity={0.7}
					style={styles.taskButton}
					onPress={() => toggleTaskDone(task.id)}
				>
					<View
						testID={`marker-${index}`}
						style={task.done ? styles.taskMarkerDone : styles.taskMarker}
					>
						{task.done && (
							<Icon
								name="check"
								size={12}
								color="#FFF"
							/>
						)}
					</View>

					<TextInput
						style={task.done ? styles.taskTextDone : styles.taskText}
						value={newTitle}
						onChangeText={setNewTitle}
						editable={isEditing}
						onSubmitEditing={handleSubmitEditing}
						ref={textInputRef}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.iconsContainer}>
				{isEditing &&
					<TouchableOpacity
						testID={`cancel-${index}`}
						style={{ paddingHorizontal: 24 }}
						onPress={handleCancelEditing}
					>
						<Icon
							name="x"
							size={24}
							color="#B2B2B2"
						/>
					</TouchableOpacity>
				}
				{!isEditing &&
					<TouchableOpacity
						testID={`edit-${index}`}
						style={{ paddingHorizontal: 24 }}
						onPress={handleStartEditing}
					>
						<Image source={editIcon} />
					</TouchableOpacity>
				}
				<View style={styles.iconsDivider} />
				<TouchableOpacity
					testID={`trash-${index}`}
					style={{ paddingHorizontal: 24 }}
					onPress={() => removeTask(task.id)}
					disabled={isEditing}
				>
					<Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
				</TouchableOpacity>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	taskButton: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 15,
		marginBottom: 4,
		borderRadius: 4,
		flexDirection: 'row',
		alignItems: 'center'
	},
	taskMarker: {
		height: 16,
		width: 16,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#B2B2B2',
		marginRight: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	taskText: {
		color: '#666',
		fontFamily: 'Inter-Medium',
		padding: 0
	},
	taskMarkerDone: {
		height: 16,
		width: 16,
		borderRadius: 4,
		backgroundColor: '#1DB863',
		marginRight: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	taskTextDone: {
		color: '#1DB863',
		textDecorationLine: 'line-through',
		fontFamily: 'Inter-Medium',
		padding: 0
	},
	iconsContainer: {
		flexDirection: 'row'
	},
	iconsDivider: {
		width: 1,
		height: 24,
		backgroundColor: 'rgba(196, 196, 196, 0.24)'
	}
})