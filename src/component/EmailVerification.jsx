import { onAuthStateChanged } from 'firebase/auth'
import { auth, database, sendVerificationEmail } from '../Firebase'; 
import React, { useEffect, useState } from 'react'
import { ref, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';


export default function EmailVerification() {
    const navigate = useNavigate();

    const [isEmailVerified,setEmailVerified] = useState(false)

    useEffect(()=>{

        const checkEmailVerification = async()=>{

            onAuthStateChanged(auth,async (user)=>{
                if(user){
                    await user.reload()
                    const emailVerification = user.emailVerified;
                    console.log(emailVerification);
                    if(emailVerification){
                       const userDataRef = ref(database,'users/'+user.uid)
                       update(userDataRef,{status:true})
                       .then(()=>{
                        setEmailVerified(true)
                        navigate('/login')
                       })
                    }else{
                        setEmailVerified(false)
                        setTimeout(checkEmailVerification,3000)
                    }
                }
            })
        }
        checkEmailVerification();
    },[navigate])


  return <div className='w-full h-screen mx-auto my-auto text-black font-semibold text-xl'>{isEmailVerified ? <div>
   Email Verified!
  </div> : <div>
  Please verify your email...
    </div>}</div>;
}
