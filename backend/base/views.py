from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .models import Product, Order, OrderItem, ShippingAddress, Review
from .serializers import ProductSerializer,UserSerializer, UserSerializerWithToken, OrderSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from datetime import datetime

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name = data['name'],
            username = data['username'],
            email = data['email'],
            password = make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this username already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUser(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data

    user.first_name = data['name']
    user.username = data['username']
    user.email = data['email']
    if data['password'] != '':
        user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProducts(request):
    keyword = request.query_params.get('keyword')
    print(keyword)
    if keyword == None:
        keyword = ''

    products = Product.objects.filter(name__icontains=keyword)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request,id):
    product = Product.objects.get(id=id)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:2]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItem(request):
    user = request.user
    data = request.data
    print('yo')
    orderItems = data['orderItems']
    print(data)
    if len(orderItems) == 0:
        print('yo')
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        print('yo1')
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )
        print('yo2')
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )
        print('yo3')
        for i in orderItems:
            product = Product.objects.get(id=i['product_id'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

            product.countInStock -= item.qty
            product.save()
        print('yo4')
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def myOrders(request):
    user = request.user
    orders = user.order_set.all()

    serializer = OrderSerializer(orders, many = True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderByID(request,id):
    user = request.user

    try:
        order = Order.objects.get(id=id)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many = False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not Authorized to view the content'}, status = status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exits'}, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,id):
    order = Order.objects.get(id=id)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order is paid')
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, id):
    user = request.user
    data = request.data
    product = Product.objects.get(id=id)

    isExists = product.review_set.filter(user=user).exists()

    if isExists:
        return Response({'detail':'Already Reviewed'},status=status.HTTP_400_BAD_REQUEST)
    else:
        review = Review.objects.create(
            product = product,
            user = user,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment']
        )

        product.numReviews += 1
        print((product.rating+int(data['rating']))/2)
        rating = (product.rating+int(data['rating']))/2
        product.rating = rating
        product.save()

        return Response('Review Is Created')




