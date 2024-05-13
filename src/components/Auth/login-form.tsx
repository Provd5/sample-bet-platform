"use client";

import type { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type loginSchemaType } from "~/lib/validatorSchemas/auth";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const formFields = [
  {
    name: "email",
    type: "email",
    label: "Adres e-mail",
    placeholder: "Wpisz adres e-mail",
  },
  {
    name: "password",
    type: "password",
    label: "Hasło",
    placeholder: "Podaj hasło",
  },
];

export const LoginForm: FC = ({}) => {
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: loginSchemaType) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formFields.map((formField) => (
          <FormField
            key={formField.name}
            control={form.control}
            name={formField.name as "email" | "password"}
            render={({ field }) => (
              <FormItem key={formField.label}>
                <FormLabel>{formField.label}</FormLabel>
                <FormControl>
                  <Input
                    type={formField.type}
                    placeholder={formField.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Zaloguj</Button>
      </form>
    </Form>
  );
};
