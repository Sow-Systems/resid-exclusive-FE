import password from "@/assets/icons/passwordLogin.svg";
import user from "@/assets/icons/userLogin.svg";
import logoLogin from "@/assets/images/logoLogin.svg";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import * as yup from "yup";

export type UserForm = {
  email: string;
  password: string;
};

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log("Logged in");
  };

  const schema = yup.object().shape({
    email: yup.string().required("O e-mail é obrigatório"),
    password: yup.string().required("A senha é obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: UserForm) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="bg-bgGray w-[460px] flex flex-col justify-center items-center rounded-3xl text-colorTextWelcomeBlue">
        <img src={logoLogin} className="ml-5 mr-5" alt="" />
        <p className="text-4xl ">Seja Bem Vindo!</p>
        <p className="mt-1 mb-12 ">Faça seu login</p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-4/5">
          <div className="bg-white flex flex-row p-1 rounded-xl mb-3">
            <img
              src={user}
              className="border-white border"
              height={30}
              width={30}
              alt="userIcon"
            />
            <Input
              type="text"
              placeholder="login"
              register={register("email")}
              className="w-80 ml-1"
            />
          </div>
          {errors.email && (
            <div className="text-red-500 text-sm m-2">
              {errors.email.message}
            </div>
          )}
          <div className="bg-white flex flex-row p-1 rounded-xl mb-2">
            <img src={password} alt="passwordIcon" height={30} width={30} />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="senha"
              register={register("password")}
              className="w-72 ml-1"
            />
            <div
              className="flex justify-center align-middle items-center ml-2"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <IoMdEye size={25} style={{ color: "#1B365D" }} />
                ) : (
                <IoMdEyeOff size={25} style={{ color: "#1B365D" }} />
              )}
            </div>
          </div>
          {errors.password && (
            <div className="text-red-500 text-sm m-2">
              {errors.password.message}
            </div>
          )}
          <div className="flex flex-row justify-between text-sm">
            <div className="flex flex-row gap-2">
            <input type="checkbox" />
            <p>Lembrar Acesso</p>
            </div>
            <p> Esqueci a minha senha</p>
          </div>
          <Button
            onClick={handleLogin}
            className="bg-bgButtonBlue mb-16 mt-10 w-full rounded-xl text-colorTextButtonBlue text-xl font-normal hover:opacity-80"
          >
            Login
          </Button>
        </form>
        <p className="mb-1 text-sm">By Sow Systems</p>
      </div>
    </div>
  );
}
