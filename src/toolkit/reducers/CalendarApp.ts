import { createReducer } from "@reduxjs/toolkit";
import {
  FolderObjType,
  LabelObjType,
  PriorityObjType,
  StaffObjType,
  StatusObjType,
  TodoObjType,
} from "@crema/types/models/apps/Todo";
import {
  CreateTaskAction,
  GetFolderListAction,
  GetTaskAction,
  GetTaskListAction,
  GetTodoLabelAction,
  GetTodoPriorityAction,
  GetTodoStaffAction,
  GetTodoStatusAction,
  TodoToggleDrawerAction,
  UpdateTaskDetailAction,
  UpdateTaskFolderAction,
  UpdateTaskLabelAction,
  UpdateTaskStarredAction,
} from "./ActionTypes/Todo";

const initialState: {
  taskList: TodoObjType[];
  folderList: FolderObjType[];
  labelList: LabelObjType[];
  priorityList: PriorityObjType[];
  statusList: StatusObjType[];
  staffList: StaffObjType[];
  totalTasks: number;
  todoDrawer: boolean;
  selectedTask: TodoObjType | null;
} = {
  taskList: [],
  folderList: [],
  labelList: [],
  priorityList: [],
  statusList: [],
  staffList: [],
  totalTasks: 0,
  todoDrawer: false,
  selectedTask: null,
};

const calendarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GetTaskListAction, (state, action) => {
      state.taskList = action.payload.data;
      state.totalTasks = action.payload.count;
    })
    .addCase(GetFolderListAction, (state, action) => {
      state.folderList = action.payload;
    })
    .addCase(TodoToggleDrawerAction, (state, action) => {
      state.todoDrawer = !state.todoDrawer;
    })
    .addCase(GetTodoStatusAction, (state, action) => {
      state.statusList = action.payload;
    })
    .addCase(GetTodoLabelAction, (state, action) => {
      state.labelList = action.payload;
    })
    .addCase(GetTodoStaffAction, (state, action) => {
      state.staffList = action.payload;
    })
    .addCase(GetTodoPriorityAction, (state, action) => {
      state.priorityList = action.payload;
    })
    .addCase(CreateTaskAction, (state, action) => {
      state.taskList = [action.payload, ...state.taskList];
      state.totalTasks = state.totalTasks + 1;
    })
    .addCase(UpdateTaskFolderAction, (state, action) => {
      state.taskList = action.payload.data;
      state.totalTasks = action.payload.count;
    })
    .addCase(UpdateTaskLabelAction, (state, action) => {
      const taskIds = action.payload.map((task) => task.id);
      const updatedList = state.taskList.map((task) => {
        if (taskIds.includes(task.id)) {
          return action.payload.find(
            (selectedTask) => selectedTask.id === task.id
          );
        } else {
          return task;
        }
      });
      state.taskList = updatedList as TodoObjType[];
    })
    .addCase(UpdateTaskStarredAction, (state, action) => {
      const taskIds = action.payload.data.map((task) => task.id);
      const updatedList = state.taskList.map((task) => {
        if (taskIds.includes(task.id)) {
          return action.payload.data.find(
            (selectedTask) => selectedTask.id === task.id
          );
        } else {
          return task;
        }
      });
      const filteredList =
        action.payload.folderName === "starred"
          ? updatedList.filter((item) => item?.isStarred)
          : updatedList;
      const total =
        action.payload.folderName === "starred"
          ? state.totalTasks - action.payload.data.length
          : state.totalTasks;
      state.taskList = filteredList as TodoObjType[];
      state.totalTasks = total;
    })
    .addCase(GetTaskAction, (state, action) => {
      state.selectedTask = action.payload;
    })
    .addCase(UpdateTaskDetailAction, (state, action) => {
      state.taskList = action.payload.data;
      state.selectedTask = action.payload.task;
    });
});

export default calendarReducer;
