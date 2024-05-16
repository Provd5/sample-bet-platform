"use client";

import type { FC } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { LoaderCircle } from "lucide-react";

import { ERROR_ENUM } from "~/types/errors";

import ROUTES from "~/constants/routes";
import { createSession } from "~/lib/auth/session";
import { errorHandler } from "~/lib/error-handler";
import { auth, db } from "~/lib/firebase";
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
import { useToast } from "../ui/use-toast";

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
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeat_password: "",
    },
  });

  const { formState } = form;

  function onSubmit(values: registerSchemaType) {
    if (values.password !== values.repeat_password) {
      form.setError("repeat_password", {
        message: "Podane hasła nie pasują do siebie",
      });
      return;
    }

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        const usersRef = doc(db, "users", userCredential.user.uid);
        await setDoc(usersRef, {
          username: values.username,
          isActive: false,
        }),
          await createSession(userCredential.user.uid);
      })
      .then(() => router.replace(ROUTES.authCallback))
      .catch((error: unknown) => {
        toast({
          title: ERROR_ENUM.SOMETHING_WENT_WRONG,
          description: errorHandler(error),
          variant: "destructive",
        });
      })
      .catch((error: unknown) => {
        toast({
          title: ERROR_ENUM.SOMETHING_WENT_WRONG,
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
        <Button type="submit">
          Stwórz konto
          {formState.isSubmitting && (
            <LoaderCircle className="ml-1 animate-spin size-4" />
          )}
        </Button>
      </form>
    </Form>
  );
};
