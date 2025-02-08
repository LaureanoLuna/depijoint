import useLoginAccion from "@/assets/hooks/useLoginAccion";
import { LoginUsuario } from "@/assets/interfaces/usuario";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUsuario>();
  const { loguear } = useLoginAccion();
  const navegacion = useNavigate()

  const onSubmit: SubmitHandler<LoginUsuario> = async (data: LoginUsuario) => {
    const bool = await loguear(data);
    if(bool) navegacion("/")
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto grid w-[350px] gap-6"
        >
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your user below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="usuario"
                type="text"
                placeholder="usuario"
                {...register("usuario", {
                  required: "Dato Requerido",
                  minLength: 4,
                  maxLength: 10,
                  validate: (valor) => {
                    return (
                      new RegExp(/[a-zA-Z]/).test(valor) || "Formato Incorrecto"
                    );
                  },
                })}
              />
              {errors.usuario && (
                <p role="alert" className="text-xs text-red-500">
                  {errors.usuario.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                {...register("clave", {
                  required: "Dato requerido",
                  minLength: 4,
                  maxLength: 6,
                })}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline">
              Sign up
            </a>
          </div>
        </form>
      </div>
      <section id="section-login-img"></section>
    </div>
  );
}
