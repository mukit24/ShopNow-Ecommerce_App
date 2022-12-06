from rest_framework.decorators import api_view
from rest_framework.response import Response
from .products import products

@api_view(['GET'])
def getProducts(request):
    return Response(products)

@api_view(['GET'])
def getProduct(request,id):
    product = None
    for product in products:
        if product['_id'] == str(id):
            product = product
            break
    return Response(product)
