export default function Settings({onChange}){
    return(
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <p><input type="checkbox" onChange={(e) => onChange(e, "horizontal")} /><label>Additional horizontal information field</label></p>
            <p><input type="checkbox" onChange={(e) => onChange(e, "vertical")}/><label>Additional vertical information field</label></p>
        </div>
    )
}