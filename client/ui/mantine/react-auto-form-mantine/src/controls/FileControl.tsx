import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  Group,
  Text,
  rem,
  IconPhoto,
  IconUpload,
  IconX,
} from "@core-ui/react-mantine-core";
import { IStringSchemaProperty } from "@core/json-schema";
import { ControlProps } from "@core-ui/react-hooks-form";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { getControlProps } from "../getControlProps";

export type FileControlProps = ControlProps<
  IStringSchemaProperty,
  Omit<DropzoneProps, "onDrop" | "onChange">
> & {
  onChange?: (value?: ArrayBuffer) => void;
};

export const FileControl = forwardRef<HTMLDivElement, FileControlProps>(
  (props: FileControlProps, ref) => {
    const { onChange, description, ...other } = getControlProps(props);
    const { control } = useFormContext();

    const handleDrop = async (files: FileWithPath[]) => {
      if (files.length > 0 && onChange) {
        const content = (await files[0]?.arrayBuffer()) as ArrayBuffer;
        onChange(content);
      }
    };

    return (
      <Controller
        name={props.name!}
        control={control}
        render={() => (
          <Dropzone ref={ref} onDrop={handleDrop} {...other}>
            <Group
              justify="center"
              gap="xl"
              mih={220}
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  {description}
                </Text>
              </div>
            </Group>
          </Dropzone>
        )}
      />
    );
  },
);
