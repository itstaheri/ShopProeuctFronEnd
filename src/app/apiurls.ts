export  class  ApiUrls{

   static CheckOtp = ""
   static DisableOtp = "/v1/otp/DisableOTP"
   static LoginOrSignUp = "/v1/Auth/LoginOrSignupWithPhone"
   static OtpRequest = "/v1/otp/OtpRequest"
   static OtpExist = "/v1/Otp/CheckOTPRequestExist"
   static Profile = {
      GetProfile : "/v1/Profile/GetProfileInformation",
      GetAddress : "/v1/Profile/GetUserAddress",
      AddAddress : "/v1/profile/AddAddress"

   }
   
   static Lookup = {
      GetCityList : "/v1/LookUp/GetCityLis",
      GetProvinceList : "/v1/LookUp/GetProvinceList"
   }

}  