export  class  ApiUrls{

   static CheckOtp = ""
   static DisableOtp = "/v1/otp/DisableOTP"
   static LoginOrSignUp = "/v1/Auth/LoginOrSignupWithPhone"
   static OtpRequest = "/v1/otp/OtpRequest"
   static OtpExist = "/v1/Otp/CheckOTPRequestExist"
   static Profile = {
      GetProfile : "/v1/Profile/GetProfileInformation",
      GetAddress : "/v1/Profile/GetUserAddress"
   }

}  