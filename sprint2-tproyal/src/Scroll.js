import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'


export default function Scroll() {
    const [goToTop, setGoToTop] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            setGoToTop(window.scrollY >= 100)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    const pathName = useLocation()
    const handleGoToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    useEffect(() => {
    }, [pathName])
    return (
        <div className="ButtonScrollToTop_scroll-to-top-wrapper__uYNan" style={{ display: "block" }}>
            {goToTop && (
                <button className="Button_button__yfvRh ButtonScrollToTop_scroll-to-top__KGhc4"
                        onClick={() => { handleGoToTop() }}
                >
                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="#0065FF" strokeWidth="1.5">
                        <path d="M15.8337 7.08398L10.0003 12.9173L4.16699 7.08398" stroke="ỉnherit" strokeWidth="inherit" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            )}
        </div>
    )

}