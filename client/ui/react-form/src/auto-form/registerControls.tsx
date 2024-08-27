import { ISchemaProperty } from "@core/json-schema";
import { ControlProps, ControlsMapper } from "./types";
import { ReactNode } from "react";

export interface IFormConfig { }

export class ReactFormManager {
  private static instance: ReactFormManager | null = null;
  private controlMap: ControlsMapper[] = [];

  private constructor(_?: IFormConfig) { }

  public static getInstance(props?: IFormConfig) {
    if (!this.instance) {
      this.instance = new ReactFormManager(props);
    }
    return this.instance;
  }

  controlRenderer<SchemaType extends ISchemaProperty, Props>(
    props: ControlProps<SchemaType, Props>,
  ): ReactNode {
    const found = this.controlMap.find((control) => control.match(props.schema));
    if (!found) {
      return null;
    }
    return <found.component {...props} />;
  }

  registerControls = (controls: ControlsMapper[]) => {
    this.controlMap.push(...controls);
  };
}