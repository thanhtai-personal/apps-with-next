import {
  Button,
  IconEye,
  IconEyeOff,
  TextInput,
  TextInputProps,
  useDisclosure,
} from "@core-ui/react-mantine-core";
import { IStringSchemaProperty } from "@core/json-schema";
import { ControlProps, useFormError } from "@core-ui/react-hooks-form";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { getControlProps } from "../getControlProps";

export interface PasswordControlProps
  extends ControlProps<IStringSchemaProperty, TextInputProps> {
  schema: IStringSchemaProperty & {
    useAutoGenerate?: boolean;
  };
}

export const PasswordControl = (props: PasswordControlProps): ReactNode => {
  const [isShowing, { toggle }] = useDisclosure(false);
  const { register, formState, setValue } = useFormContext();
  const getError = useFormError(formState);

  const handleGeneratePassword = () => {
    const generateRandomPassword = (length: number) => {
      const lowercaseCharset = "abcdefghijklmnopqrstuvwxyz";
      const uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numberCharset = "0123456789";
      const specialCharset = "!@#$%^&*()_+{}[]<>?:;|";

      const allCharset =
        lowercaseCharset + uppercaseCharset + numberCharset + specialCharset;

      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharset.length);
        password += allCharset[randomIndex];
      }
      return password;
    };

    props.name && setValue(props.name, generateRandomPassword(12));
  };

  const usingProps = {
    ...getControlProps(props, true),
    ...register(props.name!),
  };

  return (
    <div className="flex flex-row flex-nowrap justify-between items-end">
      <TextInput
        {...usingProps}
        type={isShowing ? "text" : "password"}
        className={`${"w-full"}`}
        rightSection={
          <div onClick={() => toggle()} className="cursor-pointer">
            {isShowing ? <IconEyeOff width={32} /> : <IconEye width={32} />}
          </div>
        }
        error={props.name && getError(props.name)}
      />
      {props.schema?.useAutoGenerate && (
        <Button
          variant="fill"
          className="ml-2 w-36"
          onClick={handleGeneratePassword}
        >
          Generate
        </Button>
      )}
    </div>
  );
};
