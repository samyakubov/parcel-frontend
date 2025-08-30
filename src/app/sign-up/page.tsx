"use client"
import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Checkbox} from "@/components/ui/checkbox"
import {useRouter} from "next/navigation"

export default function SignUp() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	})
	const [showPassword, setShowPassword] = useState(false)
	const [agreeToTerms, setAgreeToTerms] = useState(false)
	const router = useRouter()

	const handleInputChange = (field:string, value:string) => {
		setFormData(prev => ({ ...prev, [field]: value }))
	}

	return (
		<div className="min-h-screen flex ">
			<div className="flex-1 bg-white flex flex-col justify-center px-8 lg:px-16 max-w-md lg:max-w-lg">
				<div className="mb-8">
					<Button className="flex items-center gap-2 border border-border px-4 py-2 rounded-lg"
						onClick={() => router.back()}>
						<ArrowLeft className="w-4 h-4" />
					</Button>
				</div>

				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h1>
					<p className="text-gray-600">
                        Already have an account?{" "}
						<a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                            Log in
						</a>
					</p>
				</div>

				<div className="space-y-6">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
                                First Name
							</label>
							<Input
								value={formData.firstName}
								onChange={(e) => handleInputChange("firstName", e.target.value)}
								placeholder="First Name"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
                                Last Name
							</label>
							<Input
								value={formData.lastName}
								onChange={(e) => handleInputChange("lastName", e.target.value)}
								placeholder="Last Name"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
						</label>
						<Input
							type="email"
							value={formData.email}
							onChange={(e) => handleInputChange("email", e.target.value)}
							placeholder="Email Address"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
						</label>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								value={formData.password}
								onChange={(e) => handleInputChange("password", e.target.value)}
								placeholder="Password"
								className="pr-10"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
							</button>
						</div>
					</div>

					<div className="flex items-start space-x-3">
						<Checkbox
							checked={agreeToTerms}
							onCheckedChange={()=> setAgreeToTerms(!agreeToTerms)}
							className="mt-1"
						/>
						<label className="text-sm text-gray-600 leading-5">
                            I agree to the{" "}
							<a href="#" className="text-blue-600 hover:text-blue-700 underline">
                                Terms & Condition
							</a>
						</label>
					</div>

					<Button className="w-full py-3 text-base font-medium">
                        Create Account
					</Button>

					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-200"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">or</span>
						</div>
					</div>

					<Button variant="outline" className="w-full py-3 flex items-center justify-center gap-3">
                        Continue with Google
					</Button>
				</div>
			</div>

			<div className="flex-1 relative overflow-hidden bg-gradient-to-br rounded-l-3xl">
				<div className="absolute inset-0 bg-black bg-opacity-20"></div>
			</div>

		</div>
	)
}



