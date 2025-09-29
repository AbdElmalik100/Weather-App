import Units from "./Units"


const Header = () => {
    
    return (
        <header className='py-8'>
            <div className="container flex items-center justify-between gap-6">
                <div className="logo-container">
                    <img src="/images/logo.svg" alt="Logo image" />
                </div>
                <Units />
            </div>
        </header>
    )
}

export default Header