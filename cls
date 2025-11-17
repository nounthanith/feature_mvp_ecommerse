[33mcommit 7fc63d27d22b97b3feff2c0deb75b283e2d2f40d[m
Author: Nuon Thanith <nounthanith99@gmail.com>
Date:   Mon Nov 10 11:15:52 2025 +0700

    add resend

[1mdiff --git a/src/features/auth/Register.jsx b/src/features/auth/Register.jsx[m
[1mindex 0cd87f4..a7925fa 100644[m
[1m--- a/src/features/auth/Register.jsx[m
[1m+++ b/src/features/auth/Register.jsx[m
[36m@@ -15,9 +15,29 @@[m [mfunction Register() {[m
     const [showPassword, setShowPassword] = useState(false);[m
     const [showConfirmPassword, setShowConfirmPassword] = useState(false);[m
     const [isLoading, setIsLoading] = useState(false);[m
[31m-    const { register } = useAuth();[m
[32m+[m[32m    const [loading, setLoading] = useState(false);[m
[32m+[m[32m    const [error, setError] = useState(null);[m
[32m+[m[32m    const [success, setSuccess] = useState(false);[m
[32m+[m[32m    const { register, resendVerification } = useAuth();[m
     const navigate = useNavigate();[m
 [m
[32m+[m[32m    const handleResendVerification = async () => {[m
[32m+[m[32m        setLoading(true);[m
[32m+[m[32m        setError(null);[m
[32m+[m[32m        setSuccess(false);[m
[32m+[m
[32m+[m[32m        try {[m
[32m+[m[32m            const response = await resendVerification(formData.email);[m
[32m+[m[32m            if (response.success) {[m
[32m+[m[32m                setSuccess(true);[m
[32m+[m[32m            }[m
[32m+[m[32m        } catch (err) {[m
[32m+[m[32m            setError(err.message || 'Failed to resend verification email');[m
[32m+[m[32m        } finally {[m
[32m+[m[32m            setLoading(false);[m
[32m+[m[32m        }[m
[32m+[m[32m    };[m
[32m+[m
     const handleChange = (e) => {[m
         const { name, value } = e.target;[m
         setFormData(prev => ({[m
[36m@@ -78,7 +98,7 @@[m [mfunction Register() {[m
                 title="Please wait"[m
                 description="We are creating your account. This may take a moment."[m
                 hideActions={true}[m
[31m-                onClose={() => {}}[m
[32m+[m[32m                onClose={() => { }}[m
             >[m
                 <div className="flex items-center gap-3 py-2">[m
                     <svg className="animate-spin h-5 w-5 text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">[m
[36m@@ -86,6 +106,7 @@[m [mfunction Register() {[m
                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>[m
                     </svg>[m
                     <span className="text-sm text-gray-700">Processing registration and email verification…</span>[m
[32m+[m[32m                    <button onClick={handleResendVerification} className="text-rose-600 hover:underline active:underline cursor-pointer font-semibold text-sm border p-1 rounded">Resend</button>[m
                 </div>[m
             </Dialog>[m
             <div className="w-full max-w-md">[m
