import { Input as InputNative, IInputProps, useTheme } from 'native-base';

export function Input({ ...rest }: IInputProps) {
  const { colors } = useTheme()
  return (
    <InputNative
      
      size='md'
      variant='underlined'
      color='red'
      fontSize='md'
      fontFamily='body'
      autoCapitalize='none'
      selectionColor={colors.blue['400']}
      
      {...rest}
    />


  );
}