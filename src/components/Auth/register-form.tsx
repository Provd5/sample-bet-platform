"use client";

import type { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type registerSchemaType,
} from "~/lib/validatorSchemas/auth";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const formFields = [
  {
    name: "username",
    type: "text",
    label: "Nazwa",
    placeholder: "Wpisz swoją nazwę",
    description: "Twoja nazwa widoczna dla innych użytkowników.",
  },
  {
    name: "email",
    type: "email",
    label: "Adres e-mail",
    placeholder: "Wpisz adres e-mail",
    description: "Będziesz go potrzebował do zalogowania się.",
  },
  {
    name: "password",
    type: "password",
    label: "Hasło",
    placeholder: "Podaj hasło",
    description: "Minimum 6 znaków.",
  },
  {
    name: "repeat_password",
    type: "password",
    label: "Powtórz hasło",
    placeholder: "Powtórz hasło",
    description: null,
  },
];

export const RegisterForm: FC = ({}) => {
  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeat_password: "",
    },
  });

  function onSubmit(values: registerSchemaType) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formFields.map((formField) => (
          <FormField
            key={formField.name}
            control={form.control}
            name={
              formField.name as
                | "username"
                | "email"
                | "password"
                | "repeat_password"
            }
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
                {formField.description && (
                  <FormDescription>{formField.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Stwórz konto</Button>
      </form>
    </Form>
  );
};
