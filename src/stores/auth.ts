import type { Session, User } from '@supabase/supabase-js';
import type { Tables } from '../../database/types';
import { profileQuery } from '@/utils/supaQueries';
import { usePageStore } from '@/stores/page';
import { supabase } from '@/lib/supabaseClient';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<null | User>(null);
  const profile = ref<null | Tables<'profiles'>>(null);
  const isTrackingAuthChanges = ref(false);

  const setAuth = async (userSession: null | Session ) => {
    if (!userSession) {
      user.value = null;
      profile.value = null;
      return;
    }

    user.value = userSession.user;
    await setProfile();
  };

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null;
      return;
    }

    if (!profile.value || profile.value.id !== user.value?.id) {
      const { data } = await profileQuery(user.value.id);
      profile.value = data || null;
    }
  }

  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      await setAuth(data.session);
    }
  }

  const trackAuthChanges = () => {
    if (isTrackingAuthChanges.value) return

    isTrackingAuthChanges.value = true;
    supabase.auth.onAuthStateChange( ( event, session ) => {
      setTimeout(async () => {
        await setAuth(session)
      }, 0 );
    })
  }

  return {
    user,
    profile,
    setAuth,
    getSession,
    trackAuthChanges
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
