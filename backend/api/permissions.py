from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsPagePermission(BasePermission):
    # список страниц может получить только автор или админ
    def has_permission(self, request, view):
        username = request.parser_context.get("kwargs").get("author_username")
        return request.user.is_authenticated and (
            username == "my"
            or request.user.username == username
            or request.user.is_admin
            or request.user.is_moderator
        )

    def has_object_permission(self, request, view, obj):
        return request.user == obj.author


class IsAuthorPermission(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS or request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in [
            "DELETE",
            "PUT",
            "PATCH",
        ]:
            return request.user.is_staff or request.user == obj.author
        return request.method in SAFE_METHODS or request.user.is_authenticated


class IsAvatarPermission(BasePermission):
    def has_permission(self, request, view):
        # Создание
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Удаление / Изменение
        return request.user.is_staff or request.user == obj.user


class IsImagePermission(BasePermission):
    def has_permission(self, request, view):
        # Создание
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Удаление / Изменение
        return request.user.is_staff or request.user == obj.author
