from django.urls import path
from .views import getProducts, getProduct
app_name = 'base'

urlpatterns = [
    path('products/',getProducts,name='products'),
    path('products/<int:id>/',getProduct,name='product'),
]
