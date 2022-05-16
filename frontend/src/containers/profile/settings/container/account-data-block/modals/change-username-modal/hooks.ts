import { useEffect } from 'react';
import { IUser } from 'src/dal/auth/interfaces';
import { useValidateUsernameForm } from 'src/api/hooks/validate-forms/auth/useValidateUsernameForm';

export const useValidateUsername = (isDirty: boolean, user: IUser | null, username?: string) => {
  const [
    validateUsername,
    isLoadingValidate,
    dataValidate,
    errorsValidateUsername,
  ] = useValidateUsernameForm<{ username: string }>();

  useEffect(() => {
    if (isDirty && username && username !== user?.username) {
      // валидируем на доступность введенного username
      validateUsername({ username });
    }
  }, [username]);

  return errorsValidateUsername;
};
