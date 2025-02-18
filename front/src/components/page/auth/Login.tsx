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
  const navegacion = useNavigate();

  const onSubmit: SubmitHandler<LoginUsuario> = async (data: LoginUsuario) => {
    const bool = await loguear(data);
    if (bool) navegacion("/turnos");
  };

  return (
    <div className="w-full h-svh px-2 lg:p-0 lg:grid lg:grid-cols-2 ">
      <div className="w-full flex items-center justify-center py-12 col-span-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto grid w-[350px] gap-6"
        >
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl">
              Buenvenidos a <span className="italic font-semibold">Depi</span>
              <span className="text-yellow-500 tracking-wide font-semibold" >Joint</span>
            </h1>
            <p className="text-balance text-muted-foreground">
              Iniciar sesión en su cuenta
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-start">
                Email
              </Label>
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
            <Button
              type="submit"
              className="w-full bg-[#5b917a] font-semibold tracking-widest "
            >
              Confirmar
            </Button>
          </div>
        </form>
      </div>
      <div className="relative hidden bg-muted lg:block col-span-1">
        <img
          src="data:image/png;base64,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"
          alt="Image"
          className="absolute inset-0 h-full w-full object-fill dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
