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
} from "@crema/constants/ActionTypes";
import { createAction } from "@reduxjs/toolkit";
import {
  ContactObjType,
  FolderObjType,
  LabelObjType,
} from "@crema/types/models/apps/Contact";

export const ContactListAction = createAction<{
  data: ContactObjType[];
  count: number;
}>(GET_CONTACT_LIST);

export const ContactFolderListAction = createAction<FolderObjType[]>(
  GET_CONTACT_FOLDER_LIST
);

export const ToggleContactAction = createAction(TOGGLE_CONTACT_DRAWER);

export const ContactLabelAction = createAction<LabelObjType[]>(
  GET_CONTACT_LABEL_LIST
);

export const CreateNewAction = createAction<ContactObjType>(CREATE_NEW_CONTACT);

export const DeleteAction = createAction<{
  data: ContactObjType[];
  count: number;
}>(DELETE_CONTACT);
export const UpdateContactAction = createAction<{
  data: ContactObjType[];
  labelName: string;
  LabelObjType: number;
}>(UPDATE_CONTACT_LABEL);

export const UpdateContactStaredAction = createAction<{
  data: ContactObjType[];
  folderName: string;
}>(UPDATE_CONTACT_STARRED_STATUS);

export const UpdateContactDetailsAction = createAction<ContactObjType>(
  UPDATE_CONTACT_DETAIL
);
