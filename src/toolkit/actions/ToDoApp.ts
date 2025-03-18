import {
  CREATE_NEW_TASK,
  GET_TASK_DETAIL,
  GET_TASK_LIST,
  GET_TODO_FOLDER_LIST,
  GET_TODO_LABEL_LIST,
  GET_TODO_PRIORITY_LIST,
  GET_TODO_STAFF_LIST,
  GET_TODO_STATUS_LIST,
  TOGGLE_TODO_DRAWER,
  UPDATE_TASK_DETAIL,
  UPDATE_TASK_FOLDER,
  UPDATE_TASK_LABEL,
  UPDATE_TASK_STARRED_STATUS,
} from "@crema/types/actions/Todo.action";
import { appIntl } from "@crema/helpers/Common";
import jwtAxios from "@crema/services/auth/jwt-auth";
import { fetchError, fetchStart, fetchSuccess, showMessage } from "./Common";
import { Dispatch } from "redux";
import { AppActions } from "@crema/types/actions";
import { TodoObjType } from "@crema/types/models/apps/Todo";

export const onGetTaskList = (
  type: string,
  name: string,
  currentPage: number
) => {
  const { messages } = appIntl();
  const page = currentPage ? currentPage : null;
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/api/todo/task/list", {
        params: {
          type: type,
          name: name,
          page: page,
        },
      })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_TASK_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};

export const onToggleTodoDrawer = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: TOGGLE_TODO_DRAWER });
  };
};

export const onGetToDoLabelList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/api/todo/labels/list")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_TODO_LABEL_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};

export const onGetToDoStaffList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/api/todo/staff/list")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_TODO_STAFF_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};

export const onGetToDoPriorityList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/api/todo/priority/list")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_TODO_PRIORITY_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};

export const onGetToDoFolderList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/api/todo/folders/list")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_TODO_FOLDER_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};

export const onGetToDoStatusList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/api/todo/status/list")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_TODO_STATUS_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};

export const onUpdateTaskLabels = (
  taskIds: number[],
  type: string | number
) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put("/api/todo/update/label", { taskIds, type })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: UPDATE_TASK_LABEL, payload: data.data });
          dispatch(showMessage(String(messages["message.labelUpdatedTo"])));
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};

export const onUpdateTaskStarredStatus = (
  taskIds: number[],
  status: boolean,
  folderName: string
) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put("/api/todo/update/starred", { taskIds, status })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: UPDATE_TASK_STARRED_STATUS,
            payload: { data: data.data, folderName: folderName },
          });
          dispatch(showMessage(String(messages["message.starredStatus"])));
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};

export const onDeleteSelectedTasks = (
  taskIds: number[],
  type: string,
  name: string,
  page: number
) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put("/api/todo/update/folder", { taskIds, type, name, page })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: UPDATE_TASK_FOLDER, payload: data.data });
          dispatch(showMessage(String(messages["task.deleted"])));
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};

export const onCreateTask = (task: TodoObjType | any) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .post("/api/todoApp/compose", { task })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: CREATE_NEW_TASK, payload: data.data });
          dispatch(showMessage(String(messages["task.created"])));
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};

export const onGetSelectedTask = (id: number) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get(`/api/todoApp/task/`, {
        params: {
          id: id,
        },
      })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_TASK_DETAIL, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};

export const onUpdateSelectedTask = (task: TodoObjType) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put("/api/todoApp/task/", { task })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: UPDATE_TASK_DETAIL,
            payload: data.data,
          });
          dispatch(
            showMessage(
              task.folderValue === 126
                ? String(messages["task.deleted"])
                : String(messages["task.updated"])
            )
          );
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};
