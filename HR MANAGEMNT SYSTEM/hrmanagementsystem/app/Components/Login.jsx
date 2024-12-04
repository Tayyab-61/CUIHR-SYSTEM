'use client'

import { useState } from 'react';
import ContactForm from './ContactForm';
import { useRouter } from 'next/navigation'; 


function Login() {
 
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [otp, setotp] = useState(false);
  const router = useRouter();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
        await fetch('/api/sendOtp', { method: 'POST' }); // Send OTP
        setotp(true);
        alert("The OTP code is sent to gmail address")
    } else {
        const { message } = await res.json();
        alert(message);
    }
};
const[verifyotp,setVerifyotp]=useState();
const handleVerifyOtp = async (e) => {
  
  e.preventDefault();
  const res = await fetch('/api/verifyOtp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ verifyotp }),
  });
  const data = await res.json();
 
  if (res.status === 200) {
    // Store the token in localStorage
    localStorage.setItem('token', data.token);
    router.push('/HRportal'); // Redirect to the main page
} else {
    alert(data.message || 'OTP verification failed');
}
  // if (res.ok) {
  //     router.push('/HRportal'); // Redirect to main page
  // } else {
  //     const { message } = await res.json();
  //     alert(message);
  // }
};
  
  return (
    <>



      <div className='LoginPage'>
        <div className='logincontent overflow-auto'>

          <h1 className='text-3xl font-semibold nav1'>HR Portal Introduction</h1>
          <p className='font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Cumque sit, voluptates aut deserunt in, totam accusantium repellat, voluptate inventore quo
            molestias commodi atque aperiam adipisci voluptatibus nesciunt quasi libero nobis?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum saepe sunt, quo
            laborum fugiat quod modi ad reprehenderit p
            erferendis deleniti! Reiciendis nemo quis explicabo vel voluptatibus harum quas, adipisci facere.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque sequi sapiente iusto soluta quas
            nesciunt,
            pariatur officia in iure quos quaerat similique aut harum, ex natus id libero ipsam commodi?</p>
          <br />

          <ContactForm />
        </div>
        <div className=' bg-white rounded-lg p-8'>
          <div className="flex min-h-full flex-col justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">For HR Administrator</a>

              <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              {
                otp ? <div>
                   <div>
                     
                        <label htmlFor="email" className="block text-xl font-medium leading-6 text-gray-900">Enter OTP</label>
                        <div className="mt-2">
                          <input onChange={(e) => setVerifyotp(e.target.value)} id="otp" name="otp" type="text"  required className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <button onClick={ handleVerifyOtp}  className="  flex mt-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                      


                </div> :
                  <div>
                    <form className="space-y-6" action="#" method="POST">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">User Name</label>
                        <div className="mt-2">
                          <input onChange={(e) => setusername(e.target.value)} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                          <div className="text-sm">

                          </div>
                        </div>
                        <div className="mt-2">
                          <input onChange={(e) => setpassword(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div>
                        <button type="submit" onClick={handleLogin} className="  flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                      </div>


                    </form>
                  </div>
              }




            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Login