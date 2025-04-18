import { Dispatch } from "redux";
import { AppActions } from "@crema/types/actions";
import { fetchError, fetchStart, fetchSuccess, showMessage } from "./Common";
import {
  CREATE_NEW_CONTACT,
  DELETE_CONTACT,
  GET_CONTACT_FOLDER_LIST,
  GET_CONTACT_LABEL_LIST,
  GET_CONTACT_LIST,
  TOGGLE_CONTACT_DRAWER,
  UPDATE_CONTACT_DETAIL,
  UPDATE_CONTACT_LABEL,
  UPDATE_CONTACT_STARRED_STATUS,
} from "@crema/types/actions/Contact.actions";
import { appIntl } from "@crema/helpers/Common";
import jwtAxios from "@crema/services/auth/jwt-auth";
import { ContactObjType } from "@crema/types/models/apps/Contact";

export const onGetContactList = (
  type: string,
  name: string,
  currentPage: number
) => {
  const { messages } = appIntl();
  const page = currentPage ? currentPage : 0;
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/api/contactApp/contact/List", {
        params: {
          type: type,
          name: name,
          page: page,
        },
      })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CONTACT_LIST, payload: data.data });
        } else {
          dispatch(
            fetchError(messages["message.somethingWentWrong"] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onGetLabelList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/api/contactApp/labels/list")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CONTACT_LABEL_LIST, payload: data.data });
        } else {
          dispatch(
            fetchError(messages["message.somethingWentWrong"] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onGetFolderList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/api/contactApp/folders/list")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CONTACT_FOLDER_LIST, payload: data.data });
        } else {
          dispatch(
            fetchError(messages["message.somethingWentWrong"] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onToggleContactDrawer = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: TOGGLE_CONTACT_DRAWER });
  };
};

export const onUpdateContactLabel = (
  contactIds: number[],
  type: number,
  labelName: string
) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put("/api/contactApp/update/label", { contactIds, type })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: UPDATE_CONTACT_LABEL,
            payload: { data: data.data, labelName: labelName, labelType: type },
          });
          dispatch(showMessage(messages["message.labelUpdated"] as string));
        } else {
          dispatch(
            fetchError(messages["message.somethingWentWrong"] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onUpdateStarredStatus = (
  contactIds: number[],
  status: boolean,
  folderName: string
) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put("/api/contactApp/update/starred", { contactIds, status })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: UPDATE_CONTACT_STARRED_STATUS,
            payload: { data: data.data, folderName: folderName },
          });
          dispatch(showMessage(messages["message.starredStatus"] as string));
        } else {
          dispatch(
            fetchError(messages["message.somethingWentWrong"] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onDeleteContacts = (
  type: string,
  name: string,
  contactIds: number[],
  page: number
) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .post("/api/contactApp/delete/contact", { type, name, contactIds, page })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: DELETE_CONTACT, payload: data.data });
          dispatch(showMessage(messages["message.contactDeleted"] as string));
        } else {
          dispatch(
            fetchError(messages["message.somethingWentWrong"] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onUpdateSelectedContact = (contact: ContactObjType) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put("/api/contactApp/contact/", { contact })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: UPDATE_CONTACT_DETAIL, payload: data.data });
          dispatch(showMessage(messages["message.contactUpdated"] as string));
        } else {
          dispatch(
            fetchError(messages["message.somethingWentWrong"] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onCreateContact = (contact: ContactObjType) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .post("/api/contactApp/compose", { contact })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: CREATE_NEW_CONTACT, payload: data.data });
          dispatch(showMessage(messages["message.contactCreated"] as string));
        } else {
          dispatch(
            fetchError(messages["message.somethingWentWrong"] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
