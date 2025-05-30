import {
  CHANGE_READ_STATUS,
  COMPOSE_MAIL,
  GET_CONNECTION_LIST,
  GET_FOLDER_LIST,
  GET_LABEL_LIST,
  GET_MAIL_DETAIL,
  GET_MAIL_LIST,
  NULLIFY_MAIL,
  TOGGLE_MAIL_DRAWER,
  UPDATE_MAIL_FOLDER,
  UPDATE_MAIL_LABEL,
  UPDATE_STARRED_STATUS,
  UPDATED_MAIL_DETAIL,
} from "@crema/types/actions/Mail.action";
import { appIntl } from "@crema/helpers/Common";
import jwtAxios from "@crema/services/auth/jwt-auth";
import { fetchError, fetchStart, fetchSuccess, showMessage } from "./Common";
import { Dispatch } from "redux";
import { AppActions } from "@crema/types/actions";
import { mailListMessages } from "@crema/mockapi/fakedb/apps/mail/folderList";
import { LabelObjType, MailObjType } from "@crema/types/models/apps/Mail";

export const onGetMailList = (
  type: string,
  name: string,
  currentPage: number
) => {
  const { messages } = appIntl();
  const page = currentPage ? currentPage : null;
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/api/mailApp/folder/mail/List", {
        params: {
          type: type,
          name: name,
          page: page,
        },
      })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_MAIL_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onGetMailLabelList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/api/mailApp/labels/list")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_LABEL_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onToggleMailDrawer = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: TOGGLE_MAIL_DRAWER });
  };
};

export const onGetMailFolderList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/api/mailApp/folders/list")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_FOLDER_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onGetConnectionList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/api/mailApp/connection/list")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CONNECTION_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onUpdateMailLabels = (mailIds: number[], type: LabelObjType) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put("/api/mailApp/update/label", { mailIds, type })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: UPDATE_MAIL_LABEL, payload: data.data });
          dispatch(showMessage(String(messages["message.labelUpdatedTo"])));
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onUpdateMailStarredStatus = (
  mailIds: number[],
  status: number | boolean,
  folderName: string
) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put("/api/mailApp/update/starred", { mailIds, status })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: UPDATE_STARRED_STATUS,
            payload: { data: data.data, folderName: folderName },
          });
          dispatch(showMessage(String(messages["message.starredStatus"])));
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onUpdateMailFolders = (mailIds: number[], type: number) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put("/api/mailApp/update/folder", { mailIds, type })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: UPDATE_MAIL_FOLDER, payload: data.data });
          dispatch(showMessage(mailListMessages(type)));
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onUpdateMailReadStatus = (mailIds: number[], status: boolean) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put("/api/mailApp/update/read", { mailIds, status })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: CHANGE_READ_STATUS, payload: data.data });
          dispatch(showMessage(String(messages["message.readStatus"])));
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onGetSelectedMail = (id: number) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get(`/api/mailApp/mail/`, {
        params: {
          id: id,
        },
      })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_MAIL_DETAIL, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onUpdateSelectedMail = (mail: MailObjType) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put("/api/mailApp/mail/", { mail })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: UPDATED_MAIL_DETAIL, payload: data.data });
          dispatch(showMessage(mailListMessages(mail.folderValue)));
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onComposeMail = (mail: any, pathname: string) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .post("/api/mailApp/compose", { mail })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: COMPOSE_MAIL,
            payload: { data: data.data, pathname: pathname },
          });
          dispatch(showMessage(String(messages["mail.sentSuccessfully"])));
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onNullifyMail = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: NULLIFY_MAIL,
    });
  };
};
