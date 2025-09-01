export type Color = "red" | "yellow" | "blue" | "green" | "orange" | "gray" | "purple" | "pink";

export type AddEvent = {
  name: string | null;
  color: Color | null;
  budget: number | null;
};