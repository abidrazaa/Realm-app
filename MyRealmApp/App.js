/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import User from './src/components/User';
import Realm from "realm";

const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    status: "string?",
  },
  primaryKey: "_id",
};

(async () => {

  const realm = await Realm.open({
    path: "myrealm",
    schema: [TaskSchema],
  });

  // ### Add a couple of Tasks in a single, atomic transaction
  // let task1, task2;
  // realm.write(() => {
  //   task1 = realm.create("Task", {
  //     _id: 5,
  //     name: "go grocery shopping",
  //     status: "Open",
  //   });

    // task2 = realm.create("Task", {
    //   _id: 2,
    //   name: "go exercise",
    //   status: "Open",
    // });
    // console.log(`created two tasks: ${task1.name}`);
  // })

  // ### Get data from Realm
  const tasks = realm.objects("Task");
  console.log(`The lists of tasks are: ${tasks.map((task) => {
    return(task.name + "   "+ task.status)
  })}`);

  // ### filter out data
  const openTasks = tasks.filtered("status = 'Open'");
  console.log(
    `The lists of open tasks are: ${openTasks.map(
      (openTask) => openTask.name
    )}`
  );

  // ### modify an object
  // realm.write(() => {
  //   task1.status = "InProgress";
  // });

  realm.write(()=>{
    let myTask = realm.objectForPrimaryKey("Task",5) // first parameter is collection and the other is id for that object
    myTask.status = "Closed"
  })

  // ### Deletes an object
  // realm.write(() => {
  //   realm.delete(task1);
  //   // Discard the reference.
  //   task1 = null;
  // });

})()

const App = () => {

  return (
    <SafeAreaView>
      <View style={{alignContent:"center", alignSelf:"center"}}>
        <Text>Hi this is the Realm implementation APK. Check this out.</Text>
        <User />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
