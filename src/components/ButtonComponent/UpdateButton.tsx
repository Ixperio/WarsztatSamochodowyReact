interface ButtonProps{
    // children: React.ReactNode;
    value: string;
    children: string;
}

const Button: React.FC<ButtonProps> = (props) =>{
    const handleClick = () => {
        console.log("Update ", props.children)
    };
    return(
        <button type="button"  className="update_button" onClick={handleClick}>{props.children}</button>
    )
}

export default Button;