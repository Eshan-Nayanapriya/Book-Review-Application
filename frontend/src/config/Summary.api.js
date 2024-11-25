export const baseURL = "http://localhost:3000";

const SummaryApi = {
  register: {
    url: "/api/user/register",
    method: "POST",
  },
  login: {
    url: "/api/user/login",
    method: "POST",
  },
  forgot_password: {
    url: "/api/user/forgot-password",
    method: "PUT",
  },
  OTP_Verify:{
    url: "/api/user/otp-verify",
    method: "PUT",
  }
};

export default SummaryApi;
