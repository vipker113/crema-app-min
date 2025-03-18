import {
  GET_ACADEMY_DATA,
  GET_ANALYTICS_DATA,
  GET_CRM_DATA,
  GET_CRYPTO_DATA,
  GET_ECOMMERCE_DATA,
  GET_HEALTH_CARE_DATA,
  GET_METRICS_DATA,
  GET_WIDGETS_DATA,
} from "@crema/types/actions/Dashboard.action";
import { fetchError, fetchStart, fetchSuccess } from "./Common";
import { Dispatch } from "redux";
import { AppActions } from "@crema/types/actions";
import jwtAxios from "@crema/services/auth/jwt-auth";

export const onGetAcademyData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/dashboard/academy")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ACADEMY_DATA, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong, Please try again!"));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
export const onGetHCData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/dashboard/health_care")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_HEALTH_CARE_DATA, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong, Please try again!"));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
export const onGetECommerceData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/dashboard/ecommerce")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ECOMMERCE_DATA, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong, Please try again!"));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onGetAnalyticsData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/dashboard/analytics")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ANALYTICS_DATA, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong, Please try again!"));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onGetCrmData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/dashboard/crm")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CRM_DATA, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong, Please try again!"));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onGetCryptoData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/dashboard/crypto")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CRYPTO_DATA, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong, Please try again!"));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onGetMetricsData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/dashboard/metrics")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_METRICS_DATA, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong, Please try again!"));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onGetWidgetsData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/dashboard/widgets")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_WIDGETS_DATA, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong, Please try again!"));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
