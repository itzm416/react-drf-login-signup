from django.urls import path
# from account.views import UserLoginView, UserRegistrationView, UserProfileView, User_ChangePassword_View, User_Send_Email_Password_View, User_PasswordReset_View
from account.views import UpdateProfileView, UserRegistrationView, UserProfileView, UserLoginView, User_Email_Verify_View, User_Change_Password_View, User_Send_Email_Password_View, User_Password_Reset_View
urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name=''),
    path('login/', UserLoginView.as_view(), name=''),
    path('profile/', UserProfileView.as_view(), name=''),
    path('updateprofile/', UpdateProfileView.as_view(), name=''),
    path('verify-email/<uid>/<token>/', User_Email_Verify_View.as_view(), name=''),

    path('change-password/', User_Change_Password_View.as_view(), name=''),

    path('send-reset-password-email/', User_Send_Email_Password_View.as_view(), name=''),
    path('passwordreset/<uid>/<token>/', User_Password_Reset_View.as_view(), name=''),

]


