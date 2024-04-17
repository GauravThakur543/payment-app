const Button = ({title, color, onClick}) => {
    return(
        <button className="text-white bg-black w-full py-2 mt-4 rounded-md" onClick={onClick}>{title}</button>
    )
}

export default Button