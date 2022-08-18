import { Input as InputNative, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
  return (
    <InputNative
      
      size='md'
      variant='underlined'
      color='red'
      fontSize='md'
      fontFamily='body'
      
      placeholder=''
      {...rest}
    />


  );
}