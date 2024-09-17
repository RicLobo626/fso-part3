import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export const Button = ({ text, ...props }: Props) => {
  return <button {...props}>{text}</button>;
};
