import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "./ui/field"
import { Input } from "./ui/input"

interface LoginFormProps extends React.ComponentProps<"div"> {
  onLogin?: () => void;
  googleLogin?: () => void;
}

export function LoginForm({
  className,
  onLogin,
  googleLogin,
  ...props
}: LoginFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="dark:text-white">Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin?.();
            }}
          >
            <FieldGroup>
          
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={googleLogin}
                >
                  Login with Google
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
