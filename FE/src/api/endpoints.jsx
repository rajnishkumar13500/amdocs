export const endPoints = {
  authLogin: "/auth/login",
  authSignup: "/auth/signup",
  authUpdateProfile: "/auth/update",
  courses: "/courses",
  courseEnroll: (id) => `/courses/${id}/enroll`,
  userInfo: "/auth/profile",
};
