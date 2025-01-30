export const endPoints = {
  authLogin: "/auth/login",
  authSignup: "/auth/signup",
  authUpdateProfile: "/auth/update",
  courses: "/courses",
  courseEnroll: (id) => `/courses/${id}/enroll`,
  courseProgress: "/courses/progress",
  userInfo: "/auth/profile",
  modelTrain: "/recommendations/train",
  modelPredict: "/recommendations/ml-recommendations",
};
