import { apiRoot } from "./root";
import { apiVersionControl } from "./root";
import { constructURL } from "./root";
import { endPoints } from "./endpoints";

export const apiList = {
  userLogin: constructURL(
    apiRoot.baseAPI,
    apiVersionControl.v1,
    endPoints.authLogin
  ),
  userSignup: constructURL(
    apiRoot.baseAPI,
    apiVersionControl.v1,
    endPoints.authSignup
  ),
  userUpdateProfile: constructURL(
    apiRoot.baseAPI,
    apiVersionControl.v1,
    endPoints.authUpdateProfile
  ),
};
