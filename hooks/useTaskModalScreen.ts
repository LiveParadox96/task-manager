import { useNavigation } from "@react-navigation/native";
import { useToast } from "native-base";
import React from "react";
import { useDispatch } from "react-redux";
import { ROUTES } from "../constants/Routes";
import { addTask, updateTask } from "../store/tasks/Task.slice";
import { ITask } from "../store/tasks/Task.types";

const DEFAULT_TASK_DATE = new Date(
  new Date().getTime() + 7 * 24 * 60 * 60 * 1000
);

export const useTaskModalScreenViewModel = () => {
  const navigation = useNavigation();
  const navigationState = navigation.getState();
  const params = navigationState?.routes[1]?.params as any;
  const selectedTask = params?.task as ITask;
  const isEdit = Boolean(selectedTask);

  const [taskTitleInput, setTaskTitleInput] = React.useState(
    selectedTask?.title || ""
  );
  const [taskDescriptionInput, setTaskDescriptionInput] = React.useState(
    selectedTask?.description || ""
  );
  const [date, setDate] = React.useState<Date>(
    selectedTask?.date || DEFAULT_TASK_DATE
  );

  const dispatch = useDispatch();
  const toast = useToast();
  const addNewTask = () => {
    if (!taskTitleInput) {
      navigation.navigate(ROUTES.TASKS);
      toast.show({
        title: "Не удалось добавить пустое событие",
      });
      return;
    }
    const initialTaskState = {
      title: taskTitleInput,
      description: taskDescriptionInput,
      date,
    };
    dispatch(addTask(initialTaskState));
    setTaskTitleInput("");
    navigation.navigate(ROUTES.TASKS);
  };

  const updateCurrentTask = () => {
    if (!taskTitleInput) {
      navigation.navigate(ROUTES.TASKS);
      toast.show({
        title: "Не удалось добавить пустое событие",
      });
      return;
    }
    const taskState = {
      uuid: selectedTask?.uuid,
      title: taskTitleInput,
      description: taskDescriptionInput,
      date,
    };
    dispatch(updateTask(taskState));
    setTaskTitleInput("");
    navigation.navigate(ROUTES.TASKS);
  };

  return {
    isEdit,
    taskTitleInput,
    taskDescriptionInput,
    date,
    addNewTask,
    updateCurrentTask,
    setDate,
    setTaskTitleInput,
    setTaskDescriptionInput,
  };
};
