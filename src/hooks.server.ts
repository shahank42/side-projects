// src/hooks.server.ts
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      /**
       * Note: You have to add the `path` variable to the
       * set and remove method due to sveltekit's cookie API
       * requiring this to be set, setting the path to `/`
       * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
       */
      set: (key, value, options) => {
        event.cookies.set(key, value, { ...options, path: '/' })
      },
      remove: (key, options) => {
        event.cookies.delete(key, { ...options, path: '/' })
      },
    },
  })

  /**
   * We do not call `getUser()` here,
   * since we're validating the JWT.
   */
//   event.locals.getSession = async () => {
//     const {
//       data: { session },
//     } = await event.locals.supabase.auth.getSession()

//     if (!session) return null

//     /* Ensures the session is valid. See README Security section for details. */
//     try {
//       jwt.verify(session.access_token, JWT_SECRET, (err) => { 
//         if (err) throw new Error()
//       })
//     } catch (err) {
//       return null
//     }
    
//     return session
//   }

//   return resolve(event, {
//     filterSerializedResponseHeaders(name) {
//       return name === 'content-range'
//     },
//   })
// }

  /**
   * Unlike `supabase.auth.getSession`, which is unsafe on the server because it
   * doesn't validate the JWT, this function validates the JWT by first calling
   * `getUser` and aborts early if the JWT signature is invalid.
   */
  event.locals.safeGetSession = async () => {
    const {
      data: { user },
      error,
    } = await event.locals.supabase.auth.getUser()
    if (error) {
      return { session: null, user: null }
    }

    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return { session, user }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}