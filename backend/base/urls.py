from django.urls import path
from .views import getProducts, getProduct, getUser, getUsers, register_user,updateUser, addOrderItem
from .views import MyTokenObtainPairView

app_name = 'base'

urlpatterns = [
    path('user/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/register/', register_user, name='register-user'),
    path('user/profile/',getUser,name='user-profile'),
     path('user/profile/update/',updateUser,name='user-profile-update'),
    path('users/',getUsers,name='user-list'),
    path('products/',getProducts,name='products'),
    path('products/<int:id>/',getProduct,name='product'),
    path('order/add/',addOrderItem,name='order-add'),
]
