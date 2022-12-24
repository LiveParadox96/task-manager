import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import { sortByDate } from "../../utils/helpers/sort-by-date";
import { ITask } from "./Task.types";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    list: sortByDate([
      {
        uuid: uuid.v4(),
        title: "Сходить за хлебом",
        date: new Date("2022-08-25"),
        isCompleted: false,
      },
      {
        uuid: uuid.v4(),
        title: "Пообедать",
        date: new Date("2022-03-12"),
        description: "В 13:30 мне нужно обязательно пообедать!!!",
        isCompleted: false,
      },
      {
        uuid: uuid.v4(),
        title: "Отпраздновать Новый год",
        date: new Date("2022-12-31"),
        description:
          "Собраться всей семьей до 12 ночи и после этого пойти гулять с друзьями или нет, потому что я буду праздновать с Ириной",
        isCompleted: false,
      },
    ]),
  },
  reducers: {
    addTask: (state, action) => {
      state.list.unshift(newTaskDTO(action.payload));
    },
    removeTask: (state, action) => {
      state.list = state.list.filter((task) => task.uuid !== action.payload);
    },
    changeTaskStatus: (state, action) => {
      const index = state.list.findIndex(
        (task) => task.uuid === action.payload.uuid
      );
      state.list[index] = {
        ...state.list[index],
        isCompleted: !action.payload.isCompleted,
      };
    },
    updateTask: (state, action) => {
      const index = state.list.findIndex(
        (task) => task.uuid === action.payload.uuid
      );
      state.list[index] = {
        ...state.list[index],
        ...action.payload,
      };
    },
    clearTasks: (state) => {
      state.list = [];
    },
  },
});

const newTaskDTO = (task: Pick<ITask, "title" | "date">) => ({
  ...task,
  uuid: uuid.v4(),
  isCompleted: false,
});

export const { addTask, removeTask, clearTasks, changeTaskStatus, updateTask } =
  tasksSlice.actions;
