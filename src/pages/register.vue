<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';

const formData = ref({
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const router = useRouter();
const signup = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
  });

  if (error) {
    console.log(error);
    return;
  }

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.value.username,
      full_name: formData.value.firstName.concat(' ' + formData.value.lastName)
    });

    if (error) {
      console.log('profile error', error);
    }
    router.push('/');
  }
}
</script>

<template>
  <div
    class="mx-auto w-full flex justify-center items-center p-10 text-center -mt-10 min-h-[90vh] h-full"
  >
    <Card class="max-w-sm w-full mx-auto h-full">
      <CardHeader>
        <CardTitle class="text-2xl"> Register </CardTitle>
        <CardDescription> Create a new account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button variant="outline" class="w-full"> Register with Google </Button>
          <Separator label="Or" />
        </div>
        <form class="grid gap-4" @submit.prevent="signup">
          <div class="grid gap-2">
            <Label id="username" class="text-left">Username</Label>
            <Input id="username" type="text" placeholder="johndoe19" v-model="formData.username" required />
          </div>
          <div class="flex flex-col sm:flex-row justify-between gap-4">
            <div class="grid gap-2">
              <Label id="first_name" class="text-left">First Name</Label>
              <Input id="first_name" type="text" placeholder="John" required v-model="formData.firstName" />
            </div>
            <div class="grid gap-2">
              <Label id="last_name" class="text-left">Last Name</Label>
              <Input id="last_name" type="text" placeholder="Doe" required v-model="formData.lastName" />
            </div>
          </div>
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input id="email" type="email" placeholder="johndoe19@example.com" required v-model="formData.email" />
          </div>

          <div class="grid gap-2">
            <Label id="password" class="text-left">Password</Label>
            <Input id="password" type="password" placeholder="*****" autocomplete required v-model="formData.password" />
          </div>

          <div class="grid gap-2">
            <Label id="confirm_password" class="text-left">Confirm Password</Label>
            <Input
              id="confirm_password"
              type="password"
              placeholder="*****"
              autocomplete
              required
              v-model="formData.confirmPassword"
            />
          </div>
          <Button type="submit" class="w-full"> Register </Button>
          <!-- <Button variant="outline" class="w-full"> Login with Google </Button> -->
        </form>
        <div class="mt-4 text-sm text-center">
          Already have an account?
          <RouterLink to="/login" class="underline"> Login </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
