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

        {/* Email field */}
        <Box>
          <Typography
            component="label"
            htmlFor="signin-email"
            sx={{
              display: "block",
              fontSize: 14,
              fontWeight: 500,
              color: "#334155",
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: 53,
                "& fieldset": { borderColor: "#e2e8f0", borderWidth: 2 },
                "&:hover fieldset": { borderColor: "#94a3b8" },
                "&.Mui-focused fieldset": { borderColor: "#2563eb" },
              },
              "& input": { fontSize: 14, color: "#0f172a" },
              "& input::placeholder": { color: "#94a3b8" },
            }}
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
              color: "#334155",
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: 53,
                "& fieldset": { borderColor: "#e2e8f0", borderWidth: 2 },
                "&:hover fieldset": { borderColor: "#94a3b8" },
                "&.Mui-focused fieldset": { borderColor: "#2563eb" },
              },
              "& input": { fontSize: 14, color: "#0f172a" },
              "& input::placeholder": { color: "#94a3b8" },
            }}
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
                  color: "#cbd5e1",
                  "&.Mui-checked": { color: "#2563eb" },
                  borderRadius: "4px",
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: 14, color: "#475569" }}>
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
              color: "#2563eb",
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
          {loading ? "Signing in…" : "Sign In"}
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
            onClick={onGoogleSignIn}
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
            onClick={onFacebookSignIn}
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
