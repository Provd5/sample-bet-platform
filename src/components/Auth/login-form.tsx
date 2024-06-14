"use client";

import type { FC } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";

import ROUTES from "~/constants/routes";
import { createSession } from "~/lib/auth/session";
import { errorHandler } from "~/lib/error-handler";
import { auth } from "~/lib/firebase";
import { loginSchema, type loginSchemaType } from "~/lib/validatorSchemas/auth";

import { ButtonLoadingSpinner } from "../Loaders/button-loading-spinner";
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
import { useToast } from "../ui/use-toast";

const formFields = [
  {
    name: "email",
    type: "email",
    label: "Adres e-mail",
    placeholder: "Wpisz adres e-mail",
    autoComplete: "email",
  },
  {
    name: "password",
    type: "password",
    label: "Hasło",
    placeholder: "Podaj hasło",
    autoComplete: "current-password",
  },
];

export const LoginForm: FC = ({}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { formState } = form;

  function onSubmit(values: loginSchemaType) {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        await createSession(userCredential.user.uid).then(() =>
          router.replace(ROUTES.games),
        );
      })
      .catch((error: unknown) => {
        toast({
          title: "Coś poszło nie tak! 😥",
          description: errorHandler(error),
          variant: "destructive",
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formFields.map((formField) => (
          <FormField
            key={`LoginForm-${formField.name}`}
            control={form.control}
            name={formField.name as "email" | "password"}
            render={({ field }) => (
              <FormItem key={formField.label}>
                <FormLabel>{formField.label}</FormLabel>
                <FormControl>
                  <Input
                    autoComplete={formField.autoComplete}
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
        <Button type="submit">
          Zaloguj
          {formState.isSubmitting && <ButtonLoadingSpinner />}
        </Button>
      </form>
    </Form>
  );
};
