// hooks/useAuth.ts
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginAction, logoutAction } from "@/app/actions/auth";
import { useState } from "react";

function useAuth() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        try {
            await logoutAction();
            toast.success("Logged out successfully");
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Error during logout");
        }
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>, formData: any) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await loginAction(formData);

            if (result.success) {
                toast.success("Login successful!");
                router.push("/dashboard");
                router.refresh(); // Refresh the page to update server components
            } else {
                toast.error(result.error || "Invalid credentials");
            }
        } catch (error) {
            toast.error("An error occurred during login");
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return { handleLogin, handleLogout, isLoading };
}

export default useAuth;
