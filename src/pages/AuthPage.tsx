import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { AuthHeroPanel } from "~/components/AuthHeroPanel";
import { SignInForm, type SignInFormValues, type SignInFormError } from "~/components/SignInForm";
import { SignUpForm, type SignUpFormValues, type SignUpFormError } from "~/components/SignUpForm";

type AuthTab = "signin" | "signup";

export type AuthPageProps = {
  /** Initial tab to show. Defaults to "signin". */
  initialTab?: AuthTab;
  /** Called when the sign-in form is submitted. */
  onSignIn?: (values: SignInFormValues) => void;
  /** Called when the sign-up form is submitted. */
  onSignUp?: (values: SignUpFormValues) => void;
  /** Called when the user clicks "Forgot password?". */
  onForgotPassword?: () => void;
  /** Called when Google auth is triggered from either form. */
  onGoogleAuth?: () => void;
  /** Called when Facebook auth is triggered from either form. */
  onFacebookAuth?: () => void;
  /** Sign-in validation errors. */
  signInErrors?: SignInFormError;
  /** Sign-up validation errors. */
  signUpErrors?: SignUpFormError;
  /** Show loading state on the active form's submit button. */
  loading?: boolean;
};

/**
 * Full-screen authentication page.
 *
 * Layout: split-screen — hero panel on the left (hidden on mobile),
 * form panel on the right with Sign In / Register tabs.
 *
 * App -> Pages -> AuthPage -> [AuthHeroPanel, SignInForm | SignUpForm]
 */
export function AuthPage({
  initialTab = "signin",
  onSignIn,
  onSignUp,
  onForgotPassword,
  onGoogleAuth,
  onFacebookAuth,
  signInErrors,
  signUpErrors,
  loading = false,
}: AuthPageProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: (t) => t.palette.background.default }}>
      {/* Left hero panel — hidden on mobile */}
      <AuthHeroPanel />

      {/* Right form panel */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 6, md: 5 },
          px: { xs: 3, sm: 6 },
          overflowY: "auto",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 420 }}>
          {/* Logo */}
          <Box
            component="a"
            href="/"
            aria-label="AutoExchange home"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: (t) => t.palette.primary.main,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Typography sx={{ fontSize: 20, lineHeight: 1 }}>{"⏱"}</Typography>
            </Box>
            <Typography
              sx={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 700,
                fontSize: 24,
                color: (t) => t.palette.text.primary,
                lineHeight: 1,
              }}
            >
              AutoExchange
            </Typography>
          </Box>

          {/* Heading */}
          <Typography
            sx={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 32,
              lineHeight: "38.4px",
              color: (t) => t.palette.text.primary,
              mb: 0.75,
            }}
          >
            {activeTab === "signin" ? "Welcome Back" : "Create Account"}
          </Typography>
          <Typography sx={{ fontSize: 14, color: (t) => t.palette.text.secondary, mb: 3 }}>
            {activeTab === "signin"
              ? "Sign in to access your account and manage your listings."
              : "Join AutoExchange and start browsing or listing cars today."}
          </Typography>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={(_, value: AuthTab) => setActiveTab(value)}
            sx={{
              borderBottom: (t) => `2px solid ${t.palette.custom.divider}`,
              mb: 3,
              "& .MuiTabs-indicator": {
                bgcolor: (t) => t.palette.primary.main,
                height: 2,
              },
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: 14,
                fontWeight: 600,
                color: (t) => t.palette.text.secondary,
                flex: 1,
                minHeight: 53,
                "&.Mui-selected": { color: (t) => t.palette.primary.main },
              },
            }}
          >
            <Tab label="Sign In" value="signin" id="tab-signin" aria-controls="tabpanel-signin" />
            <Tab label="Register" value="signup" id="tab-signup" aria-controls="tabpanel-signup" />
          </Tabs>

          {/* Form panel */}
          <Box
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
          >
            {activeTab === "signin" ? (
              <SignInForm
                onSubmit={onSignIn}
                onForgotPassword={onForgotPassword}
                onGoogleSignIn={onGoogleAuth}
                onFacebookSignIn={onFacebookAuth}
                errors={signInErrors}
                loading={loading}
              />
            ) : (
              <SignUpForm
                onSubmit={onSignUp}
                onGoogleSignUp={onGoogleAuth}
                onFacebookSignUp={onFacebookAuth}
                errors={signUpErrors}
                loading={loading}
              />
            )}
          </Box>

          {/* Footer link */}
          <Typography
            sx={{ fontSize: 14, color: (t) => t.palette.text.secondary, textAlign: "center", mt: 3 }}
          >
            {activeTab === "signin" ? (
              <>
                {"Don't have an account? "}
                <Typography
                  component="span"
                  onClick={() => setActiveTab("signup")}
                  sx={{
                    fontWeight: 500,
                    color: (t) => t.palette.primary.main,
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Sign up
                </Typography>
              </>
            ) : (
              <>
                {"Already have an account? "}
                <Typography
                  component="span"
                  onClick={() => setActiveTab("signin")}
                  sx={{
                    fontWeight: 500,
                    color: (t) => t.palette.primary.main,
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Sign in
                </Typography>
              </>
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
