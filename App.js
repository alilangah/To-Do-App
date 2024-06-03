/*
 * Task:
 * Create two input fields: the first for the date and the second for the task. Add a button to save the task.
 * i. When the user clicks on the Save button and the date and task fields are empty, show a message saying "Please enter date and task."
 * ii. Display the task in a flatlist upon clicking on save button and display both the date and task along with a delete icon button.
 * iii. Add a delete button to remove the particular task from the array if the user wants to delete it.(Optional but recommedned)
 * @format
 */

import {View, Text, TextInput, StyleSheet, Button, Alert, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

export default function App() {
  const [date, setDate] = useState('');                         //take useState that get date and set date into the first inputText date
  const [task, setTask] = useState('');                         //used to get and set task that input from the user and set into second inputText
  const [taskList, setTaskList] = useState([]);                 // this state is used to get list of tasks input from the user and set an array of data & show user what date and tasks inputs

  const handleSave = () => {                            // this handleSave funtion used to save inputs that enter from the user
    if (date === '' || task === '') {                   // here we check that date and task enter or not from the user 
      Alert.alert('Please Enter Date and Task.');
    } else { // set to show  data that enter from the user
      setTaskList([...taskList, {id: Math.random().toString(), date, task}]); 
      setDate(''); 
      setTask('');
    }
  };

  const handeleDelete = taskId => {                    // this funtion used to delete the task list if you want to delete
    setTaskList(taskList.filter(task => task.id !== taskId));
  };
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>Task App</Text>
      <TextInput                                 // get input numeric numbers date from the user 
      style={Styles.input} 
      placeholder="Enter Date" 
      value={date} 
      onChangeText={setDate}
      keyboardType='numeric'
      />
      <TextInput                                // get input task value from the user 
      style={Styles.input} 
      placeholder="Enter Task" 
      value={task}
      onChangeText={setTask}
      />
      <Button title="Save Task" onPress={handleSave} /> 
      <FlatList                                 //FlatList that shows the list of given input values from the user
      data={taskList}                           //get taskList from the useState 
      keyExtractor={item => item.id}            // get item id that shoews data through index number
      renderItem={({item}) => ( 
        
        // get date and task from item's id 
        // and next shows the list of data 
        // with delete button through which we can delete the task 
        <View style={Styles.taskItems}>
         <Text>{item.date} : {item.task}</Text>               
          <TouchableOpacity onPress={ () => handeleDelete(item.id)}>
            <Text style={Styles.deleteBtn}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      />
    </View>
  );
}
const Styles = StyleSheet.create({      // styleSheet API used for styling the UI
  container: {
    flex: 1,
    padding: 30,
  },
  text: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 5,
  },
  taskItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 10,
  },
  deleteBtn: {
    color: 'red',
  },
});


