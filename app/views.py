from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'admins/upload_weekly_ad_details.html')