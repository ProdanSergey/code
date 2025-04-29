import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import './App.css'
import * as yup from "yup"

const signUpSchema = yup.object({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(9).required(),
  repeatPassword: yup.string().test("password", "Must match with password", (value, { parent }) => {
    return value === parent['password'];
  }).required(),
  consent: yup.bool().required(),
}).required()

type SignUpState = {
  fullName: string
  email: string
  password: string
  repeatPassword: string
  consent: boolean;
}

type SignUpBody = {
  fullName: string
  email: string
  password: string
}

function App() {
  const defaultValues: SignUpState = {
    fullName: '',
    email: '',
    password: '',
    repeatPassword: '',
    consent: false
  }

  const { handleSubmit, control, formState } = useForm<SignUpState>({defaultValues, resolver: yupResolver(signUpSchema)})

  const onSubmit = async (data: SignUpState) => {
    try {
      await fakeFetch(data)
      console.log("Submission Succeded", data)
    } catch (error) {
      console.log("Submission Failed")
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col'>
        <Controller name='fullName' control={control} render={({ field }) => (
          <>
          <label>FullName</label>
          <input {...field} />
          </>
        )}/>
        <Controller name='email' control={control} render={({ field }) => (
          <>
          <label>Email</label>
          <input type='email' {...field} />
          </>
        )}/>
        <Controller name='password' control={control} render={({ field }) => (
          <>
          <label>Password</label>
          <input type='password' {...field} />
          </>
        )}/>
        <Controller name='repeatPassword' control={control} render={({ field }) => (
          <>
          <label>Repeat Password</label>
          <input type='password' {...field} />
          </>
        )}/>
      </div>
      <button type='submit'>Submit</button>
    </form>
    
    {formState.isSubmitted && !formState.isValid && (
      <ul>
        {
          Object.entries(formState.errors).map(([key, err]) => {
            if (err) {
              return <li key={key}>{err.message}</li>
            }
            return null
          })
        }
      </ul>
    )}
    </div>
  )
}

const fakeFetch = async (data: Record<PropertyKey, any>) => {
  const chance = Math.ceil(Math.random() * 10)

  if (chance >= 5) {
    throw new Error("Fetch has failed");
  }
  
  return { status: 200, data }
};


export default App
