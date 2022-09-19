import * as C from './styles'

type Props ={
    title: string;
    value: number;
    color?: string; 
}

export const ResumeItem = ({title, value, color}: Props) => {
    return(
        <C.Container>
            <C.Title>{title}</C.Title>
            <C.Value color={color}>{value}$</C.Value>
        </C.Container>
    );
}