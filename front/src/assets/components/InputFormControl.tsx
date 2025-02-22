
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError, UseFormRegister, Controller } from "react-hook-form";

interface InputFormControlProps {
  label: string;
  type: string;
  estilo?:string;
  register: UseFormRegister<any>;
  name: string;
  required?: boolean;
  validation?: (value: string) => boolean | string;
  error?: FieldError;
}

const InputFormControl: React.FC<InputFormControlProps> = ({
  label,
  type,
  register,
  name,
  estilo,
  required = false,
  validation,
  error,
}) => {
  return (
    <div className={`${estilo} my-2`}>
      <Label>
        {label}
        <Input
          type={type}
          {...register(name, {
            required: required ? "Dato Requerido" : false,
            validate: validation,
          })}
        />
        {error && (
          <p role="alert" className="text-xs text-red-500">
            {error.message}
          </p>
        )}
      </Label>
    </div>
  );
};

export default InputFormControl;