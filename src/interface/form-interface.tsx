export interface FormValues {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
}
export interface ErrorFormValues {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices?: string;
  diameter?: string;
  spiciness_scale?: string;
  slices_of_bread?: string;
}

export interface Data {
  response: {
    data: {
      [key: string]: string | undefined;
      name?: string;
      preparation_time?: string;
      type?: string;
      no_of_slices?: string;
      diameter?: string;
      spiciness_scale?: string;
      slices_of_bread?: string;
    };
  };
}
