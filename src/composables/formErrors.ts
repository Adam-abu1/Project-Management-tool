import type { AuthError } from '@supabase/supabase-js';
import type { LoginForm } from '@/types/AuthForm';

type FormError<Type> = {
  [Property in keyof Type]: string[]
}

export const useFormErrors = () => {
  const serverError = ref('');
  const realtimeError = ref<FormError<LoginForm>>();

  const handleServerError = (error: AuthError) => {
    serverError.value = error.message === "Invalid login credentials" ? "Incorrect email or password" : error.message;
  }

  const handleLoginForm = async (formData: LoginForm) => {
    realtimeError.value = {
      email: [],
      password: []
    }

    const { validateEmail, validatePassword } = await import('@/utils/formValidations');

    const emailErrors = validateEmail(formData.email);
    if (emailErrors.length > 0) {
      realtimeError.value.email = emailErrors;
    }

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      realtimeError.value.password = passwordErrors;
    }

  }
  return {
    serverError,
    handleServerError,
    realtimeError,
    handleLoginForm
  }
}
