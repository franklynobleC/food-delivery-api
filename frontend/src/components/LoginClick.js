// import React from 'react'
// import { useState, useEffect } from 'react'
// // import { createClient } from '@supabase/supabase-js'
// import { Auth } from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared'
// // import { createClient } from '@supabase/supabase-js'

// import { useAuthContext } from '../context/auth_context'
// const supabase = createClient(
//   'https://jurdjjlfvoekzffnpbdx.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1cmRqamxmdm9la3pmZm5wYmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0OTcxMzYsImV4cCI6MjAyNTA3MzEzNn0.ajICLrrMh6cabPQKLuRZYR4RmQkXcFAdVggOm_KePZk'
// )
// export const LoginClick = () => {
//   const [session, setSession] = useState(null)

//   const { loginUser, email, password } = useAuthContext()
//   useEffect(() => {
//     // supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session)

//       if (session) {
//         // supabase.auth.getUser().then(({ data: { user } }) => {
//           // console.log(user)

//           // console.log(session.access_token)

//           setSession(session)
//         })
//       }
//     })

//     // const {
//     //   data: { subscription }
//     // } = supabase.auth.onAuthStateChange((_event, session) => {
//       if (_event === 'SIGNED_IN') {
//         setSession(session)

//         try {
//         } catch (error) {
//           console.log(error)
//         }

//         // console.log('SESSION DATA', session.encrypted_password)

//         // supabase.auth.getUser().then(({ data: { user } }) => {
//           loginUser(email, password)
//           console.log('USER DATA Pass', user)

//           localStorage.setItem('Token_Access', session.access_token)
//         })
//       }
//       if (_event === 'SIGNED_OUT') {
//         localStorage.removeItem('Token_Access')
//         setSession(null)
//       }
//     })

//     return () => subscription.unsubscribe()
//   }, [])

//   if (!session) {
//     return (
//       <Auth
//         // supabaseClient={supabase}
//         providers={[]}
//         appearance={{
//           theme: ThemeSupa,

//           style: {
//             button: {
//               background: 'Green',
//               color: 'white',
//               width: '50%',
//               height: 'auto',
//               margin: 'auto',
//               padding: '10px',
//               borderRadius: '5px',
//               paddingBottom: '10px',
//               display: 'flex'
//             },
//             anchor: { color: 'blue' },
//             container: {
//               width: '50%',
//               backgroundColor: 'whitesmoke',
//               // paddingLeft: 'auto',
//               // paddingRight: '20px',
//               padding: '30px',

//               margin: 'auto',
//               marginTop: '50px'

//               // padding: '10px'
//             },
//             label: {
//               color: 'Grey'
//             },
//             message: {
//               color: 'red'
//             },
//             input: {
//               width: '100%',
//               height: 'auto',
//               padding: '10px',
//               borderRadius: '5px',
//               borderColor: 'darkgreen',
//               borderStyle: 'solid',
//               borderWidth: '1px'
//             }

//             //..
//           }
//         }}
//       />
//     )
//   } else {
//     return (
//       <div>
//         Logged in!
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <p>LOGGED IN </p>
//         <div>
//           <button
//             onClick={() => {
//               // supabase.auth.signOut()
//             }}
//           >
//             Sign Out
//           </button>
//         </div>
//       </div>
//     )
//   }
// }
// export default LoginClick
