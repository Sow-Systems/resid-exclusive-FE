import password from "@/assets/icons/passwordLogin.svg";
import user from "@/assets/icons/userLogin.svg";
import logoLogin from "@/assets/images/logoLogin.svg";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/utils/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as yup from "yup";

export type UserForm = {
  username: string;
  password: string;
};

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (formData: UserForm) => {
    console.log(formData);
    try {
      const response = await api.post("login", {
        username: formData.username,
        password: formData.password,
      });
      toast.success("Seja bem-vindo!");
      setToken(response.data.token);
      navigate("/");
      console.log(response);
    } catch (error: any) {
      console.error("Erro no login:", error);
      toast.error(`${error.response.data.message}`);
    }
  };

  const schema = yup.object().shape({
    username: yup.string().required("O e-mail é obrigatório"),
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
    handleLogin(data);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center px-4">
    <div className="bg-bgGray w-full max-w-md h-auto py-10 px-5 text-xs sm:text-sm md:text-base flex flex-col justify-center items-center rounded-3xl text-colorTextWelcomeBlue">
        <img
          src={logoLogin}
          className="ml-5 mr-5 flex w-2/5 2xl:w-3/5"
          alt=""
        />
        <p className="text-2xl 2xl:text-4xl">Seja Bem Vindo!</p>
        <p className="mt-1 mb-5 2xl:mb-12 ">Faça seu login</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
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
              register={register("username")}
              className="w-80 2xl:w-80 ml-1"
            />
          </div>
          {errors.username && (
            <div className="text-red-500 text-sm m-2">
              {errors.username.message}
            </div>
          )}
          <div className="bg-white flex flex-row p-1 rounded-xl mb-2">
            <img src={password} alt="passwordIcon" height={30} width={30} />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="senha"
              register={register("password")}
              className="w-72 2xl:w-72 ml-1"
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
          <div className="flex items-end mt-5">
            <Button
              type="submit"
              className="bg-bgButtonBlue w-full my-2 rounded-xl text-colorTextButtonBlue text-base font-normal hover:opacity-80"
            >
              Login
            </Button>
          </div>
        </form>
        <p className="mb-1 text-sm">By Sow Systems</p>
      </div>
    </div>
  );
}
