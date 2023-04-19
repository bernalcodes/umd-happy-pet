import React from 'react'

const LayoutAuth = ({ children, isLogin }: { children: React.ReactNode, isLogin?: boolean }) => {
  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
			<div className="flex justify-center items-center w-full h-full">
				{ children }
			</div>
			<div className={`w-full hidden md:flex bg-slate-300 ${isLogin ? "bg-hero-login" : "bg-hero-signup"} bg-cover bg-center justify-center items-center`}>
				<h1 className={`flex font-bold text-6xl ${isLogin ? "mb-0 mt-56" : "mb-56"}`}><p className="text-happy-color-primary">Happy</p>{" "}<p className="text-happy-color-text">pet</p></h1>
			</div>
	</div>
  )
}

export default LayoutAuth