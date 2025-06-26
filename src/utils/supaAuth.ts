import { supabase } from '@/lib/supabaseClient';
import type { RegisterForm, LoginForm } from '@/types/AuthForm';

export const register = async (formData: RegisterForm) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    console.log(error);
    return;
  }

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      full_name: formData.firstName.concat(' ' + formData.lastName)
    });

    if (error) {
      console.log('profile error', error);
    }

    return true;
  }
}

export const login = async (formData: LoginForm) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    console.log(error);
    return;
  }

  return true
}
