import LoginForm from '../Login/LoginForm';

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-700 via-cyan-700 to-blue-800">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-teal-100">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;