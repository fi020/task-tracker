<template>
    <div>
        <h1>Settings</h1>

        <!-- Email Section -->
        <div>
            <h2>Email</h2>

            <!-- Display email if it exists -->
            <p v-if="email">Your email: <strong>{{ email }}</strong></p>

            <!-- Show a message if no email exists -->
            <p v-else>You haven't added an email yet.</p>

            <!-- Show email verification status only if email exists -->
            <p v-if="email">Email verified: <strong>{{ emailVerified ? "Yes" : "No" }}</strong></p>

            <!-- Display actions based on email state -->
            <button v-if="email && !emailVerified" @click="verifyEmail">Verify Email</button>
            <button v-if="email && emailVerified" @click="editEmail">Edit Email</button>
            <button v-else @click="addEmail">add Email</button>
        </div>


        <!-- Password Section -->
        <div>
            <h2>Password</h2>
            <p v-if="!email">You need to add an email to change your password.</p>
            <button :disabled="!email" @click="changePassword">Change Password</button>
        </div>

        <router-link to="/profile">Back to Profile</router-link>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "SettingsPage",
    data() {
        return {
            email: null, // Will hold the user's email if it exists
            emailVerified: false,
            otpSent: false, // To check if OTP was sent or not
        };
    },
    async created() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found. Please log in.");
            }

            const apiUrl = process.env.VUE_APP_API_URL;
            const response = await axios.get(`${apiUrl}/settings/data`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Set the user's email
            this.email = response.data.email;
            this.emailVerified = response.data.emailVerified;
        } catch (error) {
            console.error("Error fetching user details:", error.message);
            alert("Session expired or invalid. Please log in again.");
            this.$router.push("/login");
        }
    },
    methods: {
        async addEmail() {
            const newEmail = prompt("Enter your email:");
            if (!newEmail) return;

            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No token found. Please log in.");

                const apiUrl = process.env.VUE_APP_API_URL;

                // Add the email
                await axios.post(
                    `${apiUrl}/settings/email`,
                    { email: newEmail },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                alert("Email added successfully! Please verify it using the OTP sent to your email.");

                // Send OTP
                this.otpSent = true;
            } catch (error) {
                console.error("Error:", error.message);
                alert(error.response?.data?.message || "An error occurred. Please try again.");
            }
        },

        async resendOtp() {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No token found. Please log in.");

                const apiUrl = process.env.VUE_APP_API_URL;

                // Resend OTP to the email
                await axios.post(
                    `${apiUrl}/settings/email/resend-otp`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                alert("OTP resent successfully. Please check your email.");
            } catch (error) {
                console.error("Error:", error.message);
                alert(error.response?.data?.message || "An error occurred while resending OTP.");
            }
        },

        async verifyEmail() {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No token found. Please log in.");

                const apiUrl = process.env.VUE_APP_API_URL;

                // Step 1: Resend the OTP first
                await this.resendOtp();

                // Step 2: Ask the user to input the OTP
                const otp = prompt("Enter the OTP sent to your email:");
                if (!otp) return;

                // Step 3: Verify the OTP
                await axios.post(
                    `${apiUrl}/settings/email/verify`,
                    { otp },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                alert("Email verified successfully!");
                this.emailVerified = true;
            } catch (error) {
                console.error("Error:", error.message);
                alert(error.response?.data?.message || "An error occurred. Please try again.");
            }
        },

        async editEmail() {
            const newEmail = prompt("Enter your new email:");
            if (!newEmail) return;

            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No token found. Please log in.");

                const apiUrl = process.env.VUE_APP_API_URL;

                // Add or update the email
                await axios.post(
                    `${apiUrl}/settings/email`,
                    { email: newEmail },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                alert("Email updated successfully! Please verify it using the OTP sent to your email.");
                this.email = newEmail;
                this.emailVerified = false;

                // Resend OTP
                this.otpSent = true;
            } catch (error) {
                console.error("Error:", error.message);
                alert(error.response?.data?.message || "An error occurred. Please try again.");
            }
        },

        async changePassword() {
            if (!this.emailVerified) {
                alert("Please verify your email before changing your password.");
                return;
            }
            // Implement password change logic
        },
    },
};
</script>