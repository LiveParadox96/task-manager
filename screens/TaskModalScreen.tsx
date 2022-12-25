import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  WarningOutlineIcon,
} from "native-base";
import { Platform, StyleSheet } from "react-native";
import { View, Text } from "../components/Themed";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useTaskModalScreenViewModel } from "../hooks/useTaskModalScreen";
import { dateFormat } from "../utils/helpers/date-format";

const MAX_TITLE_SIZE = 240;
const MAX_DESCRIPTION_SIZE = 1000;
const ERRORS = {
  TASK_TITLE: `Введено больше ${MAX_TITLE_SIZE} симоволов`,
  TASK_DESCRIPTION: `Введено больше ${MAX_DESCRIPTION_SIZE} симоволов`,
} as const;

export default function TaskModalScreen() {
  const {
    isEdit,
    taskTitleInput,
    taskDescriptionInput,
    date,
    addNewTask,
    updateCurrentTask,
    setDate,
    setTaskTitleInput,
    setTaskDescriptionInput,
  } = useTaskModalScreenViewModel();

  const [showDateTimePickerForAndroid, setShowDateTimePickerForAndroid] =
    useState(false);
  const isIos = Platform.OS === "ios";
  const isAndroid = Platform.OS === "android";

  const getDateTimePicker = () => {
    if (isIos)
      return (
        <RNDateTimePicker
          value={date}
          display="spinner"
          style={styles.datePickerIos}
          mode="date"
          onChange={(_event, _date) => setDate(_date!)}
        />
      );

    if (showDateTimePickerForAndroid) {
      return (
        <RNDateTimePicker
          value={date}
          display="default"
          style={styles.datePickerAndroid}
          mode="date"
          onChange={(_event, _date) => {
            setDate(_date!);
            setShowDateTimePickerForAndroid(false);
          }}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Box w="90%">
        <HStack space={2}>
          <FormControl
            isInvalid={taskTitleInput.length > MAX_TITLE_SIZE}
            w="100%"
          >
            <FormControl.Label>Название</FormControl.Label>
            <Input
              onChangeText={setTaskTitleInput}
              value={taskTitleInput}
              placeholder="Название событие"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {ERRORS.TASK_TITLE}
            </FormControl.ErrorMessage>
          </FormControl>
        </HStack>
        <HStack space={2}>
          <FormControl
            isInvalid={taskTitleInput.length > MAX_DESCRIPTION_SIZE}
            w="100%"
          >
            <FormControl.Label>Описание</FormControl.Label>
            <Input
              onChangeText={setTaskDescriptionInput}
              value={taskDescriptionInput}
              placeholder="Описание события"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {ERRORS.TASK_DESCRIPTION}
            </FormControl.ErrorMessage>
          </FormControl>
        </HStack>
        <HStack space={2} style={styles.datePickerContainer}>
          {isAndroid && (
            <Button
              marginTop={4}
              onPress={() => setShowDateTimePickerForAndroid(true)}
              w="100%"
            >
              <Text>
                <Text style={{ color: "white" }}>Дата: </Text>
                <Text style={{ color: "white" }}>{dateFormat(date)}</Text>
              </Text>
            </Button>
          )}
          {getDateTimePicker()}
        </HStack>
        <Button
          marginTop={4}
          onPress={isEdit ? updateCurrentTask : addNewTask}
          w="100%"
        >
          {isEdit ? "Изменить событие" : "Добавить новое событие"}
        </Button>
      </Box>

      <StatusBar style={isIos ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  datePickerContainer: {
    marginTop: 16,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  datePickerAndroid: {
    alignSelf: "flex-start",
    position: "absolute",
  },
  datePickerIos: {
    alignSelf: "flex-start",
  },
});
