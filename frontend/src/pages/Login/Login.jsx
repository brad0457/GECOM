import LoginForm from '../Login/LoginForm';

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;