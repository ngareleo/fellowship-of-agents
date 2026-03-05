import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import type { Theme } from "@mui/material/styles";

export type SignUpFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpFormError = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
};

export type SignUpFormProps = {
  /** Called when the user submits valid registration data. */
  onSubmit?: (values: SignUpFormValues) => void;
  /** Called when the user clicks the Google social button. */
  onGoogleSignUp?: () => void;
  /** Called when the user clicks the Facebook social button. */
  onFacebookSignUp?: () => void;
  /** Validation errors to display. */
  errors?: SignUpFormError;
  /** When true the submit button shows a loading state. */
  loading?: boolean;
};

/**
 * Sign-up / registration form with full name, email, password, confirm
 * password (both with show/hide toggles), and social sign-up buttons.
 */
export function SignUpForm({
  onSubmit,
  onGoogleSignUp,
  onFacebookSignUp,
  errors,
  loading = false,
}: SignUpFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ fullName, email, password, confirmPassword });
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      height: 53,
      "& fieldset": {
        borderColor: (t: Theme) => t.palette.custom.divider,
        borderWidth: 2,
      },
      "&:hover fieldset": {
        borderColor: (t: Theme) => t.palette.custom.cardImagePlaceholder,
      },
      "&.Mui-focused fieldset": {
        borderColor: (t: Theme) => t.palette.primary.main,
      },
    },
    "& input": {
      fontSize: 14,
      color: (t: Theme) => t.palette.text.primary,
    },
    "& input::placeholder": {
      color: (t: Theme) => t.palette.custom.cardImagePlaceholder,
    },
  };

  const labelSx = {
    display: "block",
    fontSize: 14,
    fontWeight: 500,
    color: (t: Theme) => t.palette.custom.labelText,
    mb: 0.75,
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

        {/* Full name */}
        <Box>
          <Typography component="label" htmlFor="signup-name" sx={labelSx}>
            Full Name
          </Typography>
          <TextField
            id="signup-name"
            type="text"
            placeholder="Enter your full name"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={Boolean(errors?.fullName)}
            helperText={errors?.fullName}
            inputProps={{ "aria-label": "Full Name" }}
            sx={fieldSx}
          />
        </Box>

        {/* Email */}
        <Box>
          <Typography component="label" htmlFor="signup-email" sx={labelSx}>
            Email Address
          </Typography>
          <TextField
            id="signup-email"
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

        {/* Password */}
        <Box>
          <Typography component="label" htmlFor="signup-password" sx={labelSx}>
            Password
          </Typography>
          <TextField
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
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

        {/* Confirm password */}
        <Box>
          <Typography component="label" htmlFor="signup-confirm" sx={labelSx}>
            Confirm Password
          </Typography>
          <TextField
            id="signup-confirm"
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm your password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={Boolean(errors?.confirmPassword)}
            helperText={errors?.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                    onClick={() => setShowConfirm((prev) => !prev)}
                    edge="end"
                    size="small"
                    sx={{ color: (t) => t.palette.custom.cardImagePlaceholder }}
                  >
                    {showConfirm ? (
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

        {/* Submit */}
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
          {loading ? "Creating account…" : "Create Account"}
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
            onClick={onGoogleSignUp}
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
            onClick={onFacebookSignUp}
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
