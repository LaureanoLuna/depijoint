import { Checkbox } from "@/components/ui/checkbox";

interface InputCheckBoxProps {
  id: string;
  label: string;
  marcado: boolean;
  onChange: (checked: boolean) => void;
}

export function InputCheckBox({ id, label, onChange, marcado }: InputCheckBoxProps) {
  return (
    <div className="flex items-center space-x-2 justify-end pr-5">
      <Checkbox id={id} checked={!marcado} onCheckedChange={onChange} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}