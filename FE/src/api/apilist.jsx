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
  allCourses: constructURL(
    apiRoot.baseAPI,
    apiVersionControl.v1,
    endPoints.courses
  ),
  courseEnroll: (id) =>
    constructURL(
      apiRoot.baseAPI,
      apiVersionControl.v1,
      endPoints.courseEnroll(id)
    ),

  userInfo: constructURL(
    apiRoot.baseAPI,
    apiVersionControl.v1,
    endPoints.userInfo
  ),

  modelTrain: constructURL(
    apiRoot.baseAPI,
    apiVersionControl.v1,
    endPoints.modelTrain
  ),
  modelPredict: constructURL(
    apiRoot.baseAPI,
    apiVersionControl.v1,
    endPoints.modelPredict
  ),
  courseProgress: constructURL(
    apiRoot.baseAPI,
    apiVersionControl.v1,
    endPoints.courseProgress
  ),
};
