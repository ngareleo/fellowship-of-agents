import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

export type SignInFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SignInFormError = {
  email?: string;
  password?: string;
  general?: string;
};

export type SignInFormProps = {
  /** Called when the user submits valid credentials. */
  onSubmit?: (values: SignInFormValues) => void;
  /** Called when the user clicks "Forgot password?". */
  onForgotPassword?: () => void;
  /** Called when the user clicks the Google social button. */
  onGoogleSignIn?: () => void;
  /** Called when the user clicks the Facebook social button. */
  onFacebookSignIn?: () => void;
  /** Validation errors to display. */
  errors?: SignInFormError;
  /** When true the submit button shows a loading state. */
  loading?: boolean;
};

/**
 * Sign-in form with email, password (show/hide toggle), remember me checkbox,
 * forgot password link, and social sign-in buttons.
 */
export function SignInForm({
  onSubmit,
  onForgotPassword,
  onGoogleSignIn,
  onFacebookSignIn,
  errors,
  loading = false,
}: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password, rememberMe });
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      height: 53,
      "& fieldset": {
        borderColor: (t: import("@mui/material/styles").Theme) =>
          t.palette.custom.divider,
        borderWidth: 2,
      },
      "&:hover fieldset": {
        borderColor: (t: import("@mui/material/styles").Theme) =>
          t.palette.custom.cardImagePlaceholder,
      },
      "&.Mui-focused fieldset": {
        borderColor: (t: import("@mui/material/styles").Theme) =>
          t.palette.primary.main,
      },
    },
    "& input": {
      fontSize: 14,
      color: (t: import("@mui/material/styles").Theme) =>
        t.palette.text.primary,
    },
    "& input::placeholder": {
      color: (t: import("@mui/material/styles").Theme) =>
        t.palette.custom.cardImagePlaceholder,
    },
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        {/* General error */}
        {errors?.general && (
          <Typography
            sx={{
              fontSize: 14,
              color: (t) => t.palette.custom.errorText,
              bgcolor: (t) => t.palette.custom.errorBg,
              border: (t) => `1px solid ${t.palette.custom.errorBorder}`,
              borderRadius: "8px",
              px: 2,
              py: 1.5,
            }}
          >
            {errors.general}
          </Typography>
        )}

        {/* Email field */}
        <Box>
          <Typography
            component="label"
            htmlFor="signin-email"
            sx={{
              display: "block",
              fontSize: 14,
              fontWeight: 500,
              color: (t) => t.palette.custom.labelText,
              mb: 0.75,
            }}
          >
            Email Address
          </Typography>
          <TextField
            id="signin-email"
            type="email"
            placeholder="Enter your email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors?.email)}
            helperText={errors?.email}
            inputProps={{ "aria-label": "Email Address" }}
            sx={fieldSx}
          />
        </Box>

        {/* Password field */}
        <Box>
          <Typography
            component="label"
            htmlFor="signin-password"
            sx={{
              display: "block",
              fontSize: 14,
              fontWeight: 500,
              color: (t) => t.palette.custom.labelText,
              mb: 0.75,
            }}
          >
            Password
          </Typography>
          <TextField
            id="signin-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(errors?.password)}
            helperText={errors?.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    size="small"
                    sx={{ color: (t) => t.palette.custom.cardImagePlaceholder }}
                  >
                    {showPassword ? (
                      <VisibilityOffIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <VisibilityIcon sx={{ fontSize: 20 }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={fieldSx}
          />
        </Box>

        {/* Remember me + Forgot password */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                size="small"
                sx={{
                  color: (t) => t.palette.custom.checkboxUnchecked,
                  "&.Mui-checked": { color: (t) => t.palette.primary.main },
                  borderRadius: "4px",
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: 14, color: (t) => t.palette.text.secondary }}>
                Remember me
              </Typography>
            }
          />
          <Typography
            component="button"
            type="button"
            onClick={onForgotPassword}
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: (t) => t.palette.primary.main,
              background: "none",
              border: "none",
              cursor: "pointer",
              p: 0,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Forgot password?
          </Typography>
        </Box>

        {/* Submit button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            bgcolor: (t) => t.palette.primary.main,
            color: (t) => t.palette.primary.contrastText,
            fontWeight: 600,
            fontSize: 14,
            borderRadius: "8px",
            height: 49,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": { bgcolor: (t) => t.palette.primary.dark, boxShadow: "none" },
            "&:disabled": { bgcolor: (t) => t.palette.custom.primaryDisabled },
          }}
        >
          {loading ? "Signing in…" : "Sign In"}
        </Button>

        {/* Divider */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ flex: 1, height: 1, bgcolor: (t) => t.palette.custom.divider }} />
          <Typography sx={{ fontSize: 13, color: (t) => t.palette.text.secondary, whiteSpace: "nowrap" }}>
            or continue with
          </Typography>
          <Box sx={{ flex: 1, height: 1, bgcolor: (t) => t.palette.custom.divider }} />
        </Box>

        {/* Social buttons */}
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            fullWidth
            onClick={onGoogleSignIn}
            startIcon={
              <Typography component="span" sx={{ fontSize: 16, lineHeight: 1 }}>
                G
              </Typography>
            }
            sx={{
              height: 49,
              borderColor: (t) => t.palette.custom.divider,
              borderWidth: 2,
              borderRadius: "8px",
              color: (t) => t.palette.custom.labelText,
              fontWeight: 500,
              fontSize: 14,
              textTransform: "none",
              "&:hover": {
                borderColor: (t) => t.palette.custom.cardImagePlaceholder,
                bgcolor: (t) => t.palette.background.default,
                borderWidth: 2,
              },
            }}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={onFacebookSignIn}
            startIcon={
              <Typography component="span" sx={{ fontSize: 16, lineHeight: 1 }}>
                f
              </Typography>
            }
            sx={{
              height: 49,
              borderColor: (t) => t.palette.custom.divider,
              borderWidth: 2,
              borderRadius: "8px",
              color: (t) => t.palette.custom.labelText,
              fontWeight: 500,
              fontSize: 14,
              textTransform: "none",
              "&:hover": {
                borderColor: (t) => t.palette.custom.cardImagePlaceholder,
                bgcolor: (t) => t.palette.background.default,
                borderWidth: 2,
              },
            }}
          >
            Facebook
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
