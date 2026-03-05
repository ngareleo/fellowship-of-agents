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
      "& fieldset": { borderColor: "#e2e8f0", borderWidth: 2 },
      "&:hover fieldset": { borderColor: "#94a3b8" },
      "&.Mui-focused fieldset": { borderColor: "#2563eb" },
    },
    "& input": { fontSize: 14, color: "#0f172a" },
    "& input::placeholder": { color: "#94a3b8" },
  };

  const labelSx = {
    display: "block",
    fontSize: 14,
    fontWeight: 500,
    color: "#334155",
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
              color: "#ef4444",
              bgcolor: "#fef2f2",
              border: "1px solid #fecaca",
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
                    sx={{ color: "#94a3b8" }}
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
                    sx={{ color: "#94a3b8" }}
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
            bgcolor: "#2563eb",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: 14,
            borderRadius: "8px",
            height: 49,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": { bgcolor: "#1d4ed8", boxShadow: "none" },
            "&:disabled": { bgcolor: "#93c5fd" },
          }}
        >
          {loading ? "Creating account…" : "Create Account"}
        </Button>

        {/* Divider */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ flex: 1, height: 1, bgcolor: "#e2e8f0" }} />
          <Typography sx={{ fontSize: 13, color: "#64748b", whiteSpace: "nowrap" }}>
            or continue with
          </Typography>
          <Box sx={{ flex: 1, height: 1, bgcolor: "#e2e8f0" }} />
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
              borderColor: "#e2e8f0",
              borderWidth: 2,
              borderRadius: "8px",
              color: "#334155",
              fontWeight: 500,
              fontSize: 14,
              textTransform: "none",
              "&:hover": { borderColor: "#94a3b8", bgcolor: "#f8fafc", borderWidth: 2 },
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
              borderColor: "#e2e8f0",
              borderWidth: 2,
              borderRadius: "8px",
              color: "#334155",
              fontWeight: 500,
              fontSize: 14,
              textTransform: "none",
              "&:hover": { borderColor: "#94a3b8", bgcolor: "#f8fafc", borderWidth: 2 },
            }}
          >
            Facebook
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
