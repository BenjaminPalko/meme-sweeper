from typing import Any
from django.shortcuts import render
from django.http import HttpRequest, JsonResponse


def BuildResponse(data: dict[str, Any], status_code: int):
    response = JsonResponse(data)
    response.status_code = status_code
    return response


# Create your views here.
def start(request: HttpRequest):

    if request.method != "POST":
        return JsonResponse({"error": "Unsupported method %s" % request.method})

    return BuildResponse({}, 200)


def details(request, game_id):
    if request.method != "GET":
        return JsonResponse({"error": "Unsupported method %s" % request.method})

    return BuildResponse({}, 200)


def play(request, game_id):
    if request.method != "POST":
        return JsonResponse({"error": "Unsupported method %s" % request.method})

    return BuildResponse({}, 200)
