from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsAuthorPermission(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS or request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        print("request.method", request.method)
        if request.method == "DELETE":
            return request.user.is_staff or request.user == obj.author
        return request.method in SAFE_METHODS or request.user.is_authenticated
