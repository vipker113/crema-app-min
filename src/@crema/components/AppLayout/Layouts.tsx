import Standard from "./Standard";
import Default from "./Default";
import { NavStyle } from "@crema/constants/AppEnums";
import HeaderUserLayout from "./UserHeader";
import HeaderUserMiniLayout from "./UserMiniHeader";

const Layouts: any = {
  [NavStyle.STANDARD]: Standard,
  [NavStyle.DEFAULT]: Default,
  [NavStyle.HEADER_USER]: HeaderUserLayout,
  [NavStyle.HEADER_USER_MINI]: HeaderUserMiniLayout,
};
export default Layouts;
