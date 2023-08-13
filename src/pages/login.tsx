export function Login() {
  const handleLogin = () => {
    console.log("Logged in");
  };

  return (
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="bg-bgGray w-96 h-96 flex flex-col justify-center items-center gap-2">
          <h1>Seja Bem Vindo!</h1>
          <input type="text" placeholder="login" />
          <input type="password" placeholder="senha" />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
  );
}
