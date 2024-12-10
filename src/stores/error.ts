import type { CustomError } from '@/types/Error';
import type { ExtendedPostgresError } from '@/types/Error';

export const useErrorStore = defineStore( 'error-store', () => {
  const activeError = ref<null | CustomError | ExtendedPostgresError >( null );

  const setError = ( { error, customCode }: { error: string | ExtendedPostgresError, customCode: number } ) => {

    if ( typeof error === 'string' ) {
      activeError.value = new Error( error );
      activeError.value.customCode = customCode;
      return
    }

    activeError.value = error;
    activeError.value.statusCode = customCode;
  }
  return {
    activeError,
    setError
  }
} );
