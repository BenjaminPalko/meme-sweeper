from django.urls import path

from . import views

urlpatterns = [
    path("start/", views.start, name="start"),
    path("<int:game_id>/", views.details, name="details"),
    path("<int:game_id>/play/", views.play, name="play"),
]
