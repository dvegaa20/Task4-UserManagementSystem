import React from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { ReusableFormProps } from "@/types/index";
import SubmitButton from "../SubmitButton";

export const ReusableForm = <T extends ZodType<any>>({
  schema,
  defaultValues,
  fields,
  title,
  buttonText,
  onSubmit,
  isLoading,
}: ReusableFormProps<T>) => {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <div className="flex flex-col mt-12 w-[400px] max-md:w-full max-md:mt-10">
      <div className="flex flex-col w-full rounded-lg shadow-[0px_3px_24px_rgba(26,26,26,0.1)] p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col w-full">
              <h1 className="text-xl font-semibold leading-snug text-zinc-900">
                {title}
              </h1>

              <div className="flex flex-col mt-6 w-full">
                {fields.map(({ name, label, placeholder, type = "text" }) => (
                  <FormField
                    key={String(name)}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem className="py-4">
                        <FormLabel className="text-zinc-800">{label}</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white text-zinc-900"
                            placeholder={placeholder}
                            type={type}
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <SubmitButton
              buttonText={buttonText}
              isLoading={isLoading}
              className="px-6 py-2.5 mt-8 w-full text-base font-bold tracking-wide leading-none text-center text-white bg-dark-200 hover:bg-white hover:text-dark-200 border border-dark-200 rounded-md max-md:px-5"
            />
          </form>
        </Form>
      </div>
    </div>
  );
};
