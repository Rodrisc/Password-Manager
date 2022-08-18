import { VStack, TextArea as NativeTextArea, IButtonProps } from 'native-base';

export type DataEmail ={
    email: string
}

type Props = IButtonProps & {
    data: DataEmail
}



export function TextArea({data, ...rest }: Props) {
  return (
    <NativeTextArea value={data.email}></NativeTextArea>
  );
}