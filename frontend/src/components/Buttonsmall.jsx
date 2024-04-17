const Buttonsmall = ({title, onClick}) => {
    return(
        <button className="bg-black text-white px-3 py-2 rounded-md" onClick={onClick}>{title}</button>
    )
}

export default Buttonsmall