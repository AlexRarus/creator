from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsPagePermission(BasePermission):
    # список страниц может получить только автор или админ
    def has_permission(self, request, view):
        username = request.parser_context.get('kwargs').get('author_username')
        return (request.user.is_authenticated
                and (username == 'my'
                     or request.user.username == username
                     or request.user.is_admin
                     or request.user.is_moderator)
                )

    def has_object_permission(self, request, view, obj):
        return request.user == obj.author


class IsAuthorPermission(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS or request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        print("request.method", request.method)
        if request.method == "DELETE":
            return request.user.is_staff or request.user == obj.author
        return request.method in SAFE_METHODS or request.user.is_authenticated
