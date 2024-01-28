import { useNavigate } from "react-router-dom";

interface ButtonProps{
    // children: React.ReactNode;
    link: string;
    children: string;
}

const Button: React.FC<ButtonProps> = (props) =>{
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(props.link);
    };
    return(
        <button type="button" onClick={handleClick}>{props.children}</button>
    )
}

export default Button;