const forgotPasswordTemplate = ({name, otp}) => {
    return `
        <h1>Hi, ${name}!</h1>
        <p>We've received a request to reset your password. Please use the following one-time password (OTP) to complete the process:</p>
        <br/>
        <div style="font-size:20px;background:yellow;padding:20px;text-align:center;font-weight:800;">
        ${otp}
        </div>
        <p>This OTP will expire in 10 minutes. If you didn't request a password reset, please ignore this email.</p>
        <p>Best regards,</p>
        <p>BookHive Team</p>
    `;
}

export default forgotPasswordTemplate;