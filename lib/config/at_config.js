// Options
AccountsTemplates.configure({
  defaultLayout: 'slimLayout',
  defaultLayoutRegions: {
    footer: 'footer'
  },
  defaultContentRegion: 'main',
  showForgotPasswordLink: false,
  overrideLoginErrors: true,
  enablePasswordChange: true,

  // sendVerificationEmail: true,
  // enforceEmailVerification: true,
  //confirmPassword: true,
  //continuousValidation: false,
  //displayFormLabels: true,
  //forbidClientAccountCreation: true,
  //formValidationFeedback: true,
  homeRoutePath: '/high',
  // showAddRemoveServices: false,
  //showPlaceholders: true,

  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: true,

  // Privacy Policy and Terms of Use
  //privacyUrl: 'privacy',
  //termsUrl: 'terms-of-use',
});

var logout = function(){
    //example redirect after logout
    FlowRouter.go('/sign-in');
};

AccountsTemplates.configure({
    onLogoutHook: logout
});