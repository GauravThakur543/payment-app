const Inputbox = ({name, placeholder, onChange}) => {
    return(
        <div>
            <label className="font-bold">{name}</label>
            <br/>
            <input placeholder={placeholder?placeholder: null} type="text" className="border-[1px] border-slate-300 rounded-sm pl-2 py-1 w-full my-3" onChange={onChange}/>
        </div>
    )
}

export default Inputbox