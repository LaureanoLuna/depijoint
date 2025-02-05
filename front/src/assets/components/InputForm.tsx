
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputFormProps {
  label: string;
  type: string;
  register: UseFormRegister<any>;
  name: string;
  required?: boolean;
  validation?: (value: string) => boolean | string;
  error?: FieldError;
}

const InputForm: React.FC<InputFormProps> = ({
  label,
  type,
  register,
  name,
  required = false,
  validation,
  error,
}) => {
  return (
    <div>
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

export default InputForm;