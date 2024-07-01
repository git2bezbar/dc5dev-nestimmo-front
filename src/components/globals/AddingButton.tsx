import { ComponentPropsWithRef, forwardRef } from "react";
import { Button, ButtonProps } from "../ui/button";

interface AddingButtonProps extends ComponentPropsWithRef<"button"> {}


const AddingButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: AddingButtonProps, ref) => {
    const { children } = props;
    
    return (
      <Button
        {...props}
        ref={ref}
        variant="ghost"
        className="border-dashed border-2 flex items-center gap-3 w-full h-full"
      >
        <b>+</b>
        { children }
      </Button>
    );
  }
)

AddingButton.displayName = "AddingButton";

export default AddingButton;
