import { useNavigate } from "react-router-dom";

interface ButtonProps{
    // children: React.ReactNode;
    link: string;
    children: string;
    style?: React.CSSProperties | string;
}

const Button: React.FC<ButtonProps> = (props) =>{
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(props.link);
    };
    const buttonStyle: React.CSSProperties | undefined =
    typeof props.style === 'string'
      ? { backgroundColor: props.style} // Assuming the string is a color value
      : props.style;
    return(
        <button type="button" onClick={handleClick} style={buttonStyle}>{props.children}</button>
    )
}

export default Button;