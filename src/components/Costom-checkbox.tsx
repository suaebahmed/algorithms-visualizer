import { forwardRef } from "react";

export type ButtonProps = {
  label?: React.ReactNode;
  checked?: boolean;
} & Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type">;

export const CostomCheckBox = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, checked, ...props }: ButtonProps, ref): JSX.Element => {
    return (
      <div className="m-1">
        <button
          ref={ref}
          className={checked ? activeClass : inactiveClass}
          {...props}
        >
          {label}
        </button>
      </div>
    );
  }
);

const inactiveClass =
  "inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium leading-5 text-slate-500 shadow-sm duration-150 ease-in-out hover:border-slate-300";
const activeClass =
  "inline-flex items-center justify-center rounded-full border border-transparent bg-indigo-500 px-3 py-1 text-sm font-medium leading-5 text-white shadow-sm duration-150 ease-in-out";
