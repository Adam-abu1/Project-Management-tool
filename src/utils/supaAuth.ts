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

    // await authStore.setAuth(data.session);
    return true;
  }
}

export const login = async (formData: LoginForm) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

    console.log(error);
    return { error };
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    return;
  }

  return true;
}
