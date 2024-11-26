const verifyEmailTemplate = ({ name, url }) => {
  return `
    <h1>Dear ${name},</h1>
    <p>Thank you for registering BookHive,<br/>Please click on the link below to verify your email address:</p>
    <a href=${url} style="background:yellow;margin-top:10px;font-weight:500;">
    Verify Email Address
    </a>
    <p>Best regards,<br/>BookHive Team</p>
`;
};

export default verifyEmailTemplate;
