// src/components/Loading.tsx
import { useSelector } from "react-redux";
import type { RootAuthState } from "../reduxStateManagementFiles/store";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullPage?: boolean;
}

export default function Loading({ size = "md", text = "Loading...", fullPage = false }: LoadingProps) {
  const mode = useSelector((state: RootAuthState) => state.theme.mode);

//   const sizeClasses = {
//     sm: "w-6 h-6",
//     md: "w-10 h-10",
//     lg: "w-16 h-16"
//   };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl"
  };

  const dotSizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2.5 h-2.5", 
    lg: "w-4 h-4"
  };

  const LoadingContent = (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Elegant pulsing dots loader */}
      <div className={`flex items-center justify-center gap-2`}>
        <div 
          className={`${dotSizeClasses[size]} rounded-full ${
            mode === "light" ? "bg-blue-600" : "bg-blue-400"
          } animate-pulse`}
          style={{ animationDelay: "0ms", animationDuration: "1.4s" }}
        ></div>
        <div 
          className={`${dotSizeClasses[size]} rounded-full ${
            mode === "light" ? "bg-blue-600" : "bg-blue-400"
          } animate-pulse`}
          style={{ animationDelay: "200ms", animationDuration: "1.4s" }}
        ></div>
        <div 
          className={`${dotSizeClasses[size]} rounded-full ${
            mode === "light" ? "bg-blue-600" : "bg-blue-400"
          } animate-pulse`}
          style={{ animationDelay: "400ms", animationDuration: "1.4s" }}
        ></div>
      </div>
      
      {text && (
        <div className="text-center space-y-1">
          <p className={`${textSizeClasses[size]} font-medium ${
            mode === "light" ? "text-gray-900" : "text-gray-100"
          }`}>
            {text}
          </p>
          <div className="flex justify-center">
            <div className={`h-0.5 w-12 rounded-full ${
              mode === "light" ? "bg-blue-600/30" : "bg-blue-400/30"
            } animate-pulse`}></div>
          </div>
        </div>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center ${
          mode === "light" ? "bg-gray-50" : "bg-gray-950"
        }`}
      >
        {LoadingContent}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {LoadingContent}
    </div>
  );
}