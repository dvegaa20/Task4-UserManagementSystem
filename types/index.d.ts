import { Path } from "react-hook-form";
import { z, ZodType } from "zod";

declare type Status = "active" | "blocked";

export interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  showIcon?: boolean;
  iconSrc?: string;
}

export interface SubmitButtonProps {
  buttonText: string;
  isLoading: boolean;
  onClick?: () => void;
  className: string;
  disabled?: boolean;
  toastProps?: {
    title: string;
    description: string;
    action?: React.ReactElement;
  };
  isBlocked?: boolean;
}

export interface SocialButtonProps {
  icon: string;
  text: string;
  onClick?: () => void;
}

export interface ToggleButtonProps {
  text: string;
  isActive: boolean;
  onClick?: () => void;
}

export interface ReusableFormProps<T extends ZodType<any>> {
  schema: T;
  defaultValues: z.infer<T>;
  fields: {
    name: Path<z.infer<T>>;
    label: string;
    placeholder?: string;
    type?: string;
  }[];
  title: string;
  buttonText: string;
  switchText?: string;
  onSwitch?: () => void;
  onSubmit: (values: z.infer<T>) => void;
  isLoading: boolean;
}

declare interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

interface TableState {
  rowSelection: Record<string, boolean>;
}

interface DataTableProps<TData extends { email: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

declare interface User {
  id: string;
  name: string;
  email: string;
  status: boolean;
  last_login_time: string;
}

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}
