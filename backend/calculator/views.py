from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
def hello_world(request):
    return JsonResponse({'message': 'Hello, World!'})

@csrf_exempt
def calculate_sum(request):
    if request.method == "GET" : 
        return JsonResponse({"res":10})
    if request.method == 'POST':
        try:
            num1 = float(request.POST.get('num1', 0))
            num2 = float(request.POST.get('num2', 0))
            result = num1 + num2
            return JsonResponse({'result': result})
        except ValueError:
            return JsonResponse({'error': 'Invalid input'}, status=400)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

        
